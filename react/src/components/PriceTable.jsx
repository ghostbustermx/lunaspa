const HEADERS = ["Treatment", "Duration", "Price", "Duration", "Price"];

export default function PriceTable({ rows }) {
  const cols = rows.length && rows[0] ? rows[0].length : HEADERS.length;

  return (
    <div className="price-table-wrap">
      <table className="price-table">
        <thead>
          <tr>
            {HEADERS.slice(0, cols).map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
{row.map((cell, j) => (
              <td key={j} data-label={HEADERS[j]}>
                {cell}
              </td>
            ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}