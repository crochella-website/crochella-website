import React,{useLayoutEffect,useRef}from'react';
import{createRoot}from'react-dom/client';
import{gsap}from'gsap';
import{ScrollTrigger}from'gsap/ScrollTrigger';
import'./styles.css';
import site from'./content/site.json';

gsap.registerPlugin(ScrollTrigger);

const colors=['#7f2e25','#b04a32','#d9893d','#e7bd6a','#46705a','#315b4a','#9b3f35','#c67a36','#4b684f','#d7a852','#8e352c','#45684e','#b85c3d','#d79c4c','#52735d','#8b3028'];

function YarnStrand({c,i,side}) {
  const drift=(i-(colors.length-1)/2)*1.65;
  return <span className="strand" style={{'--c':c,'--drift':`${drift}vw`,'--i':i,'--side':side}}>
    <i/><b/>
  </span>
}

function Gate(){
  return <div className="gate" aria-hidden="true">
    <div className="gate-light"/>
    <div className="curtain left">{colors.map((c,i)=><YarnStrand key={i} c={c} i={i} side="left"/>)}</div>
    <div className="curtain right">{[...colors].reverse().map((c,i)=><YarnStrand key={i} c={c} i={i} side="right"/>)}</div>
    <div className="gate-shadow"/>
  </div>
}

function Logo(){
  return <div className="logo-wrap">
    <div className="logo-halo"/>
    <div className="logo-orbit orbit-one"/>
    <div className="logo-orbit orbit-two"/>
    <div className="logo">
      <div className="logo-stitch"/>
      <small>HANDMADE · FROM THE HEART</small>
      <strong>Crochella</strong>
      <i>Woven Stories for Brighter Days</i>
      <b>✿</b>
    </div>
  </div>
}

function ThreadTrail(){
  return <svg className="thread-trail" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
    <path d="M510 345 C500 420 650 440 770 510 C850 558 900 610 920 700"/>
    <circle cx="510" cy="345" r="6"/>
  </svg>
}

function Angan(){
  return <div className="angan">
    <div className="sky-grain"/>
    <div className="sun"><span/></div>
    <div className="cloud a"/><div className="cloud b"/>
    <div className="bird b1"/><div className="bird b2"/>
    <div className="tree l"><i/><b/><em/></div>
    <div className="tree r"><i/><b/><em/></div>
    <div className="house">
      <div className="roof"><span/><i/></div>
      <div className="wall">
        <div className="window w1"><i/><b/></div>
        <div className="door"><span/><i/></div>
        <div className="window w2"><i/><b/></div>
        <div className="garland"/>
      </div>
      <div className="veranda"><i/><i/><i/><i/></div>
    </div>
    <div className="ground-pattern"/>
    <div className="rangoli"><i/><b/><em/><span/></div>
    <div className="dadi"><div className="dadi-head"/><div className="dadi-body"/><div className="dadi-arm"/><div className="crochet-ball"/></div>
    <div className="child"><div className="child-head"/><div className="child-body"/><div className="child-arm"/></div>
    <div className="basket"><i/><i/><i/><i/></div>
    <ThreadTrail/>
  </div>
}

function App(){
  const hero=useRef(),story=useRef();
  useLayoutEffect(()=>{
    const ctx=gsap.context(()=>{
      const q=gsap.utils.selector(hero);
      const left=gsap.utils.toArray('.curtain.left .strand');
      const right=gsap.utils.toArray('.curtain.right .strand');
      const tl=gsap.timeline({scrollTrigger:{
        trigger:hero.current,start:'top top',end:'+=280%',scrub:1.2,pin:true,anticipatePin:1
      }});

      tl.to(q('.copy'),{x:-70,opacity:0,duration:.22},0)
        .to(q('.scroll-note'),{opacity:0,duration:.12},0)
        .to(q('.logo-wrap'),{scale:.72,y:-10,duration:.22},.03)
        .to(q('.logo-halo'),{scale:1.8,opacity:0,duration:.25},.03)
        .to(left,{x:(i)=>`calc(-${18+i*.72}vw - ${i%3}px)`,rotation:(i)=>-3+(i%4)*.5,duration:.75,stagger:.01,ease:'power3.inOut'},.08)
        .to(right,{x:(i)=>`calc(${18+i*.72}vw + ${i%3}px)`,rotation:(i)=>3-(i%4)*.5,duration:.75,stagger:.01,ease:'power3.inOut'},.08)
        .to(q('.gate-shadow'),{opacity:0,duration:.35},.2)
        .to(q('.logo'),{scale:.48,opacity:0,duration:.45},.42)
        .to(q('.thread-trail'),{opacity:1,duration:.2},.45)
        .to(q('.angan'),{opacity:1,scale:1,y:0,duration:.65,ease:'power2.out'},.18)
        .to(q('.angan-copy'),{opacity:1,y:0,duration:.35},.52)
        .to(q('.angan'),{scale:1.07,y:-22,duration:.4},.68);

      gsap.from(q('.story-inner'),{
        y:70,opacity:0,duration:1,
        scrollTrigger:{trigger:story.current,start:'top 78%',toggleActions:'play none none reverse'}
      });
    },hero);
    return()=>ctx.revert();
  },[]);

  return <main>
    <section className="hero" ref={hero}>
      <div className="paper"/>
      <div className="paper-fibers"/>
      <div className="top"><span>EST. 2026</span><span>FATEHPUR · BAHUA · UTTAR PRADESH</span><span>SCROLL TO ENTER</span></div>

      <div className="copy">
        <small>A little thread. A whole lot of love.</small>
        <h1>Woven stories<br/><em>for brighter days.</em></h1>
        <p>Crochella begins where handmade work, family memory and everyday joy meet.</p>
      </div>

      <Angan/>
      <Gate/>
      <Logo/>

      <div className="scroll-note"><span>↓</span> PULL THE THREAD TO ENTER</div>

      <div className="angan-copy">
        <small>AND BEHIND EVERY THREAD…</small>
        <h2>there is a home.</h2>
        <p>An angan full of stories, soft afternoons and hands that never stopped making.</p>
      </div>
    </section>

    <section className="story" ref={story}>
      <div className="story-thread"/>
      <div className="story-inner">
        <small>01 · HAMAARI KAHANI</small>
        <h2>{site.story.title}</h2>
        <p className="lead">{site.story.lead}</p>
        <hr/>
        <p>{site.story.body}</p>
        <a href="#products">Follow the thread <b>↘</b></a>
      </div>
    </section>

    <section id="products" className="next">
      <small>02 · THE LITTLE THINGS</small>
      <h2>Small stitches.<br/><em>Big smiles.</em></h2>
      <p>Products, collections and the handmade world will unfold here next.</p>
    </section>
  </main>
}
createRoot(document.getElementById('root')).render(<App/>);
