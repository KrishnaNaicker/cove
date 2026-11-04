import OceanScene from "../ocean/OceanScene";
import { profile } from "../data/portfolio";

export default function Home() {
  return <section className="home-view" data-testid="home-view">
    <OceanScene />
    <div className="home-block">
      <p className="home-greeting">{profile.greeting}<span className="quote-cursor" aria-hidden="true" /></p>
      <h1 className="home-heading"><span className="home-salutation" lang="hi-Latn">{profile.salutation}</span><span>{profile.introduction}</span></h1>
      <div className="home-intro">
        <p>Currently leading <span className="product-mention">
          <a href={profile.currentWork.href} className="bio-product" target="_blank" rel="noreferrer" aria-describedby="orkus-preview">{profile.currentWork.product}</a>
          <span className="product-preview" role="tooltip" id="orkus-preview"><strong>Orkus</strong><span>Agent-building &amp; orchestration.</span><span className="product-preview-url">agents.allcognix.com <span aria-hidden="true">↗</span></span></span>
        </span> <span className="home-company">{profile.currentWork.company}</span>.</p>
        {profile.bioLines.map(line=><p key={line}>{line}</p>)}
      </div>
      <ul className="home-links" data-testid="home-links">{profile.links.map(link=><li key={link.label}><a className="quiet-link" data-testid={`home-link-${link.label.toLowerCase()}`} href={link.href} {...(link.href.startsWith('http')||link.href.endsWith('.pdf')?{target:'_blank',rel:'noreferrer'}:{})}>{link.label}</a></li>)}</ul>
    </div>
  </section>;
}
