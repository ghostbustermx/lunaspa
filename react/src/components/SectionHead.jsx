export default function SectionHead({ kicker, title, text, id }) {
  return (
    <div className="section-head">
      <div className="kicker">{kicker}</div>
      {id ? <h2 id={id}>{title}</h2> : <h2>{title}</h2>}
      {text && <p>{text}</p>}
    </div>
  );
}