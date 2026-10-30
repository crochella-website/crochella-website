import React from 'react';

export default function DiwaliCanvas() {
  return (
    <section className="diwali-canvas-section" id="diwali-canvas" aria-label="Diwali mandala canvas">
      <video className="diwali-canvas-backdrop" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
        <source src="/uploads/diwali-section-backdrop.mp4" type="video/mp4" />
      </video>
      <div className="diwali-canvas-shade" aria-hidden="true" />
      <img className="diwali-canvas-mandala" src="/uploads/diwali-mandala.webp" alt="" aria-hidden="true" />
      <div className="diwali-future-content" aria-hidden="true" />
    </section>
  );
}
