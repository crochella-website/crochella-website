import React, { useEffect, useRef, useState } from 'react';

export default function StringTieFooter({
  meta = ['Portfolio', '2021–2026', 'Selected work'],
  tapes = ['Looking Forward to', 'Connect with You!'],
  note = {
    kicker: 'P.S.',
    text: 'Taking on two new projects this spring. If yours is one of them, write — I read everything.',
    cta: 'Start a project',
  },
  height = '100svh',
}) {
  const sectionRef = useRef(null);
  const [sealed, setSealed] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSealed(true);
      }
    }, { threshold: 0.28 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const toggleEnvelope = () => {
    setOpened(value => !value);
    setSealed(false);
  };

  return (
    <section ref={sectionRef} className={`string-tie-footer ${sealed && !opened ? 'is-sealed' : ''} ${opened ? 'is-open' : ''}`} style={{ minHeight: height }}>
      <div className="string-tie-inner">
        <div className="string-tie-meta">
          {meta.map((item, index) => <span key={index}>{item}</span>)}
        </div>
        <div className="string-tie-message">
          <p className="string-tie-kicker">{note.kicker}</p>
          <h2>{tapes[0]}<br/><em>{tapes[1]}</em></h2>
          <p className="string-tie-note">{note.text}</p>
          <a className="string-tie-cta" href="mailto:hello@crochella.in">{note.cta}<span aria-hidden="true">↗</span></a>
        </div>
        <div className="string-tie-envelope-wrap">
          <button type="button" className="string-tie-envelope" onClick={toggleEnvelope} aria-label={opened ? 'Seal the envelope' : 'Open the envelope'}>
            <span className="string-tie-paper"><span>Dear friend,</span><span>Let’s make something lovely.</span><b>— Crochella</b></span>
            <span className="string-tie-envelope-back"/>
            <span className="string-tie-envelope-flap"/>
            <svg className="string-tie-cord" viewBox="0 0 420 300" aria-hidden="true">
              <path className="string-tie-cord-path" d="M210 150 C90 70 20 190 120 240 C185 275 260 215 210 150 C160 80 300 20 365 105 C420 180 315 255 210 150"/>
              <path className="string-tie-cord-knot" d="M198 145 C180 125 190 105 210 120 C230 105 240 125 222 145 C240 165 220 180 210 195 C200 180 180 165 198 145Z"/>
            </svg>
            <span className="string-tie-seal">C</span>
          </button>
          <p className="string-tie-hint">{opened ? 'Tap to tie it closed' : 'Tap to open the note'}</p>
        </div>
      </div>
    </section>
  );
}
