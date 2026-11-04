// Exact geometry from Krishna's original handwritten e-sign. No background.
export const SIGNATURE_PATH = "M 493 100 L 238 40 L 478 40 L 133 100 L 373 100 L 403 160 L 118 40";
export default function Signature({ traced = false }: { traced?: boolean }) {
  return <svg viewBox="100 20 410 160" className={traced ? "signature-svg signature-traced" : "signature-svg"} fill="none" aria-hidden="true">
    <path d={SIGNATURE_PATH} pathLength="1" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}
