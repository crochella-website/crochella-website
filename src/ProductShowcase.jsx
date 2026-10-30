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
  return <img className="product-dadi-art" src="/uploads/crochella-dadi-3d.png" alt="Dadi, a 3D wool-textured crochet grandmother"/>;
}

export default function ProductShowcase() {
  const [category, setCategory] = useState('crochet');
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const visibleCount = 5;
  const products = crochetSlots;
  const visibleProducts = Array.from({length:visibleCount},(_,i)=>products[(page+i)%products.length]);
  const step = (direction) => { setPage(current=>(current+direction+products.length)%products.length); setActive(current=>(current+direction+products.length)%products.length); };

  return <section className="product-world" id="karigari" aria-label="Crochella handmade collections">
    <div className="product-world-glow" aria-hidden="true"/>
    <div className="product-world-top"><div className="product-world-intro"><span className="product-eyebrow"><i/> OUR LITTLE CREATIONS</span><h2>Har loop mein<br/><em>thoda sa pyaar.</em></h2><p>Made slowly, with care. Every little piece carries a story from Dadi’s hands to yours.</p></div>
      <div className="product-category-switch" role="tablist" aria-label="Choose a collection"><button className={category==='crochet'?'active':''} role="tab" aria-selected={category==='crochet'} onClick={()=>{setCategory('crochet');setSelected(null);}}><span>✿</span> Crochet</button><button className={category==='rugs'?'active':''} role="tab" aria-selected={category==='rugs'} onClick={()=>{setCategory('rugs');setSelected(null);}}><span>▦</span> Rugs</button></div>
    </div>
    <div className="product-stage"><div className="product-yarn-trail" aria-hidden="true"><svg viewBox="0 0 1200 170" preserveAspectRatio="none"><path d="M-30 112 C150 18 230 180 390 85 S650 20 790 93 1020 150 1230 43"/></svg></div><div className="dadi-character-wrap"><DadiIllustration/><div className="dadi-caption">D.A.D.I. <span>·</span> the hands behind the magic</div></div>
      {category==='crochet'?<><div className="product-shuttle" aria-hidden="true"><span/><i/></div><div className="product-tray" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onFocus={()=>setPaused(true)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setPaused(false);}}><div className="product-tray-edge"/><div className="product-card-row">{visibleProducts.map((product,index)=>{const productIndex=(page+index)%products.length;return <div key={product.id} className="product-card-wrap"><button className={'product-slot '+product.tone+(active===productIndex?' is-active':'')} onClick={()=>{setActive(productIndex);setSelected(product);}} aria-label={'View '+product.name}><span className="product-slot-ribbon"/><span className="product-slot-art"><img className="product-slot-image" src={product.image} alt={product.note} loading="lazy"/><span className="product-slot-yarn"/></span></button><div className="product-slot-caption"><span className="product-slot-title">{product.note}</span><span className="product-slot-sub">HAND-CROCHETED</span></div></div>;})}</div><div className="product-tray-front"><span>HANDMADE WITH LOVE</span><i>✦</i><span>FATEHPUR · INDIA</span></div></div><div className="product-stage-controls"><button onClick={()=>step(-1)} aria-label="Previous crochet product">‹</button><span>{String(page+1).padStart(2,'0')} <i>/</i> {String(products.length).padStart(2,'0')}</span><button onClick={()=>step(1)} aria-label="Next crochet product">›</button></div></>:<div className="rugs-coming-panel"><span className="rugs-coming-icon">▦</span><h3>Room for something<br/><em>beautiful.</em></h3><p>The rug collection will have its own little world here. We’ll bring it to life next.</p><span className="rugs-coming-note">RUG COLLECTION · COMING NEXT</span></div>}
    </div>
    <div className="product-world-bottom"><span>01 — CROCHET COLLECTION</span><p>{category==='crochet'?'17 little creations, each made with love.':'A new collection, woven for your spaces.'}</p><a href="#collections">Explore our world <span>↗</span></a></div>
    {selected&&category==='crochet'&&<div className="product-detail-backdrop" role="presentation" onClick={()=>setSelected(null)}><div className="product-detail-glass" role="dialog" aria-modal="true" aria-label={selected.name} onClick={e=>e.stopPropagation()}><button className="product-detail-close" onClick={()=>setSelected(null)} aria-label="Close product details">×</button><div className="product-detail-art"><img src={selected.image} alt={selected.name}/><small>MADE WITH LOVE · CROCHELLA</small></div><div className="product-detail-copy"><span className="product-eyebrow"><i/> HANDMADE CROCHET</span><h3>{selected.name}</h3><p>{selected.story}</p><div className="product-detail-meta"><span>Craft <b>Hand-crocheted</b></span><span>Finish <b>Gold-tone clasp</b></span><span>Origin <b>Fatehpur, India</b></span></div><div className="product-marketplace-note">Price and purchase links will be added once the product listings are ready.</div></div></div></div>}
  </section>;
}
