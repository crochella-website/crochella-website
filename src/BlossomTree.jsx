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
        <video className="tree-video" src="/uploads/crochella-blossom-tree.webm" autoPlay muted loop playsInline preload="auto" poster="data:image/webp;base64,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" onLoadedData={e=>e.currentTarget.play().catch(()=>{})} aria-label="Animated pink blossom tree" />
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
