import React, { useLayoutEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';
import site from './content/site.json';

gsap.registerPlugin(ScrollTrigger);

const yarnColors = ['#8d3028', '#b44a35', '#d68d43', '#e6bd70', '#526f50', '#2f5947', '#a94337', '#c17a42', '#d5a24e', '#774139', '#45674f', '#e1c89b', '#a95842', '#67805a'];

function YarnField() {
  return (
    <div className="yarn-field" aria-hidden="true">
      <div className="yarn-vignette" />
      {Array.from({ length: 92 }, (_, i) => {
        const x = ((i * 37) % 101);
        const color = yarnColors[(i * 7 + Math.floor(i / 4)) % yarnColors.length];
        const width = 5 + ((i * 3) % 9);
        const tilt = ((i * 19) % 46) - 23;
        const offset = ((i * 13) % 61) - 30;
        return (
          <span
            className="yarn-fiber"
            key={i}
            style={{
              '--x': `${x}%`,
              '--fiber-color': color,
              '--fiber-width': `${width}px`,
              '--tilt': `${tilt}deg`,
              '--offset': `${offset}px`,
              '--fiber-index': i,
            }}
          >
            <i />
            <b />
          </span>
        );
      })}
      <div className="yarn-center-glow" />
    </div>
  );
}

function Courtyard() {
  return (
    <div className="courtyard-reveal" aria-hidden="true">
      <div className="courtyard-sunlight" />
      <div className="courtyard-arch">
        <div className="arch-inner">
          <div className="courtyard-sky">
            <span className="courtyard-sun" />
            <span className="courtyard-cloud cloud-one" />
            <span className="courtyard-cloud cloud-two" />
            <span className="courtyard-bird bird-one">⌁</span>
            <span className="courtyard-bird bird-two">⌁</span>
          </div>
          <div className="courtyard-home">
            <div className="home-roof"><span /></div>
            <div className="home-wall">
              <div className="home-window window-left"><i /><b /></div>
              <div className="home-door"><span /></div>
              <div className="home-window window-right"><i /><b /></div>
              <div className="home-garland">✿　✿　✿　✿　✿</div>
            </div>
            <div className="home-veranda"><i /><i /><i /><i /></div>
          </div>
          <div className="courtyard-tree tree-left"><i /><b /><em /></div>
          <div className="courtyard-tree tree-right"><i /><b /><em /></div>
          <div className="courtyard-ground" />
          <div className="courtyard-rangoli"><i /><b /><em /><span /></div>
          <div className="dadi-figure">
            <div className="dadi-hair" />
            <div className="dadi-face"><i /></div>
            <div className="dadi-sari">✿　✿</div>
            <div className="dadi-arm" />
            <div className="dadi-yarn" />
            <div className="dadi-needle" />
          </div>
          <div className="child-figure child-girl">
            <div className="child-hair" />
            <div className="child-face" />
            <div className="child-clothes" />
          </div>
          <div className="child-figure child-boy">
            <div className="child-hair" />
            <div className="child-face" />
            <div className="child-clothes" />
          </div>
          <div className="yarn-basket"><i /><i /><i /><i /></div>
          <div className="courtyard-night" />
        </div>
      </div>
    </div>
  );
}

function Doorway() {
  return (
    <div className="doorway-stage" aria-hidden="true">
      <Courtyard />
      <div className="doorway-frame">
        <div className="frame-carving carving-top">✿　❧　✿　❧　✿</div>
        <div className="frame-side frame-side-left" />
        <div className="frame-side frame-side-right" />
        <div className="door-leaf">
          <div className="door-panels">
            <span /><span /><span /><span />
          </div>
          <div className="door-carving">❧<br />✿<br />❧</div>
          <div className="door-knocker"><i /></div>
          <div className="door-handle" />
        </div>
        <div className="crochella-nameplate">
          <span>घर</span>
          <strong>Crochella</strong>
          <i>Woven with love</i>
        </div>
        <div className="frame-threshold" />
      </div>
      <div className="doorway-shade" />
    </div>
  );
}

function App() {
  const hero = useRef(null);
  const story = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const select = gsap.utils.selector(hero);
      const fibers = gsap.utils.toArray('.yarn-fiber');
      const timeline = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: hero.current,
          start: 'top top',
          end: '+=340%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      timeline
        .to(select('.hero-intro'), { opacity: 0, scale: 0.86, y: -30, duration: 0.24 }, 0)
        .to(select('.doorway-stage'), { opacity: 1, scale: 1.08, duration: 0.42 }, 0.06)
        .to(fibers, {
          x: (index) => index % 2 ? '120vw' : '-120vw',
          rotation: (index) => index % 2 ? 24 : -24,
          opacity: 0.08,
          duration: 0.82,
          stagger: { each: 0.003, from: 'random' },
          ease: 'power3.inOut',
        }, 0.08)
        .to(select('.yarn-center-glow'), { opacity: 0.12, scale: 1.8, duration: 0.4 }, 0.1)
        .to(select('.door-leaf'), { rotationY: -104, duration: 0.46, ease: 'power3.inOut' }, 0.47)
        .to(select('.courtyard-sunlight'), { opacity: 1, scale: 1.4, duration: 0.4 }, 0.48)
        .to(select('.courtyard-caption'), { opacity: 1, y: 0, duration: 0.24 }, 0.61)
        .to(select('.courtyard-night'), { opacity: 0.62, duration: 0.5 }, 0.72)
        .to(select('.doorway-stage'), { scale: 1.16, y: -12, duration: 0.28 }, 0.74)
        .to(select('.follow-thread'), { opacity: 1, y: 0, duration: 0.2 }, 0.82);

      gsap.from(select('.story-inner'), {
        y: 56,
        opacity: 0,
        duration: 0.9,
        scrollTrigger: {
          trigger: story.current,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <main>
      <section className="hero immersive-hero" ref={hero}>
        <div className="hero-darkness" />
        <YarnField />
        <div className="hero-topline">
          <span>FATEHPUR · BAHUA</span>
          <span>HANDMADE, FROM THE HEART</span>
        </div>
        <div className="hero-intro">
          <span className="intro-eyebrow">A little thread. A whole lot of love.</span>
          <h1>Crochella</h1>
          <p>Woven Stories for Brighter Days</p>
          <span className="intro-stitch">✳</span>
        </div>
        <Doorway />
        <div className="courtyard-caption">
          <span>AND BEHIND EVERY THREAD…</span>
          <h2>there is a home.</h2>
          <p>Dadi’s hands. A familiar angan. Stories stitched with love.</p>
        </div>
        <div className="follow-thread"><span>↓</span> FOLLOW THE THREAD</div>
        <div className="hero-scroll-hint"><span /> SCROLL TO ENTER</div>
        <div className="hero-grain" />
      </section>

      <section className="story" ref={story}>
        <div className="story-thread" />
        <div className="story-inner">
          <small>01 · HAMAARI KAHANI</small>
          <h2>{site.story.title}</h2>
          <p className="lead">{site.story.lead}</p>
          <hr />
          <p>{site.story.body}</p>
          <a href="#products">Follow the thread <b>↘</b></a>
        </div>
      </section>

      <section id="products" className="next">
        <small>02 · THE LITTLE THINGS</small>
        <h2>Small stitches.<br /><em>Big smiles.</em></h2>
        <p>Products, collections and the handmade world will unfold here next.</p>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
