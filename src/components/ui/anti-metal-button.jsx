import React, { useEffect, useRef, useState } from 'react';

export function AntiMetalButton({ onClick, className = '', label = 'Product' }) {
  const [phase, setPhase] = useState('idle');
  const timers = useRef([]);

  useEffect(() => () => {
    timers.current.forEach(window.clearTimeout);
  }, []);

  const playCashChime = async () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const context = new AudioContextClass();
      await context.resume();
      const notes = [1046.5, 1318.5, 1760, 2093];
      notes.forEach((frequency, index) => {
        const start = context.currentTime + index * 0.065;
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = index === notes.length - 1 ? 'triangle' : 'sine';
        oscillator.frequency.setValueAtTime(frequency, start);
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(index === 3 ? 0.075 : 0.045, start + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.26);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(start);
        oscillator.stop(start + 0.28);
      });
      window.setTimeout(() => context.close().catch(() => {}), 800);
    } catch {
      // Audio is optional; the interaction still completes if audio is unavailable.
    }
  };

  const handleClick = () => {
    if (phase !== 'idle') return;
    setPhase('boarding');
    playCashChime();
    timers.current.push(window.setTimeout(() => setPhase('validated'), 520));
    timers.current.push(window.setTimeout(() => setPhase('departing'), 1050));
    timers.current.push(window.setTimeout(() => onClick?.(), 1580));
  };

  return (
    <button
      type="button"
      className={`anti-metal-button ${phase !== 'idle' ? `is-active phase-${phase}` : ''} ${className}`}
      onClick={handleClick}
      disabled={phase !== 'idle'}
      aria-label={`Open ${label}`}
    >
      <span className="anti-metal-icon" aria-hidden="true">
        <span className="anti-metal-dots"><i /><i /><i /><i /><i /><i /><i /></span>
        <span className="anti-metal-icon-ticket">✓</span>
      </span>
      <span className="anti-metal-button-label">
        {phase === 'idle' ? 'Enquire' : phase === 'validated' ? 'Ticket ready' : 'All aboard…'}
      </span>
      <span className="anti-metal-ticket" aria-hidden="true">
        <span className="ticket-stamp">✓</span>
        <span><b>CROCHELLA</b><small>ONE LITTLE JOY</small></span>
      </span>
      <span className="anti-metal-shuttle" aria-hidden="true">🚂</span>
      <span className="anti-metal-coin" aria-hidden="true">₹</span>
    </button>
  );
}

export default AntiMetalButton;
