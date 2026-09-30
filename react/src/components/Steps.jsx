import { STEPS } from "../lib/site";

export default function Steps() {
  return (
    <div className="steps">
      {STEPS.map((s) => (
        <div className="step" key={s.n}>
          <div className="step-number">{s.n}</div>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </div>
      ))}
    </div>
  );
}