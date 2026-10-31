import React, { useRef, useState } from 'react';

export function AntiMetalButton({ onClick, className = '', label = 'Get your ticket' }) {
  const [phase, setPhase] = useState('idle');
  const timer = useRef(null);

  const playTicketChime = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;
      [880, 1174.66, 1567.98].forEach((frequency, index) => {
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, now + index * 0.075);
        gain.gain.setValueAtTime(0.0001, now + index * 0.075);
        gain.gain.exponentialRampToValueAtTime(0.12, now + index * 0.075 + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.075 + 0.22);
        oscillator.connect(gain);
        gain.connect(ctx.destination);
        oscillator.start(now + index * 0.075);
        oscillator.stop(now + index * 0.075 + 0.24);
      });
      window.setTimeout(() => ctx.close().catch(() => {}), 700);
    } catch {}
  };

  const handleClick = () => {
    if (phase !== 'idle') return;
    setPhase('boarding');
    playTicketChime();
    timer.current = window.setTimeout(() => {
      setPhase('departing');
      timer.current = window.setTimeout(() => onClick?.(), 520);
    }, 760);
  };

  return (
    <button
      type="button"
      className={`anti-metal-button ${phase !== 'idle' ? 'is-active' : ''} ${className}`}
      onClick={handleClick}
      disabled={phase !== 'idle'}
      aria-label={`Open ${label}`}
    >
      <span className="anti-metal-button-label">{phase === 'idle' ? 'Enquire' : 'Boarding…'}</span>
      <span className="anti-metal-ticket" aria-hidden="true">✦ <small>TICKET</small></span>
      <span className="anti-metal-shuttle" aria-hidden="true">➜</span>
      <span className="anti-metal-dots" aria-hidden="true"><i/><i/><i/></span>
    </button>
  );
}

export default AntiMetalButton;
