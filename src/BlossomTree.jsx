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
