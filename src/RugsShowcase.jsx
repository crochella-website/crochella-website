import React, { useEffect, useMemo, useRef, useState } from 'react';

const RUG_PRICES = [
  [/keyboard|wrist-rest/,1299],[/premium-spiderman-anime-rug/,3200],
  [/premium-abstract-wave|premium-botanical-abstract/,5275],[/cute-kawaii-alien-face/,1566],
  [/one-piece-logo/,3549],[/grizzley/,2799],[/snoopy/,2949],
  [/premium-blue-cartoon|smurf/,2949],[/relax-3d-pill/,2599],[/akatsuki-cloud/,2675],
  [/delhi-capitals/,2389],[/chennai-supar-kings/,2469],[/kolkata-knight-riders/,2949],
  [/lucknow-super-giants/,2749],[/kings-xi-punjab/,2749],[/rajasthan-royal/,2649],
  [/sunrisers-hyderabad/,2599],[/royal-challengers-bangalore/,2469],[/mumbai-indian/,2599],
  [/batman-dark-knight|hello-kitty|spongebob|squirtle|deadpool|pikachu|goofy|snorlax/,1299],
];
const CATEGORY = name => /keyboard|wrist-rest/.test(name) ? 'Gaming' : /delhi-capitals|chennai-supar|royal-challengers|kolkata-knight|lucknow-super|kings-xi|rajasthan-royal|sunrisers|mumbai-indian/.test(name) ? 'Team Rugs' : 'Character & Home';
const titleFromFile = name => name.replace(/\.(jpe?g|png|webp)$/i,'').replace(/-\d{5,}$/,'').split('-').map(w=>w.length<3?w.toUpperCase():w[0].toUpperCase()+w.slice(1)).join(' ').replace(/\bVs\b/g,'vs');
const priceFor = name => RUG_PRICES.find(([pattern])=>pattern.test(name))?.[1] ?? null;

