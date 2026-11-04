import Monogram from "./Monogram";
import type { View } from "../data/portfolio";

const LINKS: { id: View; label: string }[] = [
  { id: "home", label: "Cove" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
];

export default function Nav({ view, onNavigate }: { view: View; onNavigate: (v: View) => void }) {
  return (
    <header className="site-nav">
      <Monogram onClick={() => onNavigate("home")} />
      <nav aria-label="Primary">
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                data-testid={`nav-${l.id}-link`}
                className={view === l.id ? "nav-link active" : "nav-link"}
                aria-current={view === l.id ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(l.id);
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
