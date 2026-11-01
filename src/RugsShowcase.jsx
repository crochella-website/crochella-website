import React, { useEffect, useMemo, useRef, useState } from 'react';

const RUG_PRICES = [
  [/keyboard|wrist-rest/,1299],
  [/premium-spiderman-anime-rug/,3200],
  [/premium-abstract-wave|premium-botanical-abstract/,5275],
  [/cute-kawaii-alien-face/,1566],
  [/one-piece-logo/,3549],
  [/grizzley/,2799],
  [/snoopy/,2949],
  [/premium-blue-cartoon|smurf/,2949],
  [/relax-3d-pill/,2599],
  [/akatsuki-cloud/,2675],
  [/delhi-capitals/,2389],
  [/chennai-supar-kings/,2469],
  [/kolkata-knight-riders/,2949],
  [/lucknow-super-giants/,2749],
  [/kings-xi-punjab/,2749],
  [/rajasthan-royal/,2649],
  [/sunrisers-hyderabad/,2599],
  [/royal-challengers-bangalore/,2469],
  [/mumbai-indian/,2599],
  [/batman-dark-knight/,1299],
  [/hello-kitty/,1299],
  [/spongebob/,1299],
  [/squirtle/,1299],
  [/deadpool/,1299],
  [/pikachu/,1299],
  [/goofy/,1299],
  [/snorlax/,1299],
];

const CATEGORY = (name) => /keyboard|wrist-rest/.test(name) ? 'Gaming' : /official-hand-tufted|delhi-capitals|chennai-supar|royal-challengers|kolkata-knight|lucknow-super|kings-xi|rajasthan-royal|sunrisers|mumbai-indian/.test(name) ? 'Team Rugs' : 'Character & Home';
const titleFromFile = (name) => name.replace(/\.(jpe?g|png|webp)$/i,'').replace(/-\d{5,}$/,'').split('-').map(w=>w.length<3?w.toUpperCase():w[0].toUpperCase()+w.slice(1)).join(' ').replace(/\bVs\b/g,'vs').replace(/\bKawaii\b/g,'Kawaii');
const priceFor = (name) => RUG_PRICES.find(([pattern])=>pattern.test(name))?.[1] ?? null;

