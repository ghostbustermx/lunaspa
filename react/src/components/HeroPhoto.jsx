export default function HeroPhoto({ src, alt, width = 478, height = 602 }) {
  return (
    <div className="photo-hero">
      <img src={src} alt={alt} width={width} height={height} fetchpriority="high" />
      <div className="photo-caption">
        <strong>Luna Spa · Sayulita</strong>
        <span>Private wellness experience</span>
      </div>
    </div>
  );
}