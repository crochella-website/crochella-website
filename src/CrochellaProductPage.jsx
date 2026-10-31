import React, { useEffect, useRef, useState } from 'react';
import pricing from './content/crochella-pricing.json';

const products=[
{id:'panda',name:'Panda Pal',image:'/uploads/panda-keychain.png',emoji:'🐼',story:'A tiny panda pal, crocheted stitch by stitch. Soft, playful, and ready to travel wherever your bag goes.',detail:'A little companion for everyday adventures.'},
{id:'turtle',name:'Turtle Buddy',image:'/uploads/turtle-keychain.png',emoji:'🐢',story:'A little turtle with a textured shell and a gentle smile, made slowly by hand in soft yarn.',detail:'Carry a reminder to take life one stitch at a time.'},
{id:'banana',name:'Bananita',image:'/uploads/banana-keychain.png',emoji:'🍌',story:'A sunny banana charm with a playful personality, handmade to add a little joy to your keys.',detail:'A tiny dose of sunshine, wherever you go.'},
{id:'bow',name:'Pink Bow',image:'/uploads/pink-bow-keychain.png',emoji:'🎀',story:'A soft pink bow with a sweet silhouette and a handmade finish.',detail:'A little ribbon of joy for your everyday.'},
{id:'burger',name:'Burger Buddy',image:'/uploads/burger-keychain.png',emoji:'🍔',story:'A mini burger charm stacked with colourful crochet layers, each one shaped by hand.',detail:'For the snack lover with a soft spot for handmade.'},
{id:'lion',name:'Little Lion',image:'/uploads/lion-keychain.png',emoji:'🦁',story:'A brave little lion with a warm, textured mane and a big-hearted character.',detail:'A pocket-sized companion for brave days.'},
{id:'avocado',name:'Avo Cutie',image:'/uploads/avocado-keychain.png',emoji:'🥑',story:'Fresh green yarn, a happy face, and a tiny avocado shape made into a cheerful charm.',detail:'A little green goodness for your bag.'},
{id:'penguin',name:'Penguin Pal',image:'/uploads/penguin-keychain.png',emoji:'🐧',story:'A cosy penguin pal made with soft yarn and lots of care.',detail:'A cool little friend with a warm handmade heart.'},
{id:'handbag',name:'Mini Tote',image:'/uploads/handbag-keychain.png',emoji:'👜',story:'A miniature crochet tote with a charming flower detail and golden hardware.',detail:'A tiny bag for your favourite bag.'},
{id:'strawberry',name:'Berry Sweet',image:'/uploads/strawberry-keychain.png',emoji:'🍓',story:'A bright strawberry charm topped with leafy green details, stitched into a sweet little keepsake.',detail:'A berry-sized reminder to enjoy the little things.'},
{id:'chilli',name:'Chilli Pop',image:'/uploads/chilli-keychain.png',emoji:'🌶️',story:'A playful red chilli charm with a green crochet top and a little spicy attitude.',detail:'For a pop of colour and a pinch of personality.'},
{id:'bee',name:'Busy Bee',image:'/uploads/bee-keychain.png',emoji:'🐝',story:'A cheerful bee with sunny stripes and delicate handmade details.',detail:'A little buzz of happiness on the go.'},
{id:'bear',name:'Teddy Bear',image:'/uploads/bear-keychain.png',emoji:'🧸',story:'A classic little teddy bear, lovingly crocheted and finished with a tiny bow.',detail:'A pocket-sized hug, made by hand.'},
{id:'evil-eye',name:'Good Vibes',image:'/uploads/evil-eye-keychain.png',emoji:'🧿',story:'A vivid blue evil-eye charm with a daisy accent and playful tassels.',detail:'A bright little charm for your everyday essentials.'},
{id:'cherry',name:'Cherry Duo',image:'/uploads/cherry-keychain.png',emoji:'🍒',story:'Two little cherries with leafy stems, brought together in a handmade crochet charm.',detail:'Double the cherries, double the cheer.'},
{id:'sunflower',name:'Sunshine',image:'/uploads/sunflower-keychain.png',emoji:'🌻',story:'A cheerful sunflower with a textured centre and sunny petals, all crocheted by hand.',detail:'Carry a little sunshine with you.'},
{id:'heart',name:'Love Note',image:'/uploads/heart-keychain.png',emoji:'💗',story:'A bright crochet heart made to share a small, heartfelt reminder of love.',detail:'A tiny love note you can take anywhere.'}
];

