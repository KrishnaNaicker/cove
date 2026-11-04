import { useEffect, useRef, useState } from "react";
import Signature from "./Signature";

const SESSION_KEY = "krishna-signature-intro-v3";
export default function Intro({ onDone }: { onDone: () => void }) {
  const [show] = useState(() => {
    try { return !matchMedia("(prefers-reduced-motion: reduce)").matches && !sessionStorage.getItem(SESSION_KEY); }
    catch { return false; }
  });
  const mark = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!show) { onDone(); return; }
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* Completion never depends on storage. */ }
    let finished = false;
    const start = Date.now();
    let travel: Animation | undefined, fade: Animation | undefined;
    const finish = () => { if (!finished) { finished = true; onDone(); } };
    // Once the last pen stroke finishes, the actual signature travels to its home.
    const transfer = window.setTimeout(() => {
      const destination = document.querySelector('.signature-button .signature-svg')?.getBoundingClientRect();
      const source = mark.current?.getBoundingClientRect();
      if (!source || !destination || !mark.current) return;
      const x = destination.x + destination.width/2 - (source.x + source.width/2);
      const y = destination.y + destination.height/2 - (source.y + source.height/2);
      travel = mark.current.animate([
        { transform: 'translate(0, 0) scale(1)' },
        { transform: `translate(${x}px, ${y}px) scale(${destination.width/source.width})` }
      ], { duration: 530, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'forwards' });
      fade = backdrop.current?.animate([{opacity:1},{opacity:0}],{duration:470,delay:100,fill:'forwards',easing:'ease-out'});
    }, 850);
    const primary = window.setTimeout(finish, 1450);
    const fallback = window.setTimeout(finish, 2000);
    const visibility = () => { if (!document.hidden && Date.now()-start >= 1450) finish(); };
    document.addEventListener('visibilitychange', visibility);
    return () => { clearTimeout(transfer); clearTimeout(primary); clearTimeout(fallback); travel?.cancel(); fade?.cancel(); document.removeEventListener('visibilitychange',visibility); };
  }, [show,onDone]);
  if (!show) return null;
  return <div className="signature-intro" data-testid="intro-overlay" aria-hidden="true">
    <div ref={backdrop} className="signature-backdrop"/>
    <div ref={mark} className="signature-intro-mark"><Signature traced /></div>
  </div>;
}
