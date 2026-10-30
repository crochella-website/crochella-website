import React, { useEffect, useState } from 'react';

const crochetSlots = [
  { id:'panda', name:'Panda Pal', note:'Panda keychain', image:'/uploads/panda-keychain.png', tone:'plum', mark:'🐼', story:'A little panda pal, crocheted stitch by stitch and finished with a golden clasp.' },
  { id:'turtle', name:'Turtle Buddy', note:'Turtle keychain', image:'/uploads/turtle-keychain.png', tone:'sage', mark:'🐢', story:'A tiny turtle with a textured shell and a cheerful little face.' },
  { id:'banana', name:'Bananita', note:'Banana keychain', image:'/uploads/banana-keychain.png', tone:'honey', mark:'🍌', story:'A sunny banana buddy to add a playful pop to your everyday bag.' },
  { id:'bow', name:'Pink Bow', note:'Bow keychain', image:'/uploads/pink-bow-keychain.png', tone:'rose', mark:'🎀', story:'A soft pink crochet bow with a sweet, giftable finish.' },
  { id:'burger', name:'Burger Buddy', note:'Burger keychain', image:'/uploads/burger-keychain.png', tone:'peach', mark:'🍔', story:'A mini burger charm, complete with all the colourful layers.' },
  { id:'lion', name:'Little Lion', note:'Lion keychain', image:'/uploads/lion-keychain.png', tone:'honey', mark:'🦁', story:'A tiny lion with a fluffy-looking mane made from warm rust-coloured yarn.' },
  { id:'avocado', name:'Avo Cutie', note:'Avocado keychain', image:'/uploads/avocado-keychain.png', tone:'sage', mark:'🥑', story:'A happy avocado charm in fresh shades of green.' },
  { id:'penguin', name:'Penguin Pal', note:'Penguin keychain', image:'/uploads/penguin-keychain.png', tone:'plum', mark:'🐧', story:'A cosy little penguin wearing a soft blue scarf.' },
  { id:'handbag', name:'Mini Tote', note:'Handbag keychain', image:'/uploads/handbag-keychain.png', tone:'peach', mark:'👜', story:'A miniature crochet handbag with a flower detail and golden hardware.' },
  { id:'strawberry', name:'Berry Sweet', note:'Strawberry keychain', image:'/uploads/strawberry-keychain.png', tone:'rose', mark:'🍓', story:'A bright strawberry charm topped with green leaves and a tiny flower.' },
  { id:'chilli', name:'Chilli Pop', note:'Chilli keychain', image:'/uploads/chilli-keychain.png', tone:'rose', mark:'🌶️', story:'A playful red chilli charm with a green crochet top.' },
  { id:'bee', name:'Busy Bee', note:'Bee keychain', image:'/uploads/bee-keychain.png', tone:'honey', mark:'🐝', story:'A happy little bee with soft wings and sunny yellow stripes.' },
  { id:'bear', name:'Teddy Bear', note:'Bear keychain', image:'/uploads/bear-keychain.png', tone:'peach', mark:'🧸', story:'A classic teddy bear charm finished with a tiny red bow.' },
  { id:'evil-eye', name:'Good Vibes', note:'Evil eye keychain', image:'/uploads/evil-eye-keychain.png', tone:'plum', mark:'🧿', story:'A bold blue evil-eye charm with a daisy accent and playful tassels.' },
  { id:'cherry', name:'Cherry Duo', note:'Cherry keychain', image:'/uploads/cherry-keychain.png', tone:'rose', mark:'🍒', story:'Two little cherries with leafy green stems, made to brighten your keys.' },
  { id:'sunflower', name:'Sunshine', note:'Sunflower keychain', image:'/uploads/sunflower-keychain.png', tone:'honey', mark:'🌻', story:'A cheerful sunflower charm with a rich textured centre.' },
  { id:'heart', name:'Love Note', note:'Heart keychain', image:'/uploads/heart-keychain.png', tone:'rose', mark:'♥', story:'A bright red crochet heart, a tiny reminder to carry a little love.' },
];

function DadiIllustration() {
  return <img className="product-dadi-art" src="/uploads/crochella-dadi-3d.png.png" alt="Dadi, a 3D wool-textured crochet grandmother"/>;
}

