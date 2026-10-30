import React, { useEffect, useRef, useState } from 'react';

const INSTAGRAM = 'https://www.instagram.com/crochellaart/';
const QR = 'https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=12&data=https%3A%2F%2Fwww.instagram.com%2Fcrochellaart%2F';

export default function BlossomTree() {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [qrOpen, setQrOpen] = useState(false);
  const [mode, setMode] = useState('spring');
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    let renderer, observer, resizeObserver, raf = 0, running = false;
    let scene, camera, treeRoot, blossomGroup, raycaster, pointer;
    let breeze = false, blossomMaterials = [], fallingPetals = [];
    let disposed = false;

    const boot = async () => {
      const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js');
      if (disposed || !canvasRef.current) return;
      const canvas = canvasRef.current;
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
      camera.position.set(6.8, 7.4, 10.8);
      camera.lookAt(0, 2.5, 0);
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.16;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      scene.add(new THREE.HemisphereLight(0xffe8ec, 0x5c2531, 2.0));
      const key = new THREE.DirectionalLight(0xfff4e9, 3.0);
      key.position.set(-4, 9, 6);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      key.shadow.camera.left = -8; key.shadow.camera.right = 8;
      key.shadow.camera.top = 10; key.shadow.camera.bottom = -8;
      scene.add(key);
      const fill = new THREE.PointLight(0xff8fae, 18, 18);
      fill.position.set(4, 4, 2); scene.add(fill);

      const floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.ShadowMaterial({ opacity: .17 }));
      floor.rotation.x = -Math.PI / 2; floor.position.y = -.04; floor.receiveShadow = true; scene.add(floor);

      // Small tiled garden plinth
      const platform = new THREE.Group(); scene.add(platform);
      const base = new THREE.Mesh(new THREE.BoxGeometry(5.9, .18, 5.9), new THREE.MeshStandardMaterial({ color: 0xf6e7d8, roughness: .9 }));
      base.position.y = .06; base.receiveShadow = true; base.castShadow = true; platform.add(base);
      const grout = new THREE.MeshStandardMaterial({ color: 0x9d7d79, roughness: 1 });
      const tileMat = new THREE.MeshStandardMaterial({ color: 0xfff5e9, roughness: .86 });
      for (let i = 0; i <= 18; i++) {
        const a = new THREE.Mesh(new THREE.BoxGeometry(.018, .012, 5.85), grout);
        a.position.set(-2.92 + i * .324, .16, 0); platform.add(a);
        const b = new THREE.Mesh(new THREE.BoxGeometry(5.85, .012, .018), grout);
        b.position.set(0, .16, -2.92 + i * .324); platform.add(b);
      }
      for (let x = -2.75; x <= 2.75; x += .324) for (let z = -2.75; z <= 2.75; z += .324) {
        const tile = new THREE.Mesh(new THREE.BoxGeometry(.30, .018, .30), tileMat);
        tile.position.set(x, .17, z); tile.receiveShadow = true; platform.add(tile);
      }

      treeRoot = new THREE.Group(); scene.add(treeRoot);
      const bark = new THREE.MeshStandardMaterial({ color: 0x59301f, roughness: .82 });
      const barkLight = new THREE.MeshStandardMaterial({ color: 0x75412b, roughness: .78 });
      const branch = (points, radius, material = bark) => {
        const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
        const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 48, radius, 10, false), material);
        mesh.castShadow = true; mesh.receiveShadow = true; treeRoot.add(mesh);
      };
      // Main twisting trunk, limbs and exposed roots
      branch([[0,.18,0],[.12,.8,.04],[-.18,1.45,.08],[.16,2.15,0],[.52,2.8,.1],[.65,3.45,.08]], .29);
      branch([[.02,1.2,0],[-.65,1.8,.08],[-1.25,2.35,.1],[-1.95,2.6,.16]], .14, barkLight);
      branch([[.1,1.85,.02],[.75,2.25,-.1],[1.35,2.65,-.15],[2,2.8,-.05]], .13);
      branch([[.1,2.35,.02],[-.2,2.9,.1],[-.65,3.45,.08],[-1.2,3.75,.05]], .11, barkLight);
      branch([[.35,2.65,.04],[.9,3.15,.1],[1.35,3.65,.12],[1.85,3.82,.15]], .105);
      branch([[.4,2.9,0],[.15,3.5,-.25],[.15,4.05,-.3],[.45,4.35,-.25]], .09, barkLight);
      branch([[-.2,1,0],[-.5,.5,.5],[-.9,.2,.75]], .12);
      branch([[.12,.75,0],[.5,.35,-.55],[.95,.2,-.8]], .13, barkLight);
      branch([[.15,.7,.04],[-.2,.3,-.7],[-.45,.19,-1.05]], .11);
      [[-1.25,.3],[1.15,.55],[-.8,-.95],[.85,-.9],[.15,1.2]].forEach(([x,z],i) => {
        branch([[0,.48,0],[x*.35,.28,z*.35],[x*.75,.19,z*.8],[x,.18,z]], .105 - i*.008);
      });

      const pinks = [0xf18bb0, 0xf7a9c4, 0xffc3d2, 0xf7d8d9, 0xe979a3];
      const clusterPositions = [
        [-2.05,2.75,.05],[-1.65,3.25,0],[-1.15,3.75,0],[-.65,4.05,.1],[-.05,4.25,.05],[.55,4.25,.05],[1.15,4,.05],[1.7,3.75,.05],[2.05,3.2,.05],[2.15,2.75,0],
        [1.45,3,.6],[.8,3.55,.75],[-.1,3.65,.8],[-1,3.25,.75],[-1.8,2.85,.7],[.2,4.55,-.55],[1.15,4.15,-.65],[-1,4,-.65],[-1.9,3.35,-.6],[1.8,3.3,-.65],[.1,3.1,-.8]
      ];
      blossomGroup = new THREE.Group(); treeRoot.add(blossomGroup);
      const blossomGeo = new THREE.IcosahedronGeometry(.17, 1);
      clusterPositions.forEach((pos, ci) => {
        const cluster = new THREE.Group(); cluster.position.set(...pos); cluster.scale.setScalar(.72 + Math.random() * .48); blossomGroup.add(cluster);
        for (let j = 0; j < 24; j++) {
          const mat = new THREE.MeshStandardMaterial({ color: pinks[(ci + j) % pinks.length], roughness: .88 });
          blossomMaterials.push(mat);
          const flower = new THREE.Mesh(blossomGeo, mat);
          const angle = Math.random() * Math.PI * 2, radius = Math.random() * .58;
          flower.position.set(Math.cos(angle) * radius, (Math.random() - .5) * .62, Math.sin(angle) * radius);
          flower.scale.set(.65 + Math.random() * .7, .55 + Math.random() * .7, .55 + Math.random() * .7);
          flower.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
          flower.castShadow = true; cluster.add(flower);
        }
      });

      // Pink flower beds scattered over the tiled platform
      const gardenMat = new THREE.MeshStandardMaterial({ color: 0xf18bb0, roughness: .9 });
      [[-2,-1.8],[1.9,-1.7],[-1.8,1.8]].forEach(([x,z]) => {
        for (let n = 0; n < 24; n++) {
          const flower = new THREE.Mesh(new THREE.SphereGeometry(.055, 7, 6), gardenMat);
          flower.position.set(x + (Math.random() - .5) * .85, .23 + Math.random() * .28, z + (Math.random() - .5) * .7);
          flower.scale.y = 1.5; platform.add(flower);
        }
      });

      // Petals drift down in front of the tree
      const petalGeo = new THREE.SphereGeometry(.045, 7, 5);
      const petalMat = new THREE.MeshStandardMaterial({ color: 0xffa7c5, roughness: .75 });
      for (let i = 0; i < 70; i++) {
        const petal = new THREE.Mesh(petalGeo, petalMat);
        petal.position.set((Math.random() - .5) * 7, Math.random() * 5 + .4, (Math.random() - .5) * 6);
        petal.scale.set(1.3, .35, .8); scene.add(petal);
        fallingPetals.push({ mesh: petal, speed: .22 + Math.random() * .45, phase: Math.random() * 6.28, drift: (Math.random() - .5) * .35 });
      }
      const halo = new THREE.Mesh(new THREE.SphereGeometry(2.9, 32, 24), new THREE.MeshBasicMaterial({ color: 0xff9fbe, transparent: true, opacity: .10, side: THREE.BackSide, depthWrite: false }));
      halo.position.set(0, 3.4, -1.6); treeRoot.add(halo);

      raycaster = new THREE.Raycaster(); pointer = new THREE.Vector2();
      const resize = () => {
        const w = canvas.clientWidth || 600, h = canvas.clientHeight || 500;
        renderer.setSize(w, h, false); camera.aspect = w / h;
        camera.position.set(w < 620 ? 5.8 : 6.8, w < 620 ? 8.2 : 7.4, w < 620 ? 12.7 : 10.8);
        camera.lookAt(0, 2.5, 0); camera.updateProjectionMatrix();
      };
      resizeObserver = new ResizeObserver(resize); resizeObserver.observe(canvas); resize();
      const onClick = e => {
        const rect = canvas.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        if (raycaster.intersectObjects(treeRoot.children, true).length) setQrOpen(true);
      };
      canvas.addEventListener('click', onClick);
      const clock = new THREE.Clock();
      const animate = () => {
        if (disposed) return;
        raf = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        treeRoot.rotation.y = Math.sin(t * .22) * .055;
        treeRoot.position.y = Math.sin(t * .8) * .055;
        blossomGroup.rotation.z = Math.sin(t * .6) * .012;
        fallingPetals.forEach(p => {
          p.mesh.position.y -= p.speed * .016 * (breeze ? 2.4 : 1);
          p.mesh.position.x += Math.sin(t * .7 + p.phase) * .003 + p.drift * .002;
          p.mesh.rotation.z += .008;
          if (p.mesh.position.y < .18) {
            p.mesh.position.y = 5.3;
            p.mesh.position.x = (Math.random() - .5) * 7;
            p.mesh.position.z = (Math.random() - .5) * 6;
          }
        });
        renderer.render(scene, camera);
      };
      const start = () => { if (!running) { running = true; animate(); } };
      const stop = () => { running = false; cancelAnimationFrame(raf); };
      observer = new IntersectionObserver(entries => entries[0].isIntersecting ? start() : stop(), { threshold: .04 });
      observer.observe(canvas);
      canvas._treeApi = {
        setMode: value => {
          const palette = value === 'breeze' ? [0xf6b5c8,0xffd5dc,0xf9e1dd,0xeaa5bd,0xf2c4ce] : value === 'bloom' ? [0xe979a3,0xf18bb0,0xff9fbd,0xf7a9c4,0xffc3d2] : pinks;
          blossomMaterials.forEach((m,i) => m.color.setHex(palette[i % palette.length]));
        },
        setBreeze: value => { breeze = value; },
        cleanup: () => { canvas.removeEventListener('click', onClick); }
      };
    };
    boot().catch(err => console.error('Blossom tree could not initialise:', err));
    return () => {
      disposed = true; cancelAnimationFrame(raf); observer?.disconnect(); resizeObserver?.disconnect();
      canvasRef.current?._treeApi?.cleanup?.();
      renderer?.dispose();
      if (scene) scene.traverse(obj => { obj.geometry?.dispose?.(); if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose()); else obj.material?.dispose?.(); });
      audioRef.current?.close?.(); audioRef.current = null;
    };
  }, []);

  const chooseMode = value => {
    setMode(value);
    canvasRef.current?._treeApi?.setMode(value);
    canvasRef.current?._treeApi?.setBreeze(value === 'breeze');
  };
  const toggleSound = () => {
    if (!soundOn) {
      try {
        const Audio = window.AudioContext || window.webkitAudioContext;
        if (Audio) {
          const ctx = new Audio(), gain = ctx.createGain(), mix = ctx.createGain();
          gain.gain.value = .012; mix.gain.value = .12; mix.connect(gain); gain.connect(ctx.destination);
          const a = ctx.createOscillator(), b = ctx.createOscillator();
          a.type = 'sine'; b.type = 'sine'; a.frequency.value = 196; b.frequency.value = 293.66;
          a.connect(mix); b.connect(mix); a.start(); b.start();
          audioRef.current = { close: () => { gain.gain.setTargetAtTime(0, ctx.currentTime, .08); setTimeout(() => ctx.close(), 350); } };
        }
      } catch (e) { console.warn('Audio unavailable', e); }
    } else { audioRef.current?.close?.(); audioRef.current = null; }
    setSoundOn(v => !v);
  };

  return <section className="instagram-section tree-garden-section" id="instagram" aria-labelledby="instagram-title">
    <div className="tree-garden-inner">
      <div className="tree-garden-heading">
        <span className="instagram-eyebrow"><i/> A LITTLE CORNER OF CROCHELLA</span>
        <h2 id="instagram-title">Where little joys<br/><em>come into bloom.</em></h2>
        <p>A tiny garden, grown with love. Tap the blossom tree to find your way to our Instagram world.</p>
      </div>
      <div className="tree-scene-wrap">
        <canvas ref={canvasRef} className="tree-scene-canvas" aria-label="Interactive 3D pink blossom tree. Tap the tree to reveal our Instagram QR code."/>
        <button className="tree-tap-hint" onClick={() => setQrOpen(true)}><span>♧</span> Tap the tree to see QR code</button>
      </div>
      <div className="tree-controls">
        <div className="tree-link-field"><span>↗</span><span>https://www.instagram.com/crochellaart/</span></div>
        <a className="tree-share-button" href={INSTAGRAM} target="_blank" rel="noreferrer">Visit <span>↗</span></a>
      </div>
      <div className="tree-mode-switch" role="group" aria-label="Tree atmosphere">
        <button className={mode === 'spring' ? 'active' : ''} onClick={() => chooseMode('spring')}>✿ <span>Spring</span></button>
        <button className={mode === 'bloom' ? 'active' : ''} onClick={() => chooseMode('bloom')}>✿ <span>Bloom</span></button>
        <button className={mode === 'breeze' ? 'active' : ''} onClick={() => chooseMode('breeze')}>≋ <span>Breeze</span></button>
        <button className={'tree-sound ' + (soundOn ? 'active' : '')} onClick={toggleSound} aria-label={soundOn ? 'Turn sound off' : 'Turn sound on'}>{soundOn ? '♫' : '♪'}</button>
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
