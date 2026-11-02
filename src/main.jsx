import React, { useEffect, useState } from 'react';
import BlossomTree from './BlossomTree.jsx';
import DiwaliLantern from './DiwaliLantern.jsx';
import ProductShowcase from './ProductShowcase.jsx';
import RugsShowcase from './RugsShowcase.jsx';
import StringTieFooter from './StringTieFooter.jsx';
import CrochellasPage from './CrochellasPage.jsx';
import CrochellaProductPage from './CrochellaProductPage.jsx';
import DiwaliDhamakaPage from './DiwaliDhamakaPage.jsx';
import PolicyPages from './PolicyPages.jsx';
import UpiPaymentPage from './UpiPaymentPage.jsx';
import './PolicyPages.css';
import { createRoot } from 'react-dom/client';
import './styles.css';
import site from './content/site.json';

const INTRO = 'Arre, aa gaye? Welcome to Crochella. Yahan har dhaage mein ek kahani hai. Batao, aaj kya bunna hai?';

function App() {
  const [typed, setTyped] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [footerMessage, setFooterMessage] = useState('');


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

  const links = [['Kahani','#kahani'],['Karigari','#karigari'],['Collections','#collections'],['Shop','#collections'],['Diwali Dhamaka','/diwali-dhamaka/']];

  return <main className="crochella-site">
    <header className="hero-nav">
      <a className="brand-lockup" href="#home" aria-label="Crochella home"><span className="crochella-mark" aria-hidden="true"><img src="/uploads/Crochella%20Logo.png" alt="" /></span><span className="brand-wordmark">Crochella<sup>®</sup></span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label,href],i)=><React.Fragment key={label}>{i>0&&<span className="nav-comma">, </span>}<a href={href}>{label}</a></React.Fragment>)}</nav>
      <a className="nav-contact" href="mailto:hello@crochella.in">Baat karein</a>
      <button className={'menu-toggle '+(menuOpen?'is-open':'')} onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}><span/><span/><span/></button>
    </header>
    <div className={'mobile-menu '+(menuOpen?'is-open':'')} aria-hidden={!menuOpen}><nav>{links.map(([label,href])=><a key={label} href={href} onClick={()=>setMenuOpen(false)}>{label}</a>)}<a href="mailto:hello@crochella.in">Baat karein ↗</a></nav></div>

    <section className="hero-main" id="home" aria-label="Crochella introduction">
      <div className="hero-red-glow"/>
      <img className="hero-mandala" src="/uploads/diwali-mandala.svg" alt="" aria-hidden="true" />
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
    <ProductShowcase />
    <RugsShowcase />
    <section className="coming-section collections-section diwali-collections" id="collections"><span>03 / THE LITTLE THINGS</span><h2>Chhoti cheezein.<br/><em>Badi khushiyaan.</em></h2><p>Handmade charms, crochet companions, bags, rugs and more.</p><video className="diwali-shopping-bag" autoPlay muted loop playsInline preload="metadata" aria-hidden="true"><source src="/uploads/crochella-diwali-shopping-bag.webm" type="video/webm"/></video></section>

    <BlossomTree />
    <StringTieFooter meta={['Crochella', 'Handmade with love', 'Made to keep']} tapes={['A little note,', 'just for you.']} note={{ kicker: 'P.S.', text: 'Every little creation starts with a thread and a thought. Have an idea, a question, or a project in mind? We would love to hear from you.', cta: 'Write to us' }} height="100svh" />
    <footer className="site-footer pick-footer">
      <div className="pick-footer-topline"><span>THE CROCHELLA PLAYGROUND</span><span>Handmade, with a little mischief.</span></div>
      <div className="pick-footer-art">
        <div className="pick-character pick-character-cat"><button type="button" aria-label="Meet Mili the cat" onClick={()=>setFooterMessage('Mili says: Every little thing deserves a little love!')}>🐱</button></div>
        <div className="pick-character pick-character-bird"><button type="button" aria-label="Meet Chidi the bird" onClick={()=>setFooterMessage('Chidi says: Pick a tiny joy and carry it with you!')}>🐥</button></div>
        <div className="pick-character pick-character-dadi"><button type="button" aria-label="Meet Dadi" onClick={()=>setFooterMessage('Dadi says: Har loop mein thoda sa pyaar. Always.')}>👵</button></div>
        <div className="pick-character pick-character-bear"><button type="button" aria-label="Meet Golu the bear" onClick={()=>setFooterMessage('Golu says: Handmade hugs are the best hugs!')}>🐻</button></div>
        <div className="pick-word" aria-label="PICK">{['P','I','C','K'].map((letter,i)=><span key={i} tabIndex="0" aria-label={letter} style={{'--letter-index':i}}>{letter}</span>)}</div>
        <span className="pick-spark pick-spark-one" aria-hidden="true">✦</span><span className="pick-spark pick-spark-two" aria-hidden="true">♡</span><span className="pick-spark pick-spark-three" aria-hidden="true">✿</span>
        {footerMessage&&<div className="pick-speech" role="status">{footerMessage}<button type="button" aria-label="Close message" onClick={()=>setFooterMessage('')}>×</button></div>}
      </div>
      <p className="pick-footer-tagline">Little things, lovingly handmade.</p>
      <div className="pick-footer-actions">
        <a className="pick-footer-button pick-footer-button-outline" href="#collections"><span aria-hidden="true">🧶</span> Explore handmade</a>
        <a className="pick-footer-button pick-footer-button-dark" href="mailto:hello@crochella.in"><span aria-hidden="true">♡</span> Baat karein</a>
      </div>
      <div className="pick-footer-bottom">
        <a className="footer-brand" href="#home">Crochella<sup>®</sup></a>
        <span>© {new Date().getFullYear()} Crochella · Woven with love, from our hands to yours.</span>
        <nav className="site-legal-links"><a href="/privacy-policy">Privacy</a><a href="/shipping-policy">Shipping</a><a href="/returns-refunds">Returns</a><a href="/terms">Terms</a><a href="/contact">Contact</a><a href="https://www.instagram.com/crochellaart/" target="_blank" rel="noreferrer">Instagram ↗</a></nav>
      </div>
    </footer>
  </main>;
}

const routePath=window.location.pathname.replace(/\/$/, '');
const productRoute=routePath.match(/^\/product\/([^/]+)$/);
const policyRoutes=['/privacy-policy','/shipping-policy','/returns-refunds','/terms','/contact'];
createRoot(document.getElementById('root')).render(productRoute ? <CrochellaProductPage slug={decodeURIComponent(productRoute[1])}/> : routePath === '/pay' ? <UpiPaymentPage/> : routePath === '/crochellas' ? <CrochellasPage/> : routePath === '/diwali-dhamaka' ? <DiwaliDhamakaPage/> : policyRoutes.includes(routePath) ? <PolicyPages path={routePath}/> : <App/>);
