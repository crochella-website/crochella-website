import React, { useState } from 'react';

const crochetSlots = [
  { id: 'piece-01', name: 'A little handmade treasure', note: 'Crochet creation 01', tone: 'rose', mark: '✿' },
  { id: 'piece-02', name: 'Made loop by loop', note: 'Crochet creation 02', tone: 'honey', mark: '❋' },
  { id: 'piece-03', name: 'A story in every stitch', note: 'Crochet creation 03', tone: 'sage', mark: '♡' },
  { id: 'piece-04', name: 'Something made with love', note: 'Crochet creation 04', tone: 'plum', mark: '✳' },
  { id: 'piece-05', name: 'Your next favourite', note: 'Crochet creation 05', tone: 'peach', mark: '❀' },
];

function DadiIllustration() {
  return <svg className="product-dadi-art" viewBox="0 0 440 470" role="img" aria-label="Illustration of Dadi holding a crochet hook">
    <defs>
      <linearGradient id="dadi-sari" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#a82f4e"/><stop offset="1" stopColor="#4e172d"/></linearGradient>
      <linearGradient id="dadi-skin" x1="0" y1="0" x2="0.8" y2="1"><stop stopColor="#ffe0bd"/><stop offset="1" stopColor="#d99a73"/></linearGradient>
    </defs>
    <ellipse cx="220" cy="438" rx="145" ry="18" fill="#230b1b" opacity=".24"/>
    <path d="M67 438 Q75 328 135 300 Q220 266 306 302 Q369 335 378 438Z" fill="url(#dadi-sari)" stroke="#e5b56e" strokeWidth="4"/>
    <path d="M112 344 Q183 370 235 311 Q284 352 343 342 L378 438H67Z" fill="none" stroke="#e8b56f" strokeWidth="8" opacity=".8"/>
    <path d="M146 115 Q122 39 218 30 Q316 28 302 139 L291 190H151Z" fill="#eee2cf" stroke="#b5a18b" strokeWidth="5"/>
    <path d="M148 91 Q165 22 242 38 Q292 44 303 111 Q275 75 243 74 Q191 76 148 112Z" fill="#fff2df"/>
    <ellipse cx="220" cy="151" rx="91" ry="100" fill="url(#dadi-skin)" stroke="#b8795d" strokeWidth="3"/>
    <path d="M136 130 Q139 46 223 40 Q300 43 309 130 Q286 88 252 86 Q203 117 136 130Z" fill="#f6ead7"/>
    <path d="M153 145 Q185 122 211 145 M231 145 Q258 122 286 145" fill="none" stroke="#5b352c" strokeWidth="5" strokeLinecap="round"/>
    <ellipse cx="185" cy="153" rx="28" ry="24" fill="none" stroke="#38242b" strokeWidth="7"/><ellipse cx="258" cy="153" rx="28" ry="24" fill="none" stroke="#38242b" strokeWidth="7"/><path d="M213 151H230" stroke="#38242b" strokeWidth="7"/>
    <path d="M190 198 Q222 222 251 196" fill="none" stroke="#9e4d4a" strokeWidth="6" strokeLinecap="round"/>
    <circle cx="220" cy="110" r="8" fill="#a72c3d"/>
    <path d="M114 299 Q85 253 109 221 Q132 197 158 221 L194 281 Q163 313 114 299Z" fill="url(#dadi-skin)" stroke="#b8795d" strokeWidth="3"/>
    <path d="M302 302 Q338 254 322 218 Q306 197 285 220 L250 282 Q276 314 302 302Z" fill="url(#dadi-skin)" stroke="#b8795d" strokeWidth="3"/>
    <path d="M300 218 L351 158" stroke="#e9bd72" strokeWidth="9" strokeLinecap="round"/><path d="M351 158 Q363 146 369 159" stroke="#e9bd72" strokeWidth="7" fill="none" strokeLinecap="round"/>
    <path d="M130 85 Q105 122 128 169 M311 85 Q337 126 311 172" fill="none" stroke="#d8c8b3" strokeWidth="11" strokeLinecap="round"/>
    <circle cx="126" cy="206" r="9" fill="#e5b45f"/><circle cx="314" cy="206" r="9" fill="#e5b45f"/>
  </svg>;
}

