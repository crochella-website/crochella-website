import React from 'react';

export default function DiwaliCanvas() {
  return (
    <section className="diwali-canvas-section" id="diwali-canvas" aria-label="Diwali mandala canvas">
      <video className="diwali-canvas-backdrop" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
        <source src="/uploads/diwali-section-backdrop.webm" type="video/webm" />
      </video>
      <div className="diwali-canvas-shade" aria-hidden="true" />
      <img className="diwali-canvas-mandala" src="/uploads/diwali-mandala.png" alt="" aria-hidden="true" />
    </section>
  );
}
