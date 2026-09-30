export default function Faq({ items }) {
  function handleToggle(e) {
    const detail = e.currentTarget;
    if (!detail.open) return;
    const siblings = detail.parentElement.querySelectorAll("details[open]");
    siblings.forEach((other) => {
      if (other !== detail) other.open = false;
    });
  }

  return (
    <div className="faq">
      {items.map((f, i) => (
        <details key={i} onToggle={handleToggle}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}