import { useRef, useState, type KeyboardEvent } from "react";
import { projects } from "../data/portfolio";
import Ribbon from "../components/Ribbon";

export default function Work() {
  const [active,setActive]=useState(0);
  const [gesture,setGesture]=useState(0);
  const select=(index:number)=>{setActive(index);setGesture(value=>value+1);};
  const buttons=useRef<(HTMLButtonElement|null)[]>([]);
  const p=projects[active];
  const navigate=(e:KeyboardEvent)=>{
    let next=active;
    if(e.key==='ArrowRight'||e.key==='ArrowDown')next=(active+1)%projects.length;
    else if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=(active+projects.length-1)%projects.length;
    else if(e.key==='Home')next=0;
    else if(e.key==='End')next=projects.length-1;
    else return;
    e.preventDefault();select(next);buttons.current[next]?.focus();
  };
  return <section className="work-gallery" data-testid="work-view">
    <header className="gallery-heading"><h2>Selected work</h2><span>01 — 05</span></header>
    <div className="gallery-tabs" role="tablist" aria-label="Projects" onKeyDown={navigate}>
      {projects.map((project,i)=><button key={project.name} ref={el=>{buttons.current[i]=el;}} id={`project-tab-${i}`} role="tab" aria-selected={active===i} aria-controls="project-panel" tabIndex={active===i?0:-1} className={active===i?'gallery-tab active':'gallery-tab'} onClick={()=>select(i)} data-testid={`project-selector-${i}`}><span className="project-number">0{i+1}</span>{project.name}</button>)}
    </div>
    <div className="artwork-stage"><Ribbon index={active} gesture={gesture}/><span className="artwork-index" aria-hidden="true">study / 0{active+1}</span></div>
    <article id="project-panel" role="tabpanel" aria-labelledby={`project-tab-${active}`} className="gallery-info" tabIndex={0} data-testid={`project-stage-${active}`}>
      <div className="project-heading"><h3>{p.name}</h3><span>{p.date}</span></div>
      <p className="gallery-summary">{p.summary}</p>
      <p className="gallery-tech">{p.tech.join(' · ')}</p>
      <div className="gallery-links">{p.links.map(link=><a key={link.href} className="quiet-link" href={link.href} target="_blank" rel="noreferrer">{link.label}<span aria-hidden="true"> ↗</span></a>)}</div>
    </article>
  </section>;
}
