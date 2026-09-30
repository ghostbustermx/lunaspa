import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QRCode from "qrcode";

// Pagina a la que apunta el QR. Si el sitio se publica dentro de un
// subdirectorio, anteponerlo aqui (ej. "/lunaspa/react/reviews-score") para
// que el enlace no se caiga a la raiz del dominio.
const REVIEWS_PATH = "/reviews-score";

export default function FooterQr() {
  const [src, setSrc] = useState("");

  useEffect(() => {
    // El QR se arma con el dominio bajo el que se esta viendo el sitio, asi
    // apunta a la version real (local, staging o produccion) sin recompilar.
    const url = new URL(REVIEWS_PATH, window.location.origin).toString();
    let alive = true;

    // En navegador toDataURL siempre devuelve PNG, asi que el SVG sale de
    // toString y se pasa como data URL para poder usarlo en un <img>.
    QRCode.toString(url, {
      type: "svg",
      width: 160,
      margin: 1,
      errorCorrectionLevel: "M",
      color: { dark: "#0d2d52", light: "#ffffff" }
    })
      .then((svg) => {
        if (alive) {
          setSrc(
            `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
          );
        }
      })
      .catch(() => {
        if (alive) setSrc("");
      });

    return () => {
      alive = false;
    };
  }, []);

  if (!src) return null;

  return (
    <Link
      className="footer-qr"
      to={REVIEWS_PATH}
      aria-label="Leave a review of your Luna Spa experience"
    >
      <img className="footer-qr-img" src={src} alt="" width="160" height="160" />
      <span className="footer-qr-text">
        <strong>Share your experience</strong>
        <span>Scan to leave a review</span>
      </span>
    </Link>
  );
}
