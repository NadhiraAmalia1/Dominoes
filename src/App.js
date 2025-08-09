import { useMemo, useState } from "react";
import {
  sort as sortDominoes,
  countDoubleNumber,
  removeDuplicates,
  flipAll,
  removeByTotal,
} from "./utils";

const DEFAULT_DATA = [
  [6, 1],
  [4, 3],
  [5, 1],
  [3, 4],
  [1, 1],
  [3, 4],
  [1, 2],
];

export default function App() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [removeTotal, setRemoveTotal] = useState("");

  const doubles = useMemo(() => countDoubleNumber(data), [data]);

  const handleSortAsc = () => setData((d) => sortDominoes(d, "asc"));
  const handleSortDesc = () => setData((d) => sortDominoes(d, "desc"));
  const handleFlip = () => setData((d) => flipAll(d));
  const handleRemoveDup = () => setData((d) => removeDuplicates(d));
  const handleReset = () => setData(DEFAULT_DATA);
  const handleRemoveByTotal = () => {
    if (removeTotal === "" || isNaN(Number(removeTotal))) return;
    setData((d) => removeByTotal(d, Number(removeTotal)));
    setRemoveTotal("");
  };

  const renderSourceInline = (arr) =>
    `[${arr.map(([a, b]) => `[${a},${b}]`).join(",")}]`;

  return (
    <div style={s.page}>
      <h1 style={s.h1}>Dominoes</h1>

      {/* Box: Source */}
      <div style={s.box}>
        <div style={s.boxTitle}>Source</div>
        <div style={s.boxBody}>{renderSourceInline(DEFAULT_DATA)}</div>
      </div>

      {/* Box: Double Numbers */}
      <div style={s.box}>
        <div style={s.boxTitle}>Double Numbers</div>
        <div style={s.double}>{doubles}</div>
      </div>

      {/* Cards*/}
      <div style={s.cardsRow}>
        {data.map(([a, b], i) => (
          <div key={`${a}-${b}-${i}`} style={s.tile}>
            <div>{a}</div>
            <div>-</div>
            <div>{b}</div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div style={s.actions}>
        <button style={s.btn} onClick={handleSortAsc}>
          Sort (ASC)
        </button>
        <button style={s.btn} onClick={handleSortDesc}>
          Sort (DESC)
        </button>
        <button style={s.btn} onClick={handleFlip}>
          Flip
        </button>
        <button style={s.btn} onClick={handleRemoveDup}>
          Remove Dup
        </button>
        <button style={s.btn} onClick={handleReset}>
          Reset
        </button>
      </div>

      {/* Input + Remove by total */}
      <div style={s.inputRow}>
        <input
          type="number"
          placeholder="Input Number"
          value={removeTotal}
          onChange={(e) => setRemoveTotal(e.target.value)}
          style={s.input}
        />
        <button style={s.btn} onClick={handleRemoveByTotal}>
          Remove
        </button>
      </div>
    </div>
  );
}

const s = {
  page: {
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    padding: 24,
    maxWidth: 900,
    margin: "0 auto",
  },
  h1: { margin: "0 0 16px" },
  box: {
    border: "1px solid #ddd",
    borderRadius: 6,
    padding: 12,
    background: "#fff",
    marginBottom: 10,
  },
  boxTitle: { fontWeight: 600, marginBottom: 6 },
  boxBody: { whiteSpace: "pre-wrap", wordBreak: "break-word" },
  double: { fontSize: 20, fontWeight: 700 },

  cardsRow: {
    display: "flex",
    flexWrap: "nowrap",
    gap: 8,
    margin: "10px 0 12px",
    overflowX: "auto",
  },

  tile: {
    width: 46,
    height: 70,
    border: "1px solid #333",
    borderRadius: 4,
    display: "grid",
    gridTemplateRows: "1fr auto 1fr",
    alignItems: "center",
    justifyItems: "center",
    fontWeight: 600,
    flex: "0 0 auto",
  },
  actions: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 },
  btn: {
    padding: "6px 10px",
    border: "1px solid #2d6cdf",
    background: "#307cc2",
    borderRadius: 6,
    cursor: "pointer",
    color: "white",
  },
  inputRow: { display: "flex", gap: 8, alignItems: "center" },
  input: {
    flex: 1,
    padding: "8px 10px",
    border: "1px solid #ccc",
    borderRadius: 6,
  },
};