async function extractZipImages(buffer) {
  const view=new DataView(buffer),bytes=new Uint8Array(buffer);let eocd=-1;
  for(let i=bytes.length-22;i>=Math.max(0,bytes.length-65558);i--){if(view.getUint32(i,true)===0x06054b50){eocd=i;break;}}
  if(eocd<0)throw new Error('ZIP directory not found');
  const count=view.getUint16(eocd+10,true);let cursor=view.getUint32(eocd+16,true);const images=[];
  for(let i=0;i<count;i++){
    if(view.getUint32(cursor,true)!==0x02014b50)break;
    const method=view.getUint16(cursor+10,true),size=view.getUint32(cursor+20,true),nl=view.getUint16(cursor+28,true),el=view.getUint16(cursor+30,true),cl=view.getUint16(cursor+32,true),offset=view.getUint32(cursor+42,true);
    const name=new TextDecoder().decode(bytes.slice(cursor+46,cursor+46+nl));cursor+=46+nl+el+cl;
    if(!/\.(jpe?g|png|webp)$/i.test(name)||/\/\.\.\//.test(name)||/cushion|pillow/i.test(name))continue;
    const ln=view.getUint16(offset+26,true),le=view.getUint16(offset+28,true),start=offset+30+ln+le;let data=bytes.slice(start,start+size);
    if(method===8){data=new Uint8Array(await new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer());}else if(method!==0)continue;
    const type=/\.png$/i.test(name)?'image/png':/\.webp$/i.test(name)?'image/webp':'image/jpeg';
    images.push({name:name.split('/').pop(),url:URL.createObjectURL(new Blob([data],{type}))});
  }return images;
}

export default function RugsShowcase(){
  const [items,setItems]=useState([]),[category,setCategory]=useState('All rugs'),[angle,setAngle]=useState(0),[selected,setSelected]=useState(null),[paused,setPaused]=useState(false),[loadError,setLoadError]=useState(false);
  const touchX=useRef(0);
  useEffect(()=>{let cancelled=false,urls=[];fetch('/uploads/Rugs%20Product.zip').then(r=>{if(!r.ok)throw Error();return r.arrayBuffer();}).then(extractZipImages).then(images=>{urls=images.map(x=>x.url);if(cancelled){urls.forEach(URL.revokeObjectURL);return;}setItems(images.map((x,i)=>({id:x.name,image:x.url,name:titleFromFile(x.name),category:CATEGORY(x.name),price:priceFor(x.name),number:String(i+1).padStart(2,'0')})));}).catch(()=>{if(!cancelled)setLoadError(true);});return()=>{cancelled=true;urls.forEach(URL.revokeObjectURL);};},[]);
  const categories=['All rugs','Character & Home','Gaming','Team Rugs'];
  const visible=useMemo(()=>items.filter(x=>category==='All rugs'||x.category===category),[items,category]);
  useEffect(()=>{setAngle(0);setSelected(null);},[category]);
  useEffect(()=>{if(paused||selected||visible.length<2)return;const t=window.setInterval(()=>setAngle(a=>a+1),2100);return()=>clearInterval(t);},[paused,selected,visible.length]);
  const move=d=>{setPaused(true);setAngle(a=>a+d);window.setTimeout(()=>setPaused(false),900);};
  const format=n=>'₹'+n.toLocaleString('en-IN');
  const beltItems=visible.length?Array.from({length:Math.min(7,visible.length)},(_,i)=>visible[((angle+i)%visible.length+visible.length)%visible.length]):[];
  return <section className="rugs-showcase" id="rugs" aria-labelledby="rugs-title">
    <div className="rugs-showcase-top"><div><span className="rugs-eyebrow">04 / THE RUG EDIT</span><h2 id="rugs-title">Made to be <em>lived in.</em></h2><p>Soft underfoot. Full of character. Handcrafted for your kind of home.</p></div><a className="rugs-all-link" href="https://ruggybuggy.com/collections/all" target="_blank" rel="noreferrer">Shop all rugs ↗</a></div>
    <div className="rugs-filter-row" role="tablist" aria-label="Filter rug categories">{categories.map(c=><button key={c} className={category===c?'is-active':''} role="tab" aria-selected={category===c} onClick={()=>setCategory(c)}>{c}</button>)}</div>
    {loadError?<div className="rugs-load-error">Rug collection couldn’t load. Please ensure <code>public/uploads/Rugs Product.zip</code> is committed.</div>:!items.length?<div className="rugs-loading"><span/>Unpacking the rug collection…</div>:<div className="rugs-belt-experience" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onTouchStart={e=>touchX.current=e.touches[0].clientX} onTouchEnd={e=>{const dx=e.changedTouches[0].clientX-touchX.current;if(Math.abs(dx)>35)move(dx<0?1:-1);}}>
      <div className="rugs-belt-heading"><span>THE CROCHELLA RUG BELT</span><span>{paused?'PAUSED · PICK YOUR FAVOURITE':'ROLLING WITH LOVE'}</span></div>
      <div className="rugs-belt-scene">
        <div className="rugs-belt-shadow"/><div className="rugs-belt-outer"/><div className="rugs-belt-inner"/><div className="rugs-belt-center"><span>HAND-TUFTED</span><strong>Made for<br/><em>your space.</em></strong><small>ONE OF A KIND · MADE WITH CARE</small></div>
        <div className="rugs-belt-items">{beltItems.map((p,i)=>{const theta=(i/Math.max(beltItems.length,1))*Math.PI*2-Math.PI/2;const x=50+35*Math.cos(theta),y=50+31*Math.sin(theta);return <button key={p.id} className={'rugs-belt-item '+(selected?.id===p.id?'is-selected':'')} style={{left:x+'%',top:y+'%',zIndex:Math.round(20+20*Math.sin(theta)),transform:'translate(-50%,-50%)'}} onClick={()=>{setSelected(p);setPaused(true);}} aria-label={'Select '+p.name}><span className="rugs-belt-plate"><img src={p.image} alt={p.name}/></span><span className="rugs-belt-product-label">{p.name}</span></button>;})}</div>
      </div>
      <div className="rugs-belt-controls"><button onClick={()=>move(-1)} aria-label="Previous rug">←</button><button onClick={()=>setPaused(p=>!p)} aria-label={paused?'Play conveyor':'Pause conveyor'}>{paused?'▶':'Ⅱ'}</button><button onClick={()=>move(1)} aria-label="Next rug">→</button><span>Hover to pause · Select a rug to explore</span></div>
      {selected&&<div className="rugs-selected-product"><img src={selected.image} alt=""/><div><span>{selected.category}</span><h3>{selected.name}</h3><strong>{selected.price?format(selected.price):'View price on store'}</strong></div><a href="https://ruggybuggy.com/collections/all" target="_blank" rel="noreferrer">Shop rug ↗</a><button onClick={()=>{setSelected(null);setPaused(false);}} aria-label="Close selected rug">×</button></div>}
    </div>}
    <div className="rugs-showcase-bottom"><span>HAND-TUFTED · MADE WITH CARE</span><div className="rugs-progress"><i style={{width:visible.length?((angle%Math.max(visible.length,1)+1)/visible.length*100)+'%':'0%'}}/></div><span>{String((angle%Math.max(visible.length,1))+1).padStart(2,'0')} / {String(visible.length).padStart(2,'0')}</span></div>
  </section>;
}
