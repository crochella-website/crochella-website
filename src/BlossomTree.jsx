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
        <video className="tree-video" src="/uploads/crochella-blossom-tree.webm?v=20261030" autoPlay muted loop playsInline preload="auto" poster="data:image/webp;base64,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" onLoadedData={e=>e.currentTarget.play().catch(()=>{})} aria-label="Animated pink blossom tree" />
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
