<?php

namespace App\Libraries;

use CodeIgniter\HTTP\Files\UploadedFileInterface;
use GdImage;
use Throwable;

/**
 * Subida de la imagen decorativa de los articulos.
 *
 * Todo lo que se guarda en public/uploads/blog es WebP, sin importar el
 * formato de origen: la imagen se decodifica con GD, se corrige la orientacion
 * EXIF, se escala si excede MAX_DIMENSION y se vuelve a codificar en WebP. Asi
 * el sitio sirve un unico formato y el cliente no descarga un JPG de 3 MB.
 *
 * La base de datos solo guarda el nombre del archivo. El tipo de origen se
 * valida con el contenido real (finfo), no con la extension que manda el
 * navegador.
 */
class ImageUpload
{
    public const FOLDER        = 'blog';
    public const MAX_BYTES     = 8388608;        // 8 MB del archivo de origen
    public const MAX_DIMENSION = 2000;            // lado mayor del WebP final
    public const MAX_OUTPUT_BYTES = 409600;       // 400 KB de presupuesto final
    public const OUTPUT_EXT    = 'webp';

    /** Se prueba de mayor a menor y se queda con la primera que cabe. */
    public const QUALITIES = [82, 70, 60];

    /** Formatos que aceptamos como origen. */
    public const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

    /**
     * Valida, convierte a WebP y guarda el archivo.
     *
     * @return array{ok:bool,file:?string,error:?string}
     */
    public static function store(?UploadedFileInterface $upload): array
    {
        if ($upload === null || ! $upload->isFile()) {
            return self::result(false, 'No se recibio ningun archivo.');
        }

        if ($upload->hasMoved()) {
            return self::result(false, 'El archivo ya habia sido procesado.');
        }

        if (! $upload->isValid()) {
            return self::result(false, 'La subida fallo o el archivo excede el limite del servidor.');
        }

        if ($upload->getSize() > self::MAX_BYTES) {
            return self::result(false, 'La imagen supera el maximo de 8 MB.');
        }

        if (! function_exists('imagewebp')) {
            return self::result(false, 'El servidor no tiene GD con soporte WebP.');
        }

        $mime = (string) $upload->getMimeType();

        if (! in_array($mime, self::ALLOWED_TYPES, true)) {
            return self::result(false, 'Formato no permitido. Usa JPG, PNG o WEBP.');
        }

        $source = (string) $upload->getTempName();

        // getimagesize solo lee la cabecera: da las dimensiones sin decodificar,
        // que es lo que hace falta para no reventar la memoria con un archivo
        // de 8 MB que en pixeles puede ser enorme.
        $dimensions = @getimagesize($source);

        if ($dimensions === false) {
            return self::result(false, 'El archivo esta danado o no es una imagen valida.');
        }

        if (! self::fitsMemory($dimensions[0], $dimensions[1])) {
            return self::result(false, 'La imagen tiene demasiados pixeles para procesarla en este servidor.');
        }

        $binary = @file_get_contents($source);

        if ($binary === false || $binary === '') {
            return self::result(false, 'No se pudo leer el archivo recibido.');
        }

        $image = @imagecreatefromstring($binary);
        unset($binary);

        if ($image === false) {
            return self::result(false, 'El archivo esta danado o no es una imagen valida.');
        }

        $image = self::orient($image, $source);
        $image = self::limit($image);

        $folder = self::folder();

        if (! is_dir($folder) && ! mkdir($folder, 0755, true) && ! is_dir($folder)) {
            imagedestroy($image);

            return self::result(false, 'No se pudo crear la carpeta de imagenes.');
        }

        // El nombre lo pone el servidor, nunca el cliente: evita sobrescribir
        // archivos y evita que un ".php" disguiseado llegue al disco.
        $name = bin2hex(random_bytes(12)) . '.' . self::OUTPUT_EXT;
        $path = $folder . DIRECTORY_SEPARATOR . $name;

        // El original se mueve primero y despues se sobrescribe con el WebP.
        // Al reves, move() renombra el JPG encima del .webp recien escrito y
        // guarda los bytes originales con la extension equivocada. Durante el
        // instante intermedio el archivo tiene el JPG, pero su nombre aleatorio
        // de 24 hex lo hace inalcanzable para un cliente.
        try {
            $upload->move($folder, $name);
        } catch (Throwable $e) {
            imagedestroy($image);

            return self::result(false, 'No se pudo guardar la imagen en el servidor.');
        }

        // Sin filtros de metadatos: imagewebp solo escribe pixeles, asi que el
        // EXIF (incluido el GPS de las fotos del celular) no se copia.
        $saved = self::encode($image, $path);
        imagedestroy($image);

        if (! $saved) {
            @unlink($path);

            return self::result(false, 'No se pudo convertir la imagen a WebP.');
        }

        return self::result(true, null, $name);
    }

