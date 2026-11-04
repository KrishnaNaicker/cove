/** Etched contours: two quiet focal points, one continuous field. */
export default function CareerField({ active }: { active: number }) {
  const contour = (i: number) => {
    const pts: string[] = [];
    const radius = 24+i*3.7;
    for(let k=0;k<=180;k++) {
      const t=k/180*Math.PI*2;
      const r=radius*(1+.11*Math.sin(t*3+.5)+.045*Math.cos(t*5));
      const x=160+Math.cos(t)*r*.94+Math.sin(t*2)*10;
      const y=210+Math.sin(t)*r*1.43;
      pts.push(`${k?'L':'M'}${x.toFixed(2)} ${y.toFixed(2)}`);
    }
    return pts.join(' ')+' Z';
  };
  return <svg className={`career-field career-focus-${active}`} viewBox="0 0 320 420" aria-hidden="true">
    <defs>
      <linearGradient id="career-ink" x1="0" y1="0" x2=".9" y2="1"><stop stopColor="#b3c5a1" stopOpacity=".9"/><stop offset=".5" stopColor="#a29c8e" stopOpacity=".18"/><stop offset="1" stopColor="#d4d0c0" stopOpacity=".6"/></linearGradient>
      <radialGradient id="career-light"><stop stopColor="#bac9ab" stopOpacity=".09"/><stop offset="1" stopColor="#bac9ab" stopOpacity="0"/></radialGradient>
    </defs>
    <g className="career-contours" fill="none" stroke="url(#career-ink)" strokeWidth=".6">
      {Array.from({length:27},(_,i)=><path key={i} d={contour(i)}/>)}
    </g>
    <g className="career-focus"><circle cx="160" cy="139" r="75" fill="url(#career-light)"/><circle cx="160" cy="139" r="4" fill="var(--bg)" stroke="var(--sage)" strokeWidth="1"/><circle cx="160" cy="139" r="1.2" fill="var(--sage)"/><circle className="career-ripple" cx="160" cy="139" r="14" fill="none" stroke="var(--sage)" strokeWidth=".5"/></g>
    <text x="160" y="390" textAnchor="middle" fill="var(--faint)" fontSize="8" letterSpacing="2">ALWAYS IN PROGRESS</text>
  </svg>;
}
