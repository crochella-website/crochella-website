import React, { useState } from 'react';

const INSTAGRAM = 'https://www.instagram.com/crochellaart/';
const QR = 'https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=12&data=https%3A%2F%2Fwww.instagram.com%2Fcrochellaart%2F';

export default function BlossomTree() {
  const [qrOpen, setQrOpen] = useState(false);
  const [mode, setMode] = useState('spring');

  const setAtmosphere = value => {
    setMode(value);
    const video = document.querySelector('.tree-video');
    if (video) video.playbackRate = value === 'breeze' ? 1.18 : value === 'bloom' ? .92 : 1;
  };

  return <section className="instagram-section tree-garden-section" id="instagram" aria-labelledby="instagram-title">
    <div className="tree-garden-inner">
      <div className="tree-garden-heading">
        <span className="instagram-eyebrow"><i/> A LITTLE CORNER OF CROCHELLA</span>
        <h2 id="instagram-title">Where little joys<br/><em>come into bloom.</em></h2>
        <p>A tiny garden, grown with love. Tap the blossom tree to find your way to our Instagram world.</p>
      </div>
      <div className="tree-scene-wrap" onClick={() => setQrOpen(true)} role="button" tabIndex={0} onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setQrOpen(true)} aria-label="Open Crochella Instagram QR code">
        <svg className="tree-poster-fallback" viewBox="0 0 720 500" role="img" aria-label="Pink cherry blossom tree on a tiled garden platform">
          <defs>
            <radialGradient id="blossomPink"><stop stopColor="#ffe1e8"/><stop offset=".62" stopColor="#f58eaf"/><stop offset="1" stopColor="#d95e8a"/></radialGradient>
            <linearGradient id="treeBark" x1="0" x2="1"><stop stopColor="#3d211d"/><stop offset=".48" stopColor="#805039"/><stop offset="1" stopColor="#321b19"/></linearGradient>
            <linearGradient id="gardenTile" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff8ee"/><stop offset="1" stopColor="#e9d8cc"/></linearGradient>
            <filter id="treeShadow"><feGaussianBlur stdDeviation="8"/></filter>
          </defs>
          <ellipse cx="360" cy="423" rx="230" ry="27" fill="#16090d" opacity=".23" filter="url(#treeShadow)"/>
          <path d="M135 340 L560 340 L626 420 L196 420 Z" fill="url(#gardenTile)" stroke="#b99b91" strokeWidth="3"/>
          <g stroke="#b99b91" strokeWidth="1.5" opacity=".8">
            {Array.from({length:15},(_,i)=><path key={'v'+i} d={`M${155+i*28} 344 L${215+i*28} 418`}/>)}
            {Array.from({length:5},(_,i)=><path key={'h'+i} d={`M${147+i*12} ${358+i*14} L${575+i*12} ${358+i*14}`}/>)}
          </g>
          <g fill="none" stroke="url(#treeBark)" strokeLinecap="round">
            <path strokeWidth="34" d="M365 365 C335 330 365 302 344 266 C323 231 357 199 359 166"/>
            <path strokeWidth="18" d="M353 278 C302 260 270 224 237 208 M352 248 C404 229 441 197 477 178 M357 211 C327 181 315 151 305 126 M370 197 C398 163 421 142 445 120"/>
            <path strokeWidth="11" d="M337 354 C300 380 275 384 250 378 M355 355 C388 384 415 390 445 378 M349 357 C340 383 333 391 318 397"/>
          </g>
          <g>
            {Array.from({length:19},(_,i)=>{const a=i/19*Math.PI*2;const x=360+Math.cos(a)*133;const y=169+Math.sin(a)*75;return <g key={i}><ellipse cx={x} cy={y} rx="70" ry="58" fill="url(#blossomPink)" opacity=".96"/>{Array.from({length:12},(_,j)=>{const b=j/12*Math.PI*2;return <circle key={j} cx={x+Math.cos(b)*38} cy={y+Math.sin(b)*30} r="14" fill={j%3===0?"#ffe7eb":j%2===0?"#f7a5bd":"#e978a0"} opacity=".9"/>})}</g>})}
            <ellipse cx="360" cy="113" rx="84" ry="60" fill="url(#blossomPink)"/>
            <ellipse cx="278" cy="170" rx="82" ry="56" fill="url(#blossomPink)"/>
            <ellipse cx="444" cy="166" rx="82" ry="56" fill="url(#blossomPink)"/>
          </g>
          <g fill="#f18bb0">{Array.from({length:35},(_,i)=><circle key={i} cx={185+(i*47)%360} cy={360+(i*19)%43} r="3.5"/>)}</g>
        </svg>
        <video className="tree-video" autoPlay muted loop playsInline preload="auto" onError={e=>{e.currentTarget.style.display='none';}}>
          <source src="/uploads/crochella-blossom-tree.webm" type="video/webm"/>
        </video>
        <span className="tree-tap-hint"><span>♧</span> Tap the tree to see QR code</span>
      </div>
      <div className="tree-controls">
        <div className="tree-link-field"><span>↗</span><span>https://www.instagram.com/crochellaart/</span></div>
        <a className="tree-share-button" href={INSTAGRAM} target="_blank" rel="noreferrer">Visit <span>↗</span></a>
      </div>
      <div className="tree-mode-switch" role="group" aria-label="Tree atmosphere">
        <button className={mode === 'spring' ? 'active' : ''} onClick={() => setAtmosphere('spring')}>✿ <span>Spring</span></button>
        <button className={mode === 'bloom' ? 'active' : ''} onClick={() => setAtmosphere('bloom')}>✿ <span>Bloom</span></button>
        <button className={mode === 'breeze' ? 'active' : ''} onClick={() => setAtmosphere('breeze')}>≋ <span>Breeze</span></button>
      </div>
      <div className="tree-colour-dots" aria-hidden="true"><i/><i/><i/><i/><i/><i/></div>
    </div>
    {qrOpen && <div className="tree-qr-overlay" role="dialog" aria-modal="true" aria-labelledby="tree-qr-title" onClick={() => setQrOpen(false)}>
      <div className="tree-qr-modal" onClick={e => e.stopPropagation()}>
        <button className="tree-qr-close" onClick={() => setQrOpen(false)} aria-label="Close QR code">×</button>
        <span>YOUR LITTLE PATH TO US</span>
        <h3 id="tree-qr-title">Come say <em>hello.</em></h3>
        <img src={QR} alt="Scan to visit Crochella on Instagram"/>
        <strong>@crochellaart</strong>
        <a href={INSTAGRAM} target="_blank" rel="noreferrer">Visit Instagram ↗</a>
      </div>
    </div>}
  </section>;
}
