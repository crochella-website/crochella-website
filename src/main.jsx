import React, { useEffect, useState } from 'react';
import BlossomTree from './BlossomTree.jsx';
import DiwaliLantern from './DiwaliLantern.jsx';
import DiwaliCanvas from './DiwaliCanvas.jsx';
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

  useEffect(() => {
    const hero = document.querySelector('.hero-main');
    if (!hero) return;
    const onMove = (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty('--pointer-x', x.toFixed(3));
      hero.style.setProperty('--pointer-y', y.toFixed(3));
    };
    const onLeave = () => {
      hero.style.setProperty('--pointer-x', '0');
      hero.style.setProperty('--pointer-y', '0');
    };
    hero.addEventListener('pointermove', onMove, { passive: true });
    hero.addEventListener('pointerleave', onLeave);
    return () => {
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
    };
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
      <a className="brand-lockup" href="#home" aria-label="Crochella home"><img className="brand-logo" src="data:image/webp;base64,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" alt="Crochella — Woven Stories"/></a>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label,href],i)=><React.Fragment key={label}>{i>0&&<span className="nav-comma">, </span>}<a href={href}>{label}</a></React.Fragment>)}</nav>
      <a className="nav-contact" href="mailto:hello@crochella.in">Baat karein</a>
      <button className={'menu-toggle '+(menuOpen?'is-open':'')} onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}><span/><span/><span/></button>
    </header>
    <div className={'mobile-menu '+(menuOpen?'is-open':'')} aria-hidden={!menuOpen}><nav>{links.map(([label,href])=><a key={label} href={href} onClick={()=>setMenuOpen(false)}>{label}</a>)}<a href="mailto:hello@crochella.in">Baat karein ↗</a></nav></div>

    <section className="hero-main" id="home" aria-label="Crochella introduction">
      <div className="hero-red-glow"/>
      <video className="diwali-lantern-cluster" autoPlay muted loop playsInline preload="metadata" aria-hidden="true"><source src="/uploads/diwali-lantern-cluster.webm" type="video/webm"/></video>

      <div className="festive-particles" aria-hidden="true">{Array.from({length:16},(_,i)=><i key={i}/>)}</div>
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
        <video className="hero-video" autoPlay muted loop playsInline preload="auto">
          <source src="/uploads/Crochella_Hero_Video_1080p%20(15).mp4" type="video/mp4"/>
        </video>
      </div>
      <div className="hero-bottom-note"><span>01</span><i/> A STORY IN EVERY STITCH</div>
      <a className="hero-scroll-cue" href="#kahani">SCROLL TO UNFOLD <span>↓</span></a>
    </section>

    <section className="story-preview" id="kahani">
      <DiwaliLantern />
      <div className="story-preview-label">01 / HAMAARI KAHANI</div>
      <div className="story-preview-copy"><p className="story-kicker">FATEHPUR · BAHUA · UTTAR PRADESH</p><h2>{site.story.title}</h2><p className="story-lead">{site.story.lead}</p><a href="#karigari" className="story-link">Suno poori kahani <span>↗</span></a></div>
      <div className="story-stamp">WOVEN<br/>WITH<br/><em>LOVE</em></div>
    </section>
    <DiwaliCanvas />
    <section className="coming-section craft-section" id="karigari"><video className="diwali-floating-lanterns" autoPlay muted loop playsInline preload="metadata" aria-hidden="true"><source src="/uploads/diwali-floating-lanterns.webm" type="video/webm"/></video><span>02 / HAATHON KA JAADU</span><h2>Har loop mein<br/><em>thoda sa pyaar.</em></h2><p>From Dadi's hands to yours. Our making story is coming together.</p></section>
    <section className="coming-section collections-section diwali-collections" id="collections"><video className="diwali-diya-wishes" autoPlay muted loop playsInline preload="metadata" aria-hidden="true"><source src="/uploads/diwali-diya-wishes.webm" type="video/webm"/></video><span>03 / THE LITTLE THINGS</span><h2>Chhoti cheezein.<br/><em>Badi khushiyaan.</em></h2><p>Handmade charms, crochet companions, bags, rugs and more.</p><video className="diwali-shopping-bag" autoPlay muted loop playsInline preload="metadata" aria-hidden="true"><source src="/uploads/crochella-diwali-shopping-bag.webm" type="video/webm"/></video></section>

    <BlossomTree />
    <footer className="site-footer">
      <a className="footer-brand" href="#home">Crochella<sup>®</sup></a>
      <p>Woven with love, from our hands to yours.</p>
      <a href="https://www.instagram.com/crochellaart/" target="_blank" rel="noreferrer">@crochellaart ↗</a>
      <small>© {new Date().getFullYear()} Crochella. Made with love.</small>
    </footer>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
