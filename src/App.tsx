import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Nav from "./components/Nav";
import Intro from "./components/Intro";
import Home from "./views/Home";
import Work from "./views/Work";
import Experience from "./views/Experience";
import { VIEW_BY_HASH, type View } from "./data/portfolio";

export default function App() {
  const reduced = useReducedMotion();
  const [view, setView] = useState<View>(() => VIEW_BY_HASH[window.location.hash] ?? "home");
  const [introDone, setIntroDone] = useState(false);
  const onIntroDone = useCallback(() => setIntroDone(true), []);

  useEffect(() => {
    const onHash = () => setView(VIEW_BY_HASH[window.location.hash] ?? "home");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (v: View) => {
    const target = v === "home" ? window.location.pathname : `#${v}`;
    if (window.location.hash !== `#${v}`) {
      window.history.replaceState(null, "", target);
    }
    setView(v);
  };

  return (
    <div className="app-shell">
      <AnimatePresence>
        {!introDone && <Intro key="intro" onDone={onIntroDone} />}
      </AnimatePresence>
      <Nav view={view} onNavigate={navigate} />
      <AnimatePresence initial={false} mode="wait">
        <motion.main
          key={view}
          className="view"
          data-testid={`view-${view}`}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 1 } : { opacity: 0, y: -6 }}
          transition={{ duration: reduced ? 0 : 0.22, ease: "easeOut" }}
        >
          {view === "home" && <Home />}
          {view === "work" && <Work />}
          {view === "experience" && <Experience />}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