    /**
     * Codifica en WebP quedandose con la mayor calidad que cabe en el peso.
     *
     * El reescalado a 2000 px es lo que mas incide en el peso final, asi que la
     * calidad 82 casi siempre entra sola. Los reintentos solo aparecen con fotos
     * muy ruidosas o con mucho detalle, y hay un piso de calidad: por debajo de
     * 60 el recorte ya se nota y conviene pesas mas que traicionarlo.
     */
    private static function encode(GdImage $image, string $path): bool
    {
        $saved = false;

        foreach (self::QUALITIES as $quality) {
            if (! @imagewebp($image, $path, $quality)) {
                continue;
            }

            $saved = true;

            // Sin clearstatcache, filesize() devuelve el tamano anterior a la
            // escritura y el presupuesto se salta sin avisar.
            clearstatcache(true, $path);
            $size = @filesize($path);

            if ($size !== false && $size <= self::MAX_OUTPUT_BYTES) {
                return true;
            }
        }

        return $saved;
    }

    /**
     * GD reserva 4 bytes por pixel e imagerotate ademas duplica el buffer, asi
     * que el archivo de 8 MB puede pedir bastante mas memoria que su tamano en
     * disco. Se rechaza antes de decodificar en vez de dejar que reviente.
     */
    private static function fitsMemory(int $width, int $height): bool
    {
        $limit = self::memoryLimitBytes();

        if ($limit === 0) {
            return true;
        }

        return ($width * $height * 4 * 2) < $limit;
    }

    /**
     * @return int Bytes del limite, o 0 si no hay limite.
     */
    private static function memoryLimitBytes(): int
    {
        $raw = trim((string) ini_get('memory_limit'));

        if ($raw === '' || $raw === '-1') {
            return 0;
        }

        $value = (int) $raw;

        return match (strtolower(substr($raw, -1))) {
            'g'     => $value * 1024 * 1024 * 1024,
            'm'     => $value * 1024 * 1024,
            'k'     => $value * 1024,
            default => $value,
        };
    }

    /**
     * Aplica la rotacion EXIF antes de convertir.
     *
     * GD no lee el EXIF, asi que sin esto las fotos del celular en vertical
     * quedan acostadas. Al re-codificar se pierde la metadata, que es
     * justamente lo que se quiere.
     */
    private static function orient(GdImage $image, string $source): GdImage
    {
        if (! function_exists('exif_read_data')) {
            return $image;
        }

        $exif        = @exif_read_data($source);
        $orientation = (int) ($exif['Orientation'] ?? 1);

        // 3 = 180 grados, 6 = 90 a la izquierda, 8 = 90 a la derecha.
        $degrees = match ($orientation) {
            3       => 180,
            6, 5    => -90,
            8, 7    => 90,
            default => 0,
        };

        if ($degrees === 0) {
            return $image;
        }

        $rotated = @imagerotate($image, $degrees, 0);

        if ($rotated === false) {
            return $image;
        }

        imagedestroy($image);

        return $rotated;
    }

    /**
     * Escala para que el lado mayor no pase de MAX_DIMENSION.
     *
     * Se reduce a la mitad repetidamente en vez de hacer un solo salto: en
     * reducciones grandes (8000 px a 2000 px) el escalonado se parece a un
     * filtro de caja y evita el dentado que deja un unico paso bicubico.
     */
    private static function limit(GdImage $image): GdImage
    {
        $width  = imagesx($image);
        $height = imagesy($image);

        while (max($width, $height) > self::MAX_DIMENSION * 2) {
            $half = @imagescale(
                $image,
                (int) ceil($width / 2),
                (int) ceil($height / 2),
                IMG_BICUBIC_FIXED
            );

            // Si un paso falla se sigue con el ultimo escalado correcto.
            if ($half === false) {
                return $image;
            }

            imagedestroy($image);
            $image = $half;
            $width  = imagesx($image);
            $height = imagesy($image);
        }

        $largest = max($width, $height);

        if ($largest <= self::MAX_DIMENSION) {
            return $image;
        }

        $scale  = self::MAX_DIMENSION / $largest;
        $scaled = @imagescale(
            $image,
            (int) max(1, round($width * $scale)),
            (int) max(1, round($height * $scale)),
            IMG_BICUBIC_FIXED
        );

        if ($scaled === false) {
            return $image;
        }

        imagedestroy($image);

        return $scaled;
    }

    /**
     * Borra el archivo de una imagen que ya no se usa.
     */
    public static function delete(?string $file): void
    {
        $file = trim((string) $file);

        // Solo nombres simples: nada de rutas ni de "..".
        if ($file === '' || preg_match('/^[a-zA-Z0-9._-]+$/', $file) !== 1) {
            return;
        }

        $path = self::folder() . DIRECTORY_SEPARATOR . $file;

        if (is_file($path)) {
            unlink($path);
        }
    }

    /**
     * URL publica del archivo, lista para la API.
     */
    public static function url(?string $file): ?string
    {
        $file = trim((string) $file);

        return $file === '' ? null : base_url('uploads/' . self::FOLDER . '/' . $file);
    }

    public static function folder(): string
    {
        return FCPATH . 'uploads' . DIRECTORY_SEPARATOR . self::FOLDER;
    }

    /**
     * @return array{ok:bool,file:?string,error:?string}
     */
    private static function result(bool $ok, ?string $error, ?string $file = null): array
    {
        return ['ok' => $ok, 'file' => $file, 'error' => $error];
    }
}