async function extractZipImages(buffer) {
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);
  let eocd = -1;
  for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65558); i--) {
    if (view.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('ZIP directory not found');
  const count = view.getUint16(eocd + 10, true);
  let cursor = view.getUint32(eocd + 16, true);
  const images = [];
  for (let i = 0; i < count; i++) {
    if (view.getUint32(cursor, true) !== 0x02014b50) break;
    const method = view.getUint16(cursor + 10, true);
    const compressedSize = view.getUint32(cursor + 20, true);
    const nameLength = view.getUint16(cursor + 28, true);
    const extraLength = view.getUint16(cursor + 30, true);
    const commentLength = view.getUint16(cursor + 32, true);
    const localOffset = view.getUint32(cursor + 42, true);
    const name = new TextDecoder().decode(bytes.slice(cursor + 46, cursor + 46 + nameLength));
    cursor += 46 + nameLength + extraLength + commentLength;
    if (!/\.(jpe?g|png|webp)$/i.test(name) || /\/\.\.\//.test(name)) continue;
    const localNameLength = view.getUint16(localOffset + 26, true);
    const localExtraLength = view.getUint16(localOffset + 28, true);
    const start = localOffset + 30 + localNameLength + localExtraLength;
    let data = bytes.slice(start, start + compressedSize);
    if (method === 8) {
      const stream = new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
      data = new Uint8Array(await new Response(stream).arrayBuffer());
    } else if (method !== 0) continue;
    const type = /\.png$/i.test(name) ? 'image/png' : /\.webp$/i.test(name) ? 'image/webp' : 'image/jpeg';
    images.push({ name: name.split('/').pop(), url: URL.createObjectURL(new Blob([data], { type })) });
  }
  return images;
}

export default function RugsShowcase() {
  const [items,setItems] = useState([]);
  const [activeCategory,setActiveCategory] = useState('All rugs');
  const [active,setActive] = useState(0);
  const [loadError,setLoadError] = useState(false);
  const railRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let urls = [];
    fetch('/uploads/Rugs%20Product.zip')
      .then(r => { if(!r.ok) throw new Error('Product archive unavailable'); return r.arrayBuffer(); })
      .then(extractZipImages)
      .then(images => {
        urls = images.map(x=>x.url);
        if(cancelled) { urls.forEach(URL.revokeObjectURL); return; }
        const rugs = images.filter(x=>!/cushion|pillow/i.test(x.name)).map((x,i)=>({
          id:x.name, image:x.url, name:titleFromFile(x.name), category:CATEGORY(x.name),
          price:priceFor(x.name), number:String(i+1).padStart(2,'0')
        }));
        setItems(rugs);
      })
      .catch(()=>{ if(!cancelled) setLoadError(true); });
    return ()=>{cancelled=true; urls.forEach(URL.revokeObjectURL);};
  }, []);

  const categories = ['All rugs','Character & Home','Gaming','Team Rugs'];
  const visible = useMemo(()=>items.filter(x=>activeCategory==='All rugs'||x.category===activeCategory),[items,activeCategory]);
  useEffect(()=>{setActive(0); if(railRef.current) railRef.current.scrollTo({left:0,behavior:'smooth'});},[activeCategory]);
  const move = (delta) => {
    const next = Math.max(0,Math.min(visible.length-1,active+delta));
    setActive(next);
    const card = railRef.current?.querySelectorAll('.rug-conveyor-card')[next];
    card?.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
  };
  const format = n => '₹'+n.toLocaleString('en-IN');

  return <section className="rugs-showcase" id="rugs" aria-labelledby="rugs-title">
    <div className="rugs-showcase-top"><div><span className="rugs-eyebrow">04 / THE RUG EDIT</span><h2 id="rugs-title">Made to be <em>lived in.</em></h2><p>Soft underfoot. Full of character. Handcrafted for your kind of home.</p></div><a className="rugs-all-link" href="https://ruggybuggy.com/collections/all" target="_blank" rel="noreferrer">Shop all rugs ↗</a></div>
    <div className="rugs-filter-row" role="tablist" aria-label="Filter rug categories">{categories.map(c=><button key={c} className={activeCategory===c?'is-active':''} role="tab" aria-selected={activeCategory===c} onClick={()=>setActiveCategory(c)}>{c}</button>)}</div>
    {loadError ? <div className="rugs-load-error">Rug images couldn’t load. Please check that <code>public/uploads/Rugs Product.zip</code> is committed to the repository.</div> : !items.length ? <div className="rugs-loading"><span/>Unpacking the rug collection…</div> : <div className="rugs-conveyor-shell">
      <button className="rugs-arrow rugs-arrow-prev" onClick={()=>move(-1)} aria-label="Previous rugs" disabled={active===0}>←</button>
      <div className="rugs-conveyor" ref={railRef} onScroll={e=>{const cards=[...e.currentTarget.querySelectorAll('.rug-conveyor-card')];if(!cards.length)return;const center=e.currentTarget.getBoundingClientRect().left+e.currentTarget.clientWidth/2;let nearest=0,dist=Infinity;cards.forEach((el,i)=>{const r=el.getBoundingClientRect();const d=Math.abs(r.left+r.width/2-center);if(d<dist){dist=d;nearest=i;}});setActive(nearest);}}>
        {visible.map((product,i)=><article className={'rug-conveyor-card '+(i===active?'is-current':'')} key={product.id} onClick={()=>{setActive(i);}}><a className="rug-image-link" href="https://ruggybuggy.com/collections/all" target="_blank" rel="noreferrer" aria-label={'Shop '+product.name}><img src={product.image} alt={product.name} loading={i<5?'eager':'lazy'}/><span className="rug-card-index">{product.number}</span><span className="rug-card-arrow">↗</span></a><div className="rug-card-meta"><div><h3>{product.name}</h3><span>{product.category}</span></div><strong>{product.price ? format(product.price) : <a href="https://ruggybuggy.com/collections/all" target="_blank" rel="noreferrer">View price ↗</a>}</strong></div></article>)}
      </div>
      <button className="rugs-arrow rugs-arrow-next" onClick={()=>move(1)} aria-label="Next rugs" disabled={active>=visible.length-1}>→</button>
    </div>}
    <div className="rugs-showcase-bottom"><span>HAND-TUFTED · MADE WITH CARE</span><div className="rugs-progress"><i style={{width:visible.length?((active+1)/visible.length*100)+'%':'0%'}}/></div><span>{String(active+1).padStart(2,'0')} / {String(visible.length).padStart(2,'0')}</span></div>
  </section>;
}
