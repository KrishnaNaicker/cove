import Signature from "./Signature";
export default function Monogram({ onClick }: { onClick: () => void }) {
  return <button onClick={onClick} data-testid="monogram-home-button" aria-label="Krishna Naicker — home" className="monogram-btn signature-button"><Signature /></button>;
}
