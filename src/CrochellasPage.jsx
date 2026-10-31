import React, { useEffect, useRef, useState } from 'react';
import pricing from './content/crochella-pricing.json';
import { AntiMetalButton } from './components/ui/anti-metal-button.jsx';

const products=[{"id":"panda","name":"Panda Pal","image":"/uploads/panda-keychain.png","emoji":"🐼"},{"id":"turtle","name":"Turtle Buddy","image":"/uploads/turtle-keychain.png","lifestyle":"/uploads/Cozy%20Crocheted%20Turtle%20Keychain%20Display.png","emoji":"🐢"},{"id":"banana","name":"Bananita","image":"/uploads/banana-keychain.png","emoji":"🍌"},{"id":"bow","name":"Pink Bow","image":"/uploads/pink-bow-keychain.png","lifestyle":"/uploads/Pink%20Crochet%20Bow%20on%20a%20Cozy%20Bag.png","emoji":"🎀"},{"id":"burger","name":"Burger Buddy","image":"/uploads/burger-keychain.png","lifestyle":"/uploads/Crochet%20Burger%20Charm%20Caf%C3%A9%20Still%20Life.png","emoji":"🍔"},{"id":"lion","name":"Little Lion","image":"/uploads/lion-keychain.png","lifestyle":"/uploads/Cozy%20Crocheted%20Lion%20Keychain%20Vignette.png","emoji":"🦁"},{"id":"avocado","name":"Avo Cutie","image":"/uploads/avocado-keychain.png","lifestyle":"/uploads/Cozy%20Crochet%20Avocado%20Keychain%20Vignette.png","emoji":"🥑"},{"id":"penguin","name":"Penguin Pal","image":"/uploads/penguin-keychain.png","lifestyle":"/uploads/Cozy%20Crochet%20Penguin%20Winter%20Vignette.png","emoji":"🐧"},{"id":"handbag","name":"Mini Tote","image":"/uploads/handbag-keychain.png","emoji":"👜"},{"id":"strawberry","name":"Berry Sweet","image":"/uploads/strawberry-keychain.png","lifestyle":"/uploads/Crocheted%20Strawberry%20Picnic%20Charm.png","emoji":"🍓"},{"id":"chilli","name":"Chilli Pop","image":"/uploads/chilli-keychain.png","emoji":"🌶️"},{"id":"bee","name":"Busy Bee","image":"/uploads/bee-keychain.png","lifestyle":"/uploads/Whimsical%20Crochet%20Bee%20Garden%20Keychain.png","emoji":"🐝"},{"id":"bear","name":"Teddy Bear","image":"/uploads/bear-keychain.png","lifestyle":"/uploads/Cozy%20Crochet%20Teddy%20Keychain%20Vignette.png","emoji":"🧸"},{"id":"evil-eye","name":"Good Vibes","image":"/uploads/evil-eye-keychain.png","emoji":"🧿"},{"id":"cherry","name":"Cherry Duo","image":"/uploads/cherry-keychain.png","emoji":"🍒"},{"id":"sunflower","name":"Sunshine","image":"/uploads/sunflower-keychain.png","emoji":"🌻"},{"id":"heart","name":"Love Note","image":"/uploads/heart-keychain.png","emoji":"♥"}];

const askDadiMessage="Hi Crochella! I would love to know more about your handmade crochet products.";
const askDadiUrl=`https://wa.me/?text=${encodeURIComponent(askDadiMessage)}`;

