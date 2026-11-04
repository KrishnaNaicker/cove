import { useEffect, useRef } from "react";

/** A hollow woven orbit. Project selection adds a smooth turn and contraction. */
export default function Ribbon({ index, gesture }: { index: number; gesture: number }) {
  const svg = useRef<SVGSVGElement>(null);
  const goal = useRef({ index, gesture, turn: 0, pitch: .12, roll: 0, fold: .34, twist: 1.5, phase: 0, duration: 460 });
  const wake = useRef<() => void>(() => {});
  useEffect(() => {
    if (goal.current.gesture !== gesture) {
      const random = (a:number,b:number) => a+Math.random()*(b-a);
      // Deliberate limits keep every new gesture calm, readable, and hollow.
      const direction = Math.random()<.5 ? -1 : 1;
      goal.current = {
        index, gesture,
        turn: goal.current.turn + direction*random(.65,1.8),
        pitch: random(-.3,.28), roll: random(-.4,.4),
        fold: random(.25,.55), twist: random(.8,2.7),
        phase: random(-Math.PI,Math.PI), duration: random(380,650),
      };
    }
    wake.current();
  }, [index,gesture]);
  useEffect(() => {
    const el = svg.current!;
    const lines = Array.from(el.querySelectorAll<SVGPathElement>('.ribbon-thread'));
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let shape = goal.current.index, turn = goal.current.turn, time = 0, raf = 0, previous = 0;
    let posture = { pitch:goal.current.pitch, roll:goal.current.roll, fold:goal.current.fold, twist:goal.current.twist, phase:goal.current.phase };
    let pointer = { x: 0, y: 0 }, tilt = { x: 0, y: 0 };
    const draw = (now: number) => {
      raf = 0;
      const dt = Math.min(40, now - (previous || now - 16)); previous = now;
      const smooth = 1 - Math.exp(-dt/goal.current.duration);
      for(const key of ['pitch','roll','fold','twist','phase'] as const) {
        posture[key] = reduced.matches ? goal.current[key] : posture[key]+(goal.current[key]-posture[key])*smooth;
      }
      if (!reduced.matches) time += dt * .000115;
      shape = reduced.matches ? goal.current.index : shape + (goal.current.index-shape)*smooth;
      const distance = goal.current.turn-turn;
      turn = reduced.matches ? goal.current.turn : turn + distance*smooth;
      tilt.x += (pointer.x-tilt.x)*.04; tilt.y += (pointer.y-tilt.y)*.04;
      const pulse = reduced.matches ? 0 : Math.min(1,Math.abs(distance)/1.1);
      // Orbit around the face; bounded depth tilt keeps the opening visible.
      const yaw = .24*Math.sin(time*.7+turn*.35)+tilt.x*.12;
      const pitch = .32 + posture.pitch*.3 + Math.sin(time*.55)*.08 + tilt.y*.1;
      const roll = time*.42 + turn -.28 + posture.roll*.6 + shape*.06;
      // A broad, gently asymmetric loop with a uniform circular section.
      // No local radius pinching, high-frequency bends, or edge-on camera turns.
      const segments=220;
      const phase=posture.phase+Math.sin(time*.23)*.12;
      const pinch=.11+.015*Math.sin(time*.36);
      const centres=Array.from({length:segments},(_,k)=>{
        const t=k/segments*Math.PI*2;
        const r=1.18+pinch*Math.cos(3*t+phase)+.055*Math.sin(2*t-phase)+.04*Math.cos(t+phase);
        return [
          r*Math.cos(t)*1.15+.045*Math.sin(2*t+phase),
          r*Math.sin(t)*(.78-.035*pulse),
          (.08+posture.fold*.10)*Math.sin(2*t+phase)+.035*Math.cos(3*t-phase),
        ];
      });
      const frames=centres.map((c,k)=>{
        const prev=centres[(k+segments-1)%segments],next=centres[(k+1)%segments];
        const tangent=next.map((v,i)=>v-prev[i]);
        const length=Math.hypot(...tangent)||1;
        const [tx,ty,tz]=tangent.map(v=>v/length);
        const planar=Math.hypot(tx,ty)||1;
        const normal=[-ty/planar,tx/planar,0];
        const binormal=[-tz*normal[1],tz*normal[0],tx*normal[1]-ty*normal[0]];
        const u=c.map((v,i)=>v-prev[i]),v=next.map((value,i)=>value-c[i]);
        const cross=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
        const curvature=2*Math.hypot(...cross)/(Math.hypot(...u)*Math.hypot(...v)*length||1);
        return {normal,binormal,curvature};
      });
      // Apply any safety reduction to the whole tube. Local thinning was
      // producing the necks and folds, despite the cross-section being round.
      const radius=Math.min(.19,.65/Math.max(...frames.map(f=>f.curvature)));
      for (let strand=0; strand<lines.length; strand++) {
        const v=strand/lines.length*Math.PI*2;
        const points:string[]=[];
        let depth=0;
        for(let k=0;k<=segments;k++) {
          const i=k%segments,t=i/segments*Math.PI*2;
          const {normal,binormal}=frames[i];
          const angle=v+.16*Math.sin(t*2+phase+posture.twist*.2);
          const radial=Math.cos(angle)*radius,side=Math.sin(angle)*radius;
          const x=centres[i][0]+normal[0]*radial+binormal[0]*side;
          const y=centres[i][1]+normal[1]*radial+binormal[1]*side;
          const z=centres[i][2]+normal[2]*radial+binormal[2]*side;
          const xx = x*Math.cos(yaw)+z*Math.sin(yaw), zz = -x*Math.sin(yaw)+z*Math.cos(yaw);
          const yy = y*Math.cos(pitch)-zz*Math.sin(pitch), zzz = y*Math.sin(pitch)+zz*Math.cos(pitch);
          const screenX = xx*Math.cos(roll)-yy*Math.sin(roll), screenY = xx*Math.sin(roll)+yy*Math.cos(roll);
          const scale = 128*(1-.13*pulse)/(1-zzz*.12);
          points.push(`${k?'L':'M'}${(400+screenX*scale).toFixed(2)} ${(205+screenY*scale).toFixed(2)}`);
          depth += zzz;
        }
        lines[strand].setAttribute('d',points.join(' '));
        lines[strand].style.opacity=String(.34+(depth/(segments+1)+1.6)/3.2*.6);
        lines[strand].style.strokeWidth = '.75';
      }
      if (!reduced.matches) raf=requestAnimationFrame(draw);
    };
    const move=(e:PointerEvent)=>{if(e.pointerType==='touch'||reduced.matches)return;const r=el.getBoundingClientRect();pointer={x:(e.clientX-r.left)/r.width*2-1,y:(e.clientY-r.top)/r.height*2-1};};
    const leave=()=>{pointer={x:0,y:0};};
    wake.current=()=>{if(!raf&&!document.hidden)raf=requestAnimationFrame(draw);};
    const visibility=()=>{cancelAnimationFrame(raf);raf=0;previous=0;if(!document.hidden)wake.current();};
    wake.current();
    el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);
    document.addEventListener('visibilitychange',visibility);reduced.addEventListener('change',visibility);
    return()=>{cancelAnimationFrame(raf);el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',visibility);wake.current=()=>{};};
  },[]);
  return <svg ref={svg} className="ribbon-art" viewBox="0 0 800 410" aria-hidden="true">
    <defs><linearGradient id="woven-ink" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ede8d9" stopOpacity=".94"/><stop offset=".5" stopColor="#b5c3a8" stopOpacity=".85"/><stop offset="1" stopColor="#7a8e73" stopOpacity=".48"/></linearGradient></defs>
    <g fill="none" stroke="url(#woven-ink)" strokeWidth=".75">{Array.from({length:56},(_,i)=><path key={i} className="ribbon-thread"/>)}</g>
  </svg>;
}
