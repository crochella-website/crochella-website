import React, { useState } from 'react';
import DiwaliLantern from './DiwaliLantern.jsx';

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
      <DiwaliLantern />
      <div className="tree-garden-heading">
        <span className="instagram-eyebrow"><i/> A LITTLE CORNER OF CROCHELLA</span>
        <h2 id="instagram-title">Where little joys<br/><em>come into bloom.</em></h2>
        <p>A tiny garden, grown with love. Tap the blossom tree to find your way to our Instagram world.</p>
      </div>
      <div className="tree-scene-wrap" onClick={() => setQrOpen(true)} role="button" tabIndex={0} onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setQrOpen(true)} aria-label="Open Crochella Instagram QR code">
        <video className="tree-video" src="/uploads/crochella-blossom-tree.webm" type="video/webm" autoPlay muted loop playsInline preload="auto" onLoadedData={e=>e.currentTarget.play().catch(()=>{})} aria-label="Animated pink blossom tree" />
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