export default function CrochellasPage(){
  const [offset,setOffset]=useState(0);
  const [dragStart,setDragStart]=useState(null);
  const [dragDelta,setDragDelta]=useState(0);
  const marqueeRef=useRef(null);
  useEffect(()=>{
    const root=marqueeRef.current;
    if(!root)return;
    const path=root.querySelector('path');
    const items=[...root.querySelectorAll('[data-path-index]')];
    if(!path||!items.length||!path.getTotalLength)return;
    let raf=0,last=0,progress=0,paused=false;
    const length=path.getTotalLength();
    const tick=now=>{
      if(!last)last=now;
      const dt=Math.min((now-last)/1000,.05);last=now;
      if(!paused&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches)progress=(progress+dt*34)%length;
      const bounds=root.getBoundingClientRect();
      const sx=bounds.width/1440,sy=bounds.height/140;
      items.forEach((el,i)=>{
        const distance=(progress+i*(length/items.length))%length;
        const point=path.getPointAtLength(distance);
        const before=path.getPointAtLength(Math.max(0,distance-1));
        const after=path.getPointAtLength(Math.min(length,distance+1));
        const angle=Math.atan2((after.y-before.y)*sy,(after.x-before.x)*sx)*180/Math.PI;
        el.style.transform=`translate3d(${point.x*sx}px,${point.y*sy}px,0) translate(-50%,-50%) rotate(${angle*.42}deg)`;
      });
      raf=requestAnimationFrame(tick);
    };
    const pause=()=>{paused=true},resume=()=>{paused=false};
    root.addEventListener('pointerenter',pause);root.addEventListener('pointerleave',resume);
    raf=requestAnimationFrame(tick);
    return()=>{cancelAnimationFrame(raf);root.removeEventListener('pointerenter',pause);root.removeEventListener('pointerleave',resume)};
  },[]);
  useEffect(()=>{
    if(dragStart!==null)return;
    const timer=window.setInterval(()=>setOffset(v=>(v+1)%products.length),3200);
    return()=>window.clearInterval(timer);
  },[dragStart]);
  const move=dir=>setOffset(v=>(v+dir+products.length)%products.length);
  const onPointerDown=e=>{setDragStart(e.clientX);setDragDelta(0);e.currentTarget.setPointerCapture?.(e.pointerId)};
  const onPointerMove=e=>{if(dragStart!==null)setDragDelta(e.clientX-dragStart)};
  const onPointerUp=()=>{if(Math.abs(dragDelta)>24)move(dragDelta<0?1:-1);setDragStart(null);setDragDelta(0)};
  const featured=products[offset];
  return <main className="crochellas-page">
    <header className="crochellas-nav"><a className="crochellas-wordmark" href="/"><span className="crochellas-nav-mark" aria-hidden="true">C</span><span className="crochellas-nav-brand">Crochella<sup>®</sup></span></a><nav><a href="/#kahani">Our story</a><a href="/#karigari">Karigari</a><a href="#collection">Collection</a></nav><a className="crochellas-nav-cta" href="#collection">Shop handmade <span>↗</span></a></header>
    <section className="crochellas-banner">
      <div className="crochellas-banner-copy"><span className="crochellas-kicker"><i/> THE LITTLE THINGS, MADE WITH LOVE</span><h1>Meet your new<br/><em>crochet bestie.</em></h1><p>Little handmade joys, stitched slowly by Dadi and her crew. Pick a charm that feels like you.</p><a className="crochellas-banner-button" href="#collection">Find your little thing <span>↓</span></a></div>
      <div className="crochellas-banner-art" aria-hidden="true"><img src="/uploads/Web-Slinging%20Grandma%20and%20Crochet%20Crew.png" alt=""/></div>
      <span className="crochellas-banner-note">HANDMADE · NOT MASS-MADE</span>
    </section>
    <section ref={marqueeRef} className="crochellas-festive-marquee" aria-label="Crochella festive offers">
      <svg className="crochellas-marquee-path" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-30 92 C180 8 340 18 505 88 S805 142 980 66 S1260 4 1470 78" />
      </svg>
      <div className="crochellas-path-items" aria-hidden="true">
        {Array.from({length:12},(_,i)=><div className={`crochellas-path-item ${i%3===0?'is-offer':'is-product'}`} data-path-index={i} key={i}>
          {i%3===0?<span>{i===0?'✨ Diwali · 40% OFF':i===3?'💖 No extra shipping':'😊 Handmade with love'}</span>:<img src={products[(i*2)%products.length].image} alt=""/>}
        </div>)}
      </div>
    </section>
    <section className="crochellas-featured" aria-label="Featured crochet product carousel">
      <div className="crochellas-featured-heading"><span>01 / A LITTLE PREVIEW</span><p>Made to make you smile.</p></div>
      <div className="crochellas-carousel" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} style={{touchAction:'pan-y'}}>
        {[-2,-1,0,1,2].map(delta=>{
          const p=products[(offset+delta+products.length)%products.length];
          return <button key={p.id} className={`crochellas-carousel-card card-position-${delta+2}`} onClick={()=>delta===0?document.getElementById('collection')?.scrollIntoView({behavior:'smooth'}):move(delta)} aria-label={delta===0?`Browse ${p.name}`:`Show ${p.name}`}>
            <img src={p.image} alt={p.name}/><span className="crochellas-carousel-name">{p.name}</span>{delta===0&&<span className="crochellas-carousel-price">₹{pricing.products[p.id]?.price??99}</span>}
          </button>
        })}
      </div>
      <div className="crochellas-carousel-controls"><button onClick={()=>move(-1)} aria-label="Previous product">‹</button><span>{String(offset+1).padStart(2,'0')} <i>/</i> {String(products.length).padStart(2,'0')}</span><button onClick={()=>move(1)} aria-label="Next product">›</button></div>
    </section>
    <section className="crochellas-collection" id="collection"><div className="crochellas-collection-heading"><div><span>02 / THE CROCHET COLLECTION</span><h2>Small things.<br/><em>Big feelings.</em></h2></div><p>Every piece is handmade, so each one carries its own little character.</p></div>
      <div className="crochellas-product-grid">{products.map(p=><article className="crochellas-product-card" key={p.id}><div className={`crochellas-product-image ${p.lifestyle ? "has-lifestyle" : ""}`}><a href={`/product/${p.id}`} className="crochellas-product-image-link" aria-label={`View ${p.name}`}><img className="crochellas-product-transparent" src={p.image} alt={p.name}/>{p.lifestyle&&<img className="crochellas-product-lifestyle" src={p.lifestyle} alt={`${p.name} lifestyle photograph`} loading="lazy"/>}</a><AntiMetalButton label={p.name} onClick={()=>{window.location.href=`/product/${p.id}`}} /></div><div className="crochellas-product-meta"><div><h3>{p.name}</h3><span>Hand-crocheted charm</span></div><strong>₹{pricing.products[p.id]?.price??99}</strong></div></article>)}</div>
    </section>
    <footer className="crochellas-footer"><a href="/">← Back to Crochella</a><span>WOVEN WITH LOVE · FATEHPUR, INDIA</span><a href={askDadiUrl} target="_blank" rel="noreferrer" onClick={()=>{try{navigator.clipboard?.writeText(askDadiMessage)}catch{}}}>Ask Dadi ↗</a></footer>
  </main>
}
