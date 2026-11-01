import React, { useEffect, useState } from 'react';

const navItems = [['Kahani','/#kahani'],['Karigari','/#karigari'],['Collections','/#collections'],['Shop','/crochellas'],['Diwali Dhamaka','/diwali-dhamaka/']];

export default function DiwaliDhamakaPage() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const page = document.querySelector('.diwali-city-page');
    let raf = 0;
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const amount = Math.min(window.scrollY, window.innerHeight);\n        page?.style.setProperty('--diwali-parallax-sky', `${-amount * .16}px`);\n        page?.style.setProperty('--diwali-parallax-lanterns', `${amount * .056}px`);\n        page?.style.setProperty('--diwali-parallax-buildings', `${amount * .0352}px`);\n        page?.style.setProperty('--diwali-parallax-bridge', `${amount * .0192}px`);\n        page?.style.setProperty('--diwali-parallax-water', `${-amount * .0064}px`);\n        page?.style.setProperty('--diwali-parallax-pavilion', `${amount * .0224}px`);\n        page?.style.setProperty('--diwali-parallax-stalls', `${amount * .016}px`);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); };
  }, []);
  return <main className="diwali-city-page">
    <header className={`hero-nav diwali-city-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="brand-lockup" href="/" aria-label="Crochella home"><span className="diwali-nav-monogram">C</span><span className="diwali-nav-wordmark">Crochella<sup>®</sup></span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{navItems.map(([label,href])=><a key={label} className={label==='Diwali Dhamaka'?'is-current':''} href={href}>{label}</a>)}</nav>
      <a className="nav-contact" href="mailto:hello@crochella.in">Baat karein ↗</a>
    </header>
    <section className="diwali-city-hero" id="diwali-top">
      <div className="diwali-city-sky"/>
      <div className="diwali-city-lanterns" aria-hidden="true">{Array.from({length:25},(_,i)=><i key={i} style={{'--i':i}}/>)}</div>
      <div className="diwali-city-buildings diwali-city-buildings-back" aria-hidden="true"/>
      <div className="diwali-city-bridge" aria-hidden="true"><span/><span/><span/><span/><span/><span/><span/><span/><span/></div>
      <div className="diwali-city-water" aria-hidden="true"><i/><i/><i/><i/><i/><i/></div>
      <div className="diwali-city-floating-diyas" aria-hidden="true"><i/><i/><i/><i/><i/></div>
      <div className="diwali-city-hero-copy"><span className="diwali-city-eyebrow">CROCHELLA · DIWALI 2026</span><h1>Let it <em>glow.</em></h1><p>A little light, a little handmade magic.<br/>Celebrate the season with pieces made with love.</p><a href="#lantern-market" className="diwali-city-button">Follow the lantern <span>↓</span></a></div>
      <span className="diwali-city-scroll-label">SCROLL TO WANDER <b>↓</b></span>
    </section>
    <section className="diwali-city-story diwali-city-scene">
      <div className="diwali-city-story-card"><span>02 / THE LANTERN RIVER</span><h2>Built slowly,<br/><em>lit by hand.</em></h2><p>Every stitch carries a little warmth. Wander through our festive river town, where handmade treasures glow beside the water.</p><div className="diwali-city-stats"><div><b>100%</b><small>handmade</small></div><div><b>∞</b><small>little stories</small></div><div><b>1</b><small>loving Dadi</small></div></div>
      <div className="diwali-city-pavilion" aria-hidden="true"><div className="diwali-city-roof"/><div className="diwali-city-pavilion-lights">{Array.from({length:11},(_,i)=><i key={i}/>)}</div><div className="diwali-city-clock">Crochella<br/><b>♥</b></div></div>
      <div className="diwali-city-reflections" aria-hidden="true"/>
    </section>
    <section className="diwali-city-market diwali-city-scene" id="lantern-market">
      <div className="diwali-city-market-stalls" aria-hidden="true">{Array.from({length:7},(_,i)=><div key={i}><span/><i/><b/></div>)}</div>
      <div className="diwali-city-market-card"><span>03 / LANTERN MARKET</span><h2>Work that <em>holds<br/>its glow.</em></h2><p>Little keepsakes, made one loop at a time. Pick a lantern to discover a handmade favorite.</p><div className="diwali-city-market-products"><a href="/crochellas"><img src="/uploads/strawberry-keychain.png" alt="Crochet strawberry charm"/><b>Berry Sweet</b><small>Handmade charm ↗</small></a><a href="/crochellas"><img src="/uploads/pink-bow-keychain.png" alt="Pink crochet bow"/><b>Pink Bow</b><small>Handmade charm ↗</small></a><a href="/crochellas"><img src="/uploads/avocado-keychain.png" alt="Crochet avocado charm"/><b>Avo Cutie</b><small>Handmade charm ↗</small></a></div>
      </div>
    </section>
    <section className="diwali-city-finale diwali-city-scene"><div className="diwali-city-finale-copy"><span>04 / SAMPAAN PIER</span><h2>What we make<br/><em>together.</em></h2><p>Five crafts, one studio. Open a little story and take the warmth home.</p><a href="/crochellas" className="diwali-city-button">Explore the collection <span>↗</span></a></div><div className="diwali-city-pier-lights" aria-hidden="true">{Array.from({length:16},(_,i)=><i key={i}/>)}</div></section>
    <footer className="diwali-city-footer"><a href="/">Crochella®</a><span>WOVEN WITH LOVE · FATEHPUR, INDIA</span><a href="/crochellas">Shop handmade ↗</a></footer>
  </main>;
}