export default function ProductShowcase() {
  const [category, setCategory] = useState('crochet');
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [webBurst, setWebBurst] = useState(false);
  const [burstTarget, setBurstTarget] = useState(null);
  const visibleCount = 5;
  const products = crochetSlots;
  const visibleProducts = Array.from({length:visibleCount},(_,i)=>products[(page+i)%products.length]);
  const step = (direction) => { setPage(current=>(current+direction+products.length)%products.length); setActive(current=>(current+direction+products.length)%products.length); };
  useEffect(() => { if (paused || selected || category !== 'crochet') return; const timer = window.setInterval(() => setPage(current => { const next = (current + 1) % products.length; setActive(next); return next; }), 3200); return () => window.clearInterval(timer); }, [paused, selected, category, products.length]);

  // Reveal each section as it enters the viewport, respecting reduced-motion settings.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = document.querySelectorAll('.story-preview-label, .story-preview-copy, .story-stamp, .product-world-top, .product-tray, .product-world-bottom, .coming-section > *, .tree-garden-heading, .tree-scene-wrap, .tree-controls, .tree-mode-switch, .tree-colour-dots, .site-footer > *');
    targets.forEach((node, index) => { node.classList.add('scroll-reveal'); node.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 90}ms`); });
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer.unobserve(entry.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    targets.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const releaseProduct = product => {
    setBurstTarget(product.id);
    setWebBurst(true);
    window.setTimeout(() => { setSelected(product); setWebBurst(false); setBurstTarget(null); }, 900);
  };

  return <section className="product-world" id="karigari" aria-label="Crochella handmade collections">
    <div className="product-world-glow" aria-hidden="true"/>
    <div className="product-world-top">
      <div className="product-world-intro">
        <span className="product-eyebrow"><i/> OUR LITTLE CREATIONS</span>
        <h2>Har loop mein<br/><em>thoda sa pyaar.</em></h2>
        <p>Made slowly, with care. Every little piece carries a story from Dadi’s hands to yours.</p>
      </div>
      <div className="product-category-switch" role="tablist" aria-label="Choose a collection">
        <button className={category==='crochet'?'active':''} role="tab" aria-selected={category==='crochet'} onClick={()=>{setCategory('crochet');setSelected(null);}}><span>✿</span> Crochet</button>
        <button className={category==='rugs'?'active':''} role="tab" aria-selected={category==='rugs'} onClick={()=>{setCategory('rugs');setSelected(null);}}><span>▦</span> Rugs</button>
      </div>
    </div>

    <div className="product-stage">
      <div className="product-yarn-trail" aria-hidden="true"><svg viewBox="0 0 1200 170" preserveAspectRatio="none"><path d="M-30 112 C150 18 230 180 390 85 S650 20 790 93 1020 150 1230 43"/></svg></div>
      <div className="dadi-character-wrap web-swing-dadi"><DadiIllustration/><div className="dadi-caption">D.A.D.I. <span>·</span> THE HANDS BEHIND THE MAGIC</div></div>

      <svg className={"product-web-net" + (webBurst ? " is-bursting" : "")} viewBox="0 0 1200 470" preserveAspectRatio="none" aria-hidden="true">
        <defs><radialGradient id="webGlow"><stop offset="0" stopColor="#fff8ee"/><stop offset="1" stopColor="#fff8ee" stopOpacity="0"/></radialGradient></defs>
        <g className="web-strands">
          <path d="M955 18 Q720 70 430 118 T15 210"/>
          <path d="M955 18 Q730 150 470 205 T25 360"/>
          <path d="M955 18 Q770 250 600 340 T260 465"/>
          <path d="M955 18 Q930 210 950 470"/>
          <path d="M955 18 Q1110 155 1190 300"/>
          <path d="M955 18 Q1040 80 1195 90"/>
          <path d="M955 18 Q820 15 650 8"/>
          <path d="M955 18 Q600 15 270 8"/>
          <path d="M955 18 Q470 55 115 92"/>
          <path d="M955 18 Q850 100 610 112 Q340 120 120 92"/>
          <path d="M955 18 Q850 175 610 205 Q330 230 25 210"/>
          <path d="M955 18 Q850 260 610 300 Q340 350 25 360"/>
          <path d="M955 18 Q900 350 600 410 Q430 445 260 465"/>
          <path d="M115 92 Q500 165 955 18 Q1100 190 1195 300"/>
          <path d="M25 210 Q420 285 955 18 Q1060 290 950 470"/>
          <path d="M25 360 Q430 420 955 18"/>
          <path d="M270 8 Q520 190 955 18 Q810 290 600 410"/>
          <path d="M650 8 Q730 180 955 18 Q970 250 950 470"/>
        </g>
        <g className="web-sparks"><circle cx="610" cy="205" r="5"/><circle cx="430" cy="118" r="3"/><circle cx="820" cy="280" r="4"/><circle cx="1040" cy="170" r="3"/><circle cx="260" cy="360" r="4"/><circle cx="955" cy="18" r="7"/></g>
      </svg>

      {category==='crochet'?<>
        <div className="product-shuttle" aria-hidden="true"><span/><i/></div>
        <div className={"product-tray" + (webBurst ? " is-bursting" : "")} onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onFocus={()=>setPaused(true)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setPaused(false);}}>
          <div className="product-tray-edge"/>
          <div className="product-card-row">
            {visibleProducts.map((product,index)=>{
              const productIndex=(page+index)%products.length;
              const isBurstTarget=burstTarget===product.id;
              return <div key={product.id} className={"product-card-wrap" + (isBurstTarget?" is-burst-target":"") + (webBurst&&!isBurstTarget?" is-web-dimmed":"")}>
                <button className={'product-slot '+product.tone+(active===productIndex?' is-active':'')} onClick={()=>{setActive(productIndex);releaseProduct(product);}} aria-label={'View '+product.name}>
                  <span className="product-slot-ribbon"/>
                  <span className="product-slot-art"><img className="product-slot-image" src={product.image} alt={product.note} loading="lazy"/><span className="product-slot-yarn"/></span>
                </button>
                <div className="product-slot-caption"><span className="product-slot-title">{product.note}</span><span className="product-slot-sub">HAND-CROCHETED</span></div>
              </div>;
            })}
          </div>
          <div className="product-tray-front"><span>HANDMADE WITH LOVE</span><i>✦</i><span>FATEHPUR · INDIA</span></div>
        </div>
        <div className="product-stage-controls"><button onClick={()=>step(-1)} aria-label="Previous crochet product">‹</button><span>{String(page+1).padStart(2,'0')} <i>/</i> {String(products.length).padStart(2,'0')}</span><button onClick={()=>step(1)} aria-label="Next crochet product">›</button></div>
      </>:<div className="rugs-coming-panel"><span className="rugs-coming-icon">▦</span><h3>Room for something<br/><em>beautiful.</em></h3><p>The rug collection will have its own little world here. We’ll bring it to life next.</p><span className="rugs-coming-note">RUG COLLECTION · COMING NEXT</span></div>}
    </div>

    <div className="product-world-bottom"><span>01 — CROCHET COLLECTION</span><p>{category==='crochet'?'17 little creations, each made with love.':'A new collection, woven for your spaces.'}</p><a href="#collections">Explore our world <span>↗</span></a></div>

    <div className="product-storyboard" aria-label="How Dadi's web interaction works">
      <article className="storyboard-step">
        <div className="storyboard-visual storyboard-initial">
          <div className="storyboard-mini-dadi"><img src="/uploads/crochella-dadi-3d.png.png" alt=""/></div>
          <div className="storyboard-mini-web"/>
          <div className="storyboard-mini-products"><i>🐼</i><i>🐢</i><i>🍌</i><i>🎀</i><i>🍔</i></div>
        </div>
        <div className="storyboard-caption"><b>1</b><span>Initial State</span></div>
      </article>
      <span className="storyboard-arrow" aria-hidden="true">›</span>
      <article className="storyboard-step">
        <div className="storyboard-visual storyboard-tap">
          <div className="storyboard-mini-dadi"><img src="/uploads/crochella-dadi-3d.png.png" alt=""/></div>
          <div className="storyboard-mini-web"/>
          <div className="storyboard-mini-products"><i>🐼</i><i className="mini-selected">🐢</i><i>🍌</i><i>🎀</i><i>🍔</i></div>
          <span className="storyboard-cursor">☝</span>
        </div>
        <div className="storyboard-caption"><b>2</b><span>User Taps on a Product</span></div>
      </article>
      <span className="storyboard-arrow" aria-hidden="true">›</span>
      <article className="storyboard-step">
        <div className="storyboard-visual storyboard-burst">
          <div className="storyboard-mini-dadi"><img src="/uploads/crochella-dadi-3d.png.png" alt=""/></div>
          <div className="storyboard-mini-web mini-web-break"/>
          <div className="storyboard-mini-products"><i>🐼</i><i className="mini-selected">🐢</i><i>🍌</i><i>🎀</i><i>🍔</i></div>
          <span className="storyboard-sparkles">✦　✧　✦</span>
        </div>
        <div className="storyboard-caption"><b>3</b><span>Web Dissolves / Burst Effect</span></div>
      </article>
    </div>

    {selected&&category==='crochet'&&<div className="product-detail-backdrop" role="presentation" onClick={()=>setSelected(null)}><div className="product-detail-glass" role="dialog" aria-modal="true" aria-label={selected.name} onClick={e=>e.stopPropagation()}><button className="product-detail-close" onClick={()=>setSelected(null)} aria-label="Close product details">×</button><div className="product-detail-art"><img src={selected.image} alt={selected.name}/><small>MADE WITH LOVE · CROCHELLA</small></div><div className="product-detail-copy"><span className="product-eyebrow"><i/> HANDMADE CROCHET</span><h3>{selected.name}</h3><p>{selected.story}</p><div className="product-detail-meta"><span>Craft <b>Hand-crocheted</b></span><span>Finish <b>Gold-tone clasp</b></span><span>Origin <b>Fatehpur, India</b></span></div><div className="product-marketplace-note">Price and purchase links will be added once the product listings are ready.</div></div></div></div>}
  </section>;
}
