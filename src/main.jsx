import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import site from './content/site.json';

const INTRO = 'Arre, aa gaye? Welcome to Crochella. Yahan har dhaage mein ek kahani hai. Batao, aaj kya bunna hai?';

function App() {
  const [typed, setTyped] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);


  useEffect(() => {
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setTyped(INTRO.slice(0, i));
      if (i >= INTRO.length) window.clearInterval(timer);
    }, 38);
    return () => window.clearInterval(timer);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@crochella.in');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch { window.location.href = 'mailto:hello@crochella.in'; }
  };

  const links = [['Kahani','#kahani'],['Karigari','#karigari'],['Collections','#collections'],['Shop','#collections']];

  return <main className="crochella-site">
    <header className="hero-nav">
      <a className="brand-lockup" href="#home"><span className="brand-word">Crochella<sup>®</sup></span><span className="brand-flower">✳︎</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label,href],i)=><React.Fragment key={label}>{i>0&&<span className="nav-comma">, </span>}<a href={href}>{label}</a></React.Fragment>)}</nav>
      <a className="nav-contact" href="mailto:hello@crochella.in">Baat karein</a>
      <button className={'menu-toggle '+(menuOpen?'is-open':'')} onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}><span/><span/><span/></button>
    </header>
    <div className={'mobile-menu '+(menuOpen?'is-open':'')} aria-hidden={!menuOpen}><nav>{links.map(([label,href])=><a key={label} href={href} onClick={()=>setMenuOpen(false)}>{label}</a>)}<a href="mailto:hello@crochella.in">Baat karein ↗</a></nav></div>

    <section className="hero-main" id="home">
      <div className="hero-red-glow"/>
      <div className="hero-copy">
        <div className="dadi-intro"><span>Namaste, milo</span><strong>D.A.D.I. se</strong><small>Dhaagon Aur Dil Ki Inventor</small></div>
        <p className="hero-typewriter" aria-live="polite">{typed}<i className="typing-cursor"/></p>
        <div className="hero-actions">
          <a className="action-pill" href="#collections">Explore our little things</a>
          <a className="action-pill" href="#kahani">Dadi ki kahani</a>
          <a className="action-pill" href="#karigari">Dekho kaise banta hai</a>
          <a className="action-pill" href="#collections">Apna crochet chuno</a>
          <button className="action-pill action-pill-outline" onClick={copyEmail}>{copied?'Copied!':'Reach us: hello@crochella.in'} <span>▢</span></button>
        </div>
        <div className="hero-origin"><i/> HANDMADE WITH LOVE · FATEHPUR, BAHUA, U.P.</div>
      </div>
      <div className="hero-video-layer" aria-hidden="true">
        <video className="hero-video" autoPlay muted loop playsInline preload="metadata">
          <source src="/uploads/crochella-hero-optimized.mp4" type="video/mp4"/>
        </video>
      </div>
      <div className="hero-bottom-note"><span>01</span><i/> A STORY IN EVERY STITCH</div>
      <a className="hero-scroll-cue" href="#kahani">SCROLL TO UNFOLD <span>↓</span></a>
    </section>

    <section className="story-preview" id="kahani">
      <div className="story-preview-label">01 / HAMAARI KAHANI</div>
      <div className="story-preview-copy"><p className="story-kicker">FATEHPUR · BAHUA · UTTAR PRADESH</p><h2>{site.story.title}</h2><p className="story-lead">{site.story.lead}</p><a href="#karigari" className="story-link">Suno poori kahani <span>↗</span></a></div>
      <div className="story-stamp">WOVEN<br/>WITH<br/><em>LOVE</em></div>
    </section>
    <section className="coming-section" id="karigari"><span>02 / HAATHON KA JAADU</span><h2>Har loop mein<br/><em>thoda sa pyaar.</em></h2><p>From Dadi's hands to yours. Our making story is coming together.</p></section>
    <section className="coming-section collections-section" id="collections"><span>03 / THE LITTLE THINGS</span><h2>Chhoti cheezein.<br/><em>Badi khushiyaan.</em></h2><p>Handmade charms, crochet companions, bags, rugs and more.</p></section>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
