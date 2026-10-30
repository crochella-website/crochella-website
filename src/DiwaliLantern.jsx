import React, { useEffect, useRef, useState } from 'react';

export default function DiwaliLantern() {
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  const chime = ctx => {
    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(.0001, now);
    master.gain.exponentialRampToValueAtTime(.045, now + .015);
    master.gain.exponentialRampToValueAtTime(.0001, now + 2.4);
    master.connect(ctx.destination);
    // Soft, airy bell partials — a gentle wind-chime shimmer, not a loud alert.
    [1046.5, 1318.5, 1568, 2093].forEach((frequency, index) => {
      const osc = ctx.createOscillator();
      const tone = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency * (1 + Math.random() * .006), now);
      tone.gain.setValueAtTime(index === 0 ? .6 : .24 / index, now);
      tone.gain.exponentialRampToValueAtTime(.0001, now + 1.6 + Math.random() * .8);
      osc.connect(tone); tone.connect(master);
      osc.start(now + index * .035); osc.stop(now + 2.6);
    });
  };

  const toggleSound = async () => {
    if (soundOn) {
      window.clearTimeout(timerRef.current);
      audioRef.current?.close?.();
      audioRef.current = null;
      setSoundOn(false);
      return;
    }
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) return;
      const ctx = new Audio();
      await ctx.resume();
      audioRef.current = ctx;
      chime(ctx);
      const ring = () => {
        if (audioRef.current !== ctx) return;
        chime(ctx);
        timerRef.current = window.setTimeout(ring, 3800 + Math.random() * 4600);
      };
      timerRef.current = window.setTimeout(ring, 2600);
      setSoundOn(true);
    } catch (error) {
      console.warn('Wind chime audio unavailable', error);
    }
  };

  useEffect(() => () => {
    window.clearTimeout(timerRef.current);
    audioRef.current?.close?.();
  }, []);

  return <div className="diwali-lantern" aria-label="Diwali lantern decoration">
    <span className="lantern-thread"/>
    <video autoPlay muted loop playsInline preload="metadata" className="lantern-video" aria-hidden="true">
      <source src="/uploads/crochella-diwali-lantern.webm" type="video/webm"/>
    </video>
    <button className={'lantern-sound '+(soundOn?'is-on':'')} onClick={toggleSound} aria-pressed={soundOn} aria-label={soundOn?'Turn wind chime sound off':'Turn on gentle wind chime sound'}>
      <span>{soundOn?'♫':'♪'}</span>{soundOn?'Chime on':'Hear the chime'}
    </button>
  </div>;
}
