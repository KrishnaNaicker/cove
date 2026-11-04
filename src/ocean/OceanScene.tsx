import { useEffect, useRef, useState } from "react";
import { OceanEngine } from "./engine";
import type { SharkSpec } from "./world";

const DESKTOP: SharkSpec[] = [
  { kind: "classic", size: 1 },
  { kind: "classic", size: .86 },
  { kind: "classic", size: .74 },
  { kind: "mako", size: .46 },
  { kind: "nurse", size: .39 },
];
const MOBILE: SharkSpec[] = [
  { kind: "classic", size: .88 },
  { kind: "mako", size: .53 },
  { kind: "nurse", size: .45 },
];
export default function OceanScene() {
  const ref=useRef<HTMLCanvasElement>(null);
  const [failed,setFailed]=useState(false);
  useEffect(()=>{
    const canvas=ref.current;
    if(!canvas)return;
    const mobile=matchMedia('(max-width: 767px)');
    let engine:OceanEngine|null=null;
    const start=()=>{
      engine?.destroy();
      try {engine=new OceanEngine(canvas,mobile.matches?MOBILE:DESKTOP);setFailed(false);}
      catch {setFailed(true);}
    };
    start();mobile.addEventListener('change',start);
    return()=>{engine?.destroy();mobile.removeEventListener('change',start);};
  },[]);
  return <canvas ref={ref} aria-hidden="true" data-testid="ocean-canvas" data-failed={failed||undefined} className="ocean-canvas"/>;
}
