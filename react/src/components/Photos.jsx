export function Figure({ src, alt, width, height, caption }) {
  return (
    <figure>
      <img src={src} alt={alt} loading="lazy" width={width} height={height} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function PhotoMosaic({ photos }) {
  return (
    <div className="photo-mosaic">
      {photos.map((p, i) => (
        <Figure key={i} {...p} />
      ))}
    </div>
  );
}

export function PhotoStrip({ photos }) {
  return (
    <div className="photo-strip">
      {photos.map((p, i) => (
        <Figure key={i} {...p} />
      ))}
    </div>
  );
}