export default function ProductShowcase() {
  const [category, setCategory] = useState('crochet');
  const [active, setActive] = useState(2);
  const [selected, setSelected] = useState(null);
  const products = crochetSlots;
  const step = (direction) => setActive(current => (current + direction + products.length) % products.length);

  return <section className="product-world" id="karigari" aria-label="Crochella handmade collections">
    <div className="product-world-glow" aria-hidden="true"/>
    <div className="product-world-top">
      <div className="product-world-intro">
        <span className="product-eyebrow"><i/> OUR LITTLE CREATIONS</span>
        <h2>Har loop mein<br/><em>thoda sa pyaar.</em></h2>
        <p>Made slowly, with care. Every little piece carries a story from Dadi’s hands to yours.</p>
      </div>
      <div className="product-category-switch" role="tablist" aria-label="Choose a collection">
        <button className={category === 'crochet' ? 'active' : ''} role="tab" aria-selected={category === 'crochet'} onClick={() => {setCategory('crochet');setSelected(null);}}>
          <span>✿</span> Crochet
        </button>
        <button className={category === 'rugs' ? 'active' : ''} role="tab" aria-selected={category === 'rugs'} onClick={() => {setCategory('rugs');setSelected(null);}}>
          <span>▦</span> Rugs
        </button>
      </div>
    </div>

    <div className="product-stage">
      <div className="product-yarn-trail" aria-hidden="true"><svg viewBox="0 0 1200 170" preserveAspectRatio="none"><path d="M-30 112 C150 18 230 180 390 85 S650 20 790 93 1020 150 1230 43" /></svg></div>
      <div className="dadi-character-wrap"><DadiIllustration/><div className="dadi-caption">D.A.D.I. <span>·</span> the hands behind the magic</div></div>
      {category === 'crochet' ? <>
        <div className="product-shuttle" aria-hidden="true"><span/><i/></div>
        <div className="product-tray">
          <div className="product-tray-edge"/>
          <div className="product-card-row">
            {products.map((product, index) => <button key={product.id} className={'product-slot '+product.tone+(active === index ? ' is-active' : '')} onClick={() => {setActive(index);setSelected(product);}} aria-label={'View '+product.note}>
              <span className="product-slot-ribbon"/>
              <span className="product-slot-art"><span className="product-slot-mark">{product.mark}</span><span className="product-slot-yarn"/></span>
              <span className="product-slot-title">{product.note}</span>
              <span className="product-slot-sub">IMAGE SLOT</span>
            </button>)}
          </div>
          <div className="product-tray-front"><span>HANDMADE WITH LOVE</span><i>✦</i><span>FATEHPUR · INDIA</span></div>
        </div>
        <div className="product-stage-controls"><button onClick={() => step(-1)} aria-label="Previous crochet product">‹</button><span>{String(active+1).padStart(2,'0')} <i>/</i> 05</span><button onClick={() => step(1)} aria-label="Next crochet product">›</button></div>
      </> : <div className="rugs-coming-panel"><span className="rugs-coming-icon">▦</span><h3>Room for something<br/><em>beautiful.</em></h3><p>The rug collection will have its own little world here. We’ll bring it to life next.</p><span className="rugs-coming-note">RUG COLLECTION · COMING NEXT</span></div>}
    </div>

    <div className="product-world-bottom">
      <span>01 — CROCHET COLLECTION</span>
      <p>{category === 'crochet' ? 'Choose a little creation to take a closer look.' : 'A new collection, woven for your spaces.'}</p>
      <a href="#collections">Explore our world <span>↗</span></a>
    </div>

    {selected && category === 'crochet' && <div className="product-detail-backdrop" role="presentation" onClick={() => setSelected(null)}>
      <div className="product-detail-glass" role="dialog" aria-modal="true" aria-label={selected.note} onClick={e => e.stopPropagation()}>
        <button className="product-detail-close" onClick={() => setSelected(null)} aria-label="Close product details">×</button>
        <div className="product-detail-art"><span>{selected.mark}</span><small>YOUR PRODUCT IMAGE</small></div>
        <div className="product-detail-copy"><span className="product-eyebrow"><i/> HANDMADE CROCHET</span><h3>{selected.name}</h3><p>We’ll add the product photograph, story, material, dimensions and care details here when you share the product images.</p><div className="product-detail-meta"><span>Price <b>To be added</b></span><span>Material <b>To be added</b></span><span>Care <b>To be added</b></span></div><div className="product-marketplace-note">Purchase links for Amazon, Flipkart, Meesho or your own store can be added once you share the listing URLs.</div></div>
      </div>
    </div>}
  </section>;
}