export default function CrochellaProductPage({slug}){
 const product=products.find(p=>p.id===slug)||products[0];
 const [arrived,setArrived]=useState(false);
 const [soundOn,setSoundOn]=useState(false);
 const audioRef=useRef(null);
 useEffect(()=>{const timer=window.setTimeout(()=>setArrived(true),3900);return()=>window.clearTimeout(timer)},[slug]);
 const playArrival=()=>{
   try{
     const Ctx=window.AudioContext||window.webkitAudioContext;if(!Ctx)return;
     const ctx=audioRef.current||new Ctx();audioRef.current=ctx;if(ctx.state==='suspended')ctx.resume();
     const now=ctx.currentTime;
     // Soft rolling train rumble: filtered noise with a short fade.
     const buffer=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate),data=buffer.getChannelData(0);
     for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*.55;
     const noise=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),rumble=ctx.createGain();
     noise.buffer=buffer;filter.type='lowpass';filter.frequency.setValueAtTime(180,now);filter.frequency.linearRampToValueAtTime(420,now+.8);
     rumble.gain.setValueAtTime(.0001,now);rumble.gain.linearRampToValueAtTime(.075,now+.12);rumble.gain.exponentialRampToValueAtTime(.0001,now+1.5);
     noise.connect(filter);filter.connect(rumble);rumble.connect(ctx.destination);noise.start(now);noise.stop(now+1.55);
     // A gentle whistle followed by the platform arrival chime.
     const whistle=ctx.createOscillator(),whistleGain=ctx.createGain();
     whistle.type='sine';whistle.frequency.setValueAtTime(520,now+.12);whistle.frequency.exponentialRampToValueAtTime(760,now+.48);whistle.frequency.exponentialRampToValueAtTime(560,now+.95);
     whistleGain.gain.setValueAtTime(.0001,now+.12);whistleGain.gain.exponentialRampToValueAtTime(.045,now+.22);whistleGain.gain.exponentialRampToValueAtTime(.0001,now+1.05);
     whistle.connect(whistleGain);whistleGain.connect(ctx.destination);whistle.start(now+.12);whistle.stop(now+1.1);
     [[660,1.05],[880,1.23],[1046,1.41]].forEach(([freq,delay])=>{const osc=ctx.createOscillator(),gain=ctx.createGain();osc.type='sine';osc.frequency.setValueAtTime(freq,now+delay);gain.gain.setValueAtTime(.0001,now+delay);gain.gain.exponentialRampToValueAtTime(.10,now+delay+.025);gain.gain.exponentialRampToValueAtTime(.0001,now+delay+.42);osc.connect(gain);gain.connect(ctx.destination);osc.start(now+delay);osc.stop(now+delay+.45)});
     setSoundOn(true);window.setTimeout(()=>setSoundOn(false),1900);
   }catch{}
 };
 const price=pricing.products[product.id]?.price??99;
 return <main className="product-story-page">
  <header className="product-story-nav"><a href="/crochellas">← All little things</a><a className="product-story-logo" href="/">Crochella<span>®</span></a><a href="https://www.instagram.com/direct/t/17846754582500300" target="_blank" rel="noreferrer">Ask Dadi ↗</a></header>
  <section className="train-arrival" aria-label="The Crochella train arrives at Fatehpur">
   <div className="train-sky"><span className="train-star star-a">✦</span><span className="train-star star-b">✧</span><span className="train-route">A LITTLE JOURNEY FROM FATEHPUR</span>
    <div className="train-track"><span/><span/><span/><span/></div>
    <div className="train-vehicle" aria-hidden="true"><span className="train-smoke">☁</span><span className="train-engine">🚂</span><span className="train-car">✿</span><span className="train-car">♥</span></div>
    <div className={'station-sign '+(arrived?'is-visible':'')}><small>NEXT STOP</small><strong>FATEHPUR<br/>STATION</strong><span>Welcome to Crochella</span></div>
   </div>
   <div className={'station-story '+(arrived?'is-visible':'')}><span className="station-kicker">PLATFORM 01 · A STORY IN EVERY STITCH</span><h1>From Fatehpur,<br/><em>with love.</em></h1><p>In a little corner of Uttar Pradesh, Dadi and her crew turn yarn into tiny companions. Every loop is made by hand, with patience, warmth, and a story to share.</p><button className="arrival-sound" onClick={playArrival}>{soundOn?'♪ Playing arrival sounds':'♫ Hear train & platform sounds'}</button></div>
  </section>
  <section className="product-story-main">
   <div className="product-story-image"><div className="product-story-image-halo"/><img src={product.image} alt={product.name}/><span className="product-story-image-tag">HANDMADE IN FATEHPUR</span></div>
   <div className="product-story-copy"><span className="product-story-kicker">{product.emoji} · A LITTLE CROCHET COMPANION</span><h2>{product.name}</h2><p className="product-story-detail">{product.detail}</p><p>{product.story}</p><div className="product-story-price">₹{price}<small>INR · No extra shipping cost</small></div><div className="product-story-actions"><a className="product-story-ask" href="https://www.instagram.com/direct/t/17846754582500300" target="_blank" rel="noreferrer">Ask Dadi about this <span>↗</span></a><a className="product-story-back" href="/crochellas">Explore all products</a></div><p className="product-story-checkout-note">Online checkout is coming next. For now, message Dadi to place your order.</p></div>
  </section>
  <section className="product-story-end"><span>MADE SLOWLY · LOVED EVERYWHERE</span><a href="/crochellas">Find another little thing ↗</a></section>
 </main>
}
