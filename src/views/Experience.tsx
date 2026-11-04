import { useState } from "react";
import CareerField from "../components/CareerField";
import { achievements, experience } from "../data/portfolio";

const NOTES = [
  "Leading Orkus. Building the workflows, integrations, and tools behind an agent platform.",
  "Built LLM apps and autonomous agents for multi-step healthcare workflows.",
];

export default function Experience() {
  const [active,setActive]=useState(0);
  return <section className="experience-gallery" data-testid="experience-view">
    <header className="gallery-heading"><h2>Along the way</h2><span>2025 → NOW</span></header>
    <div className="career-layout">
      <div className="career-art"><CareerField active={active}/></div>
      <div className="career-entries">
        {experience.map((role,i)=><article key={role.org} className={`career-entry${active===i?' current-focus':''}`} data-testid="experience-role" onPointerEnter={()=>setActive(i)} onFocus={()=>setActive(i)} tabIndex={0}>
          <div className="career-date"><span className="career-index">0{i+1}</span><span>{role.dates}</span>{i===0&&<span className="career-now">now</span>}</div>
          <h3>{role.org}</h3>
          <p className="career-title">{role.title}</p>
          <p className="career-note">{NOTES[i]}</p>
        </article>)}
      </div>
    </div>
    <section className="honours" aria-label="Achievements">
      <div className="honours-label">A few milestones</div>
      <ul data-testid="achievements-list">{achievements.map(a=><li key={a.event}><span className="honour-result">{a.result}</span><span className="honour-event">{a.event}</span></li>)}</ul>
    </section>
  </section>;
}
