import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { IsometricWorldIllustration } from './Artwork/IsometricWorldIllustration';

interface Props {
  onSelectLocation?: (locationName: 'College' | 'Home' | 'Market' | 'Cafe' | 'Bank') => void;
  selectedLocation?: string | null;
  interactive?: boolean;
  className?: string;
  showSpeechBubble?: boolean;
}

const TARGET_CAMERA_OFFSETS: Record<string, { pos: [number, number, number]; lookAt: [number, number, number] }> = {
  College: { pos: [14, 15, 12], lookAt: [0, 2.2, -6.5] },
  Cafe: { pos: [-2, 12, 18], lookAt: [-5.5, 1.8, 3.5] },
  Bank: { pos: [18, 14, 16], lookAt: [6, 2.2, 3.5] },
  Home: { pos: [18, 14, 6], lookAt: [5.8, 1.8, -4.8] },
  Market: { pos: [-2, 14, 12], lookAt: [-6.5, 1.6, -3] },
};

export const ThreeMoneyverse: React.FC<Props> = ({
  onSelectLocation,
  selectedLocation,
  interactive = true,
  className = 'w-full h-full min-h-[420px] lg:min-h-[500px]',
  showSpeechBubble = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  // Store active selectedLocation in a ref so Three.js render loop picks it up smoothly
  const selectedLocationRef = useRef<string | null>(selectedLocation || null);
  useEffect(() => {
    selectedLocationRef.current = selectedLocation || null;
  }, [selectedLocation]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();

    // Soft atmospheric sunset fog that harmonizes with the dreamy sky
    scene.fog = new THREE.FogExp2(0x351342, 0.007);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    // Isometric angle perspective
    const initialCameraPos = new THREE.Vector3(26, 20, 26);
    camera.position.copy(initialCameraPos);
    camera.lookAt(0, 0.8, 0);

    // Current interpolated positions for butter-smooth camera movement
    const currentCameraPos = initialCameraPos.clone();
    const currentLookAt = new THREE.Vector3(0, 0.8, 0);

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Lighting Setup (Cinematic Sunset Palette)
    // Soft Ambient Sky Light (Midnight violet/blue)
    const ambientLight = new THREE.AmbientLight(0x4338ca, 0.75);
    scene.add(ambientLight);

    // Warm Sunset Directional Sun Light (Golden Orange)
    const sunLight = new THREE.DirectionalLight(0xfbbf24, 2.3);
    sunLight.position.set(22, 28, 15);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 512;
    sunLight.shadow.mapSize.height = 512;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 80;
    sunLight.shadow.camera.left = -20;
    sunLight.shadow.camera.right = 20;
    sunLight.shadow.camera.top = 20;
    sunLight.shadow.camera.bottom = -20;
    sunLight.shadow.bias = -0.001;
    scene.add(sunLight);

    // Pink/Magenta Rim Light (Simulates sunset cloud reflection)
    const rimLight = new THREE.DirectionalLight(0xf43f5e, 1.5);
    rimLight.position.set(-20, 15, -20);
    scene.add(rimLight);

    // Cyan Fill Light (Atmospheric contrast)
    const cyanFill = new THREE.DirectionalLight(0x06b6d4, 0.65);
    cyanFill.position.set(0, -10, 15);
    scene.add(cyanFill);

    // 4. World Geometry Group
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Island Underside Rock (Deep slate crag)
    const rockGeo = new THREE.ConeGeometry(13, 10, 7);
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.9,
      metalness: 0.1,
      flatShading: true,
    });
    const rockMesh = new THREE.Mesh(rockGeo, rockMat);
    rockMesh.rotation.x = Math.PI;
    rockMesh.position.y = -5;
    rockMesh.receiveShadow = true;
    worldGroup.add(rockMesh);

    // Island Top Grass Plateau
    const islandGeo = new THREE.CylinderGeometry(13.2, 12.8, 1.4, 7);
    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      roughness: 0.75,
      metalness: 0.05,
      flatShading: true,
    });
    const islandMesh = new THREE.Mesh(islandGeo, grassMat);
    islandMesh.position.y = 0.7;
    islandMesh.receiveShadow = true;
    worldGroup.add(islandMesh);

    // Cobblestone Pathways & Plaza
    const pathMat = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      roughness: 0.8,
      metalness: 0.1,
    });
    // Main avenue cross
    const path1 = new THREE.Mesh(new THREE.BoxGeometry(22, 0.05, 2.2), pathMat);
    path1.position.y = 1.42;
    path1.rotation.y = Math.PI / 4;
    path1.receiveShadow = true;
    worldGroup.add(path1);

    const path2 = new THREE.Mesh(new THREE.BoxGeometry(22, 0.05, 2.2), pathMat);
    path2.position.y = 1.42;
    path2.rotation.y = -Math.PI / 4;
    path2.receiveShadow = true;
    worldGroup.add(path2);

    // Central Fountain Plaza
    const plazaGeo = new THREE.CylinderGeometry(3.2, 3.2, 0.1, 16);
    const plazaMesh = new THREE.Mesh(plazaGeo, pathMat);
    plazaMesh.position.y = 1.45;
    plazaMesh.receiveShadow = true;
    worldGroup.add(plazaMesh);

    // Fountain basin & water
    const fountainRim = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.6, 0.35, 16),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.5 })
    );
    fountainRim.position.y = 1.6;
    worldGroup.add(fountainRim);

    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      metalness: 0.85,
      emissive: 0x0284c7,
      emissiveIntensity: 0.35,
    });
    const water = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.3, 16), waterMat);
    water.position.y = 1.65;
    worldGroup.add(water);

    // Central fountain jet
    const jetGeo = new THREE.ConeGeometry(0.35, 0.8, 8);
    const jetMat = new THREE.MeshStandardMaterial({
      color: 0xbae6fd,
      roughness: 0.2,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.6,
    });
    const jet = new THREE.Mesh(jetGeo, jetMat);
    jet.position.y = 2.0;
    worldGroup.add(jet);

    // 5. Lampposts along cobblestone paths
    const lampMatPole = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.6, roughness: 0.4 });
    const lampMatGlow = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xfde047,
      emissiveIntensity: 1.2,
    });

    const lampPositions: [number, number, number][] = [
      [2.2, 1.4, 2.2],
      [-2.2, 1.4, -2.2],
      [-2.2, 1.4, 2.2],
      [2.2, 1.4, -2.2],
      [0, 1.4, 4.5],
      [0, 1.4, -4.5],
    ];

    lampPositions.forEach(([lx, ly, lz]) => {
      const lamp = new THREE.Group();
      lamp.position.set(lx, ly, lz);

      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.6, 6), lampMatPole);
      pole.position.y = 0.8;
      pole.castShadow = true;
      lamp.add(pole);

      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), lampMatGlow);
      bulb.position.y = 1.65;
      lamp.add(bulb);

      worldGroup.add(lamp);
    });

    // 6. Interactive Buildings with Raycast Identifiers
    const interactiveBuildings: {
      name: 'College' | 'Home' | 'Market' | 'Cafe' | 'Bank';
      group: THREE.Group;
      baseY: number;
      materials: THREE.MeshStandardMaterial[];
      light: THREE.PointLight;
    }[] = [];

    // Helper: Create Building Group
    const createBuilding = (name: 'College' | 'Home' | 'Market' | 'Cafe' | 'Bank', pos: [number, number, number]) => {
      const bGroup = new THREE.Group();
      bGroup.position.set(...pos);
      bGroup.name = name;
      bGroup.userData = { locationName: name };

      const bMats: THREE.MeshStandardMaterial[] = [];
      let lightColor = 0xfde047;

      if (name === 'College') {
        lightColor = 0xfbbf24;
        const wallMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.6 });
        const roofMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.4, metalness: 0.2 });
        const pillarMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
        const windowMat = new THREE.MeshStandardMaterial({
          color: 0xfef08a,
          emissive: 0xfde047,
          emissiveIntensity: 0.7,
        });
        bMats.push(wallMat, roofMat, pillarMat, windowMat);

        // Main Hall
        const body = new THREE.Mesh(new THREE.BoxGeometry(4.5, 3.2, 3), wallMat);
        body.position.y = 1.6;
        body.castShadow = true;
        bGroup.add(body);

        // Roof
        const roof = new THREE.Mesh(new THREE.ConeGeometry(3.4, 2, 4), roofMat);
        roof.position.y = 4.2;
        roof.rotation.y = Math.PI / 4;
        roof.castShadow = true;
        bGroup.add(roof);

        // Classical Pillars
        [-1.6, -0.8, 0.8, 1.6].forEach((px) => {
          const col = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 2.8, 8), pillarMat);
          col.position.set(px, 1.4, 1.6);
          col.castShadow = true;
          bGroup.add(col);
        });

        // Glowing Windows
        [-1.2, 1.2].forEach((wx) => {
          const win = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1), windowMat);
          win.position.set(wx, 2.2, 1.52);
          bGroup.add(win);
        });
      } else if (name === 'Cafe') {
        lightColor = 0xf43f5e;
        const wallMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.6 });
        const awningMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.5 });
        const windowMat = new THREE.MeshStandardMaterial({
          color: 0xfef08a,
          emissive: 0xf59e0b,
          emissiveIntensity: 0.8,
        });
        bMats.push(wallMat, awningMat, windowMat);

        const body = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.4, 2.8), wallMat);
        body.position.y = 1.2;
        body.castShadow = true;
        bGroup.add(body);

        const awning = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.4, 1.2), awningMat);
        awning.position.set(0, 2.1, 1.6);
        awning.rotation.x = 0.25;
        bGroup.add(awning);

        const cafeWin = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.2), windowMat);
        cafeWin.position.set(0, 1.2, 1.42);
        bGroup.add(cafeWin);
      } else if (name === 'Bank') {
        lightColor = 0xfbbf24;
        const wallMat = new THREE.MeshStandardMaterial({ color: 0x6366f1, roughness: 0.4, metalness: 0.3 });
        const goldMat = new THREE.MeshStandardMaterial({
          color: 0xfbbf24,
          roughness: 0.3,
          metalness: 0.8,
          emissive: 0xd97706,
          emissiveIntensity: 0.4,
        });
        bMats.push(wallMat, goldMat);

        const body = new THREE.Mesh(new THREE.BoxGeometry(3, 4, 3), wallMat);
        body.position.y = 2;
        body.castShadow = true;
        bGroup.add(body);

        const vaultEmblem = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.2, 16), goldMat);
        vaultEmblem.rotation.x = Math.PI / 2;
        vaultEmblem.position.set(0, 2.8, 1.55);
        bGroup.add(vaultEmblem);
      } else if (name === 'Home') {
        lightColor = 0x06b6d4;
        const wallMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.6 });
        const roofMat = new THREE.MeshStandardMaterial({ color: 0xe11d48, roughness: 0.5 });
        bMats.push(wallMat, roofMat);

        const body = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.2, 2.8), wallMat);
        body.position.y = 1.1;
        body.castShadow = true;
        bGroup.add(body);

        const roof = new THREE.Mesh(new THREE.ConeGeometry(2.4, 1.6, 4), roofMat);
        roof.position.y = 3;
        roof.rotation.y = Math.PI / 4;
        roof.castShadow = true;
        bGroup.add(roof);

        const chimney = new THREE.Mesh(
          new THREE.BoxGeometry(0.4, 1.2, 0.4),
          new THREE.MeshStandardMaterial({ color: 0x64748b })
        );
        chimney.position.set(0.8, 3.2, 0);
        bGroup.add(chimney);
      } else if (name === 'Market') {
        lightColor = 0xa855f7;
        const wallMat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, roughness: 0.6 });
        const canopyMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.4 });
        bMats.push(wallMat, canopyMat);

        const body = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 2.6), wallMat);
        body.position.y = 1;
        body.castShadow = true;
        bGroup.add(body);

        const canopy = new THREE.Mesh(new THREE.ConeGeometry(2.2, 1.2, 4), canopyMat);
        canopy.position.y = 2.6;
        canopy.rotation.y = Math.PI / 4;
        bGroup.add(canopy);
      }

      // Add a dedicated PointLight for each building that pulses on hover
      const bLight = new THREE.PointLight(lightColor, 0.8, 8);
      bLight.position.set(0, 2.5, 0);
      bGroup.add(bLight);

      worldGroup.add(bGroup);
      interactiveBuildings.push({ name, group: bGroup, baseY: pos[1], materials: bMats, light: bLight });
    };

    // Place buildings on island nodes
    createBuilding('College', [0, 1.4, -6.5]);
    createBuilding('Cafe', [-5.5, 1.4, 3.5]);
    createBuilding('Bank', [6, 1.4, 3.5]);
    createBuilding('Home', [5.8, 1.4, -4.8]);
    createBuilding('Market', [-6.5, 1.4, -3]);

    // 7. Environmental Trees & Details
    const treeMatTrunk = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 });
    const treeMatFoliage1 = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.7, flatShading: true });
    const treeMatFoliage2 = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.7, flatShading: true });

    const treePositions: [number, number, number][] = [
      [-3.2, 1.4, -6.5],
      [3.2, 1.4, -6.8],
      [-8.2, 1.4, 0],
      [8.2, 1.4, -0.5],
      [-2.5, 1.4, 6.8],
      [3.2, 1.4, 6.5],
      [-7.2, 1.4, 4.8],
    ];

    treePositions.forEach(([tx, ty, tz], i) => {
      const tree = new THREE.Group();
      tree.position.set(tx, ty, tz);

      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.25, 1.2, 6), treeMatTrunk);
      trunk.position.y = 0.6;
      trunk.castShadow = true;
      tree.add(trunk);

      const foliage = new THREE.Mesh(
        new THREE.DodecahedronGeometry(i % 2 === 0 ? 1.1 : 0.9, 1),
        i % 2 === 0 ? treeMatFoliage1 : treeMatFoliage2
      );
      foliage.position.y = 1.7;
      foliage.castShadow = true;
      tree.add(foliage);

      worldGroup.add(tree);
    });

    // 8. 3D Character Model (Student with Pink Hoodie & Backpack on the path)
    const charGroup = new THREE.Group();
    charGroup.position.set(0.6, 1.4, 2.2);
    charGroup.rotation.y = Math.PI * 0.9; // Gazing north towards college

    const pinkHoodieMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.5 });
    const jeansMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xfed7aa, roughness: 0.4 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x381c10, roughness: 0.8 });
    const packMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.7 });

    // Legs
    const legL = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.9, 8), jeansMat);
    legL.position.set(-0.2, 0.45, 0);
    const legR = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.9, 8), jeansMat);
    legR.position.set(0.2, 0.45, 0);
    charGroup.add(legL, legR);

    // Torso / Hoodie
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.9, 0.45), pinkHoodieMat);
    torso.position.set(0, 1.2, 0);
    torso.castShadow = true;
    charGroup.add(torso);

    // Backpack
    const backpack = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.7, 0.35), packMat);
    backpack.position.set(0, 1.2, 0.35);
    backpack.castShadow = true;
    charGroup.add(backpack);

    // Head & Hair
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 12), skinMat);
    head.position.set(0, 1.85, 0);
    charGroup.add(head);

    const hair = new THREE.Mesh(new THREE.SphereGeometry(0.32, 12, 12), hairMat);
    hair.position.set(0, 1.9, -0.05);
    charGroup.add(hair);

    worldGroup.add(charGroup);

    // 9. Atmospheric Floating Starlight Motes
    const particleCount = 90;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 32;
      particlePos[i + 1] = Math.random() * 18 - 2;
      particlePos[i + 2] = (Math.random() - 0.5) * 32;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xfef08a,
      size: 0.28,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    worldGroup.add(particles);

    // 10. Raycasting for Building Hover & Click Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let mouseMoved = false;

    let mouseTargetX = 0;
    let mouseTargetY = 0;
    let mouseCurrentX = 0;
    let mouseCurrentY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Parallax target
      mouseTargetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTargetY = (e.clientY / window.innerHeight) * 2 - 1;
      mouseMoved = true;
    };

    const onPointerLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
      mouseTargetX = 0;
      mouseTargetY = 0;
      mouseMoved = true;
    };

    const onClick = () => {
      if (!interactive) return;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(worldGroup.children, true);

      if (intersects.length > 0) {
        let obj: THREE.Object3D | null = intersects[0].object;
        while (obj && obj !== worldGroup) {
          if (obj.userData?.locationName) {
            const locName = obj.userData.locationName as 'College' | 'Home' | 'Market' | 'Cafe' | 'Bank';
            if (onSelectLocation) onSelectLocation(locName);
            break;
          }
          obj = obj.parent;
        }
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousemove', onPointerMove, { passive: true });
    domElement.addEventListener('mouseleave', onPointerLeave, { passive: true });
    domElement.addEventListener('click', onClick);

    // Resize Handler with debounced layout guard
    let resizeTimer: number;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!container) return;
        const w = container.clientWidth || 800;
        const h = container.clientHeight || 500;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }, 80);
    };
    window.addEventListener('resize', onResize);

    // 11. Animation Loop with Dynamic Camera Framing & Visibility Throttling
    let animId: number | null = null;
    let isVisible = true;
    const clock = new THREE.Clock();
    let currentHovered: string | null = null;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Skip GPU render passes when element is offscreen or tab is backgrounded
      if (!isVisible) return;

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Subtle slow floating island drift
      worldGroup.position.y = Math.sin(time * 0.8) * 0.22;

      // Pulse the central fountain jet
      jet.scale.y = 1.0 + Math.sin(time * 3.0) * 0.2;

      // Smooth camera framing based on selectedLocation
      const activeLoc = selectedLocationRef.current;
      const targetConfig = activeLoc && TARGET_CAMERA_OFFSETS[activeLoc]
        ? TARGET_CAMERA_OFFSETS[activeLoc]
        : { pos: [initialCameraPos.x, initialCameraPos.y, initialCameraPos.z] as [number, number, number], lookAt: [0, 0.8, 0] as [number, number, number] };

      // Restrained camera parallax
      mouseCurrentX += (mouseTargetX - mouseCurrentX) * 0.04;
      mouseCurrentY += (mouseTargetY - mouseCurrentY) * 0.04;

      // Lerp camera position and lookAt toward target framing
      const desiredPosX = targetConfig.pos[0] + mouseCurrentX * 2.5;
      const desiredPosY = targetConfig.pos[1] + mouseCurrentY * 1.8;
      const desiredPosZ = targetConfig.pos[2];

      currentCameraPos.x += (desiredPosX - currentCameraPos.x) * 0.05;
      currentCameraPos.y += (desiredPosY - currentCameraPos.y) * 0.05;
      currentCameraPos.z += (desiredPosZ - currentCameraPos.z) * 0.05;

      currentLookAt.x += (targetConfig.lookAt[0] - currentLookAt.x) * 0.05;
      currentLookAt.y += (targetConfig.lookAt[1] - currentLookAt.y) * 0.05;
      currentLookAt.z += (targetConfig.lookAt[2] - currentLookAt.z) * 0.05;

      camera.position.copy(currentCameraPos);
      camera.lookAt(currentLookAt);

      // Particles float slowly upwards
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += delta * 0.45;
        if (positions[i] > 16) positions[i] = -2;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Only perform raycasting if pointer has moved across the canvas
      if (mouseMoved) {
        mouseMoved = false;
        let foundHover: string | null = null;
        if (mouse.x > -1.5 && mouse.x < 1.5 && mouse.y > -1.5 && mouse.y < 1.5) {
          raycaster.setFromCamera(mouse, camera);
          const intersects = raycaster.intersectObjects(worldGroup.children, true);
          if (intersects.length > 0) {
            let obj: THREE.Object3D | null = intersects[0].object;
            while (obj && obj !== worldGroup) {
              if (obj.userData?.locationName) {
                foundHover = obj.userData.locationName;
                break;
              }
              obj = obj.parent;
            }
          }
        }

        if (currentHovered !== foundHover) {
          currentHovered = foundHover;
          setHoveredBuilding(foundHover);
          domElement.style.cursor = foundHover ? 'pointer' : 'default';
        }
      }

      // Smooth elevation and emissive highlight for hovered/selected building
      interactiveBuildings.forEach((b) => {
        const isHovered = b.name === currentHovered;
        const isSelected = b.name === activeLoc;
        const targetElev = isHovered || isSelected ? b.baseY + 0.65 : b.baseY;

        b.group.position.y += (targetElev - b.group.position.y) * 0.15;

        // Dynamic light intensity
        const targetLightInt = isSelected ? 2.2 : isHovered ? 1.5 : 0.6;
        b.light.intensity += (targetLightInt - b.light.intensity) * 0.15;

        // Emissive material glow
        b.materials.forEach((mat) => {
          if (mat.emissive) {
            const targetGlow = isHovered || isSelected ? 1.3 : 0.4;
            mat.emissiveIntensity += (targetGlow - mat.emissiveIntensity) * 0.15;
          }
        });
      });

      renderer.render(scene, camera);
    };

    // Viewport Intersection & Tab Visibility Guard (High Performance Optimization)
    const observer = new IntersectionObserver(([entry]) => {
      const wasVisible = isVisible;
      isVisible = entry.isIntersecting && !document.hidden;
      if (isVisible && !wasVisible && animId === null) {
        animId = requestAnimationFrame(animate);
      } else if (!isVisible && animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    }, { threshold: 0.05 });
    observer.observe(container);

    const onVisibilityChange = () => {
      const wasVisible = isVisible;
      isVisible = !document.hidden;
      if (isVisible && !wasVisible && animId === null) {
        animId = requestAnimationFrame(animate);
      } else if (!isVisible && animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Initial loop start
    animId = requestAnimationFrame(animate);

    return () => {
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      observer.disconnect();
      domElement.removeEventListener('mousemove', onPointerMove);
      domElement.removeEventListener('mouseleave', onPointerLeave);
      domElement.removeEventListener('click', onClick);

      // Thoroughly dispose of all geometries, materials, and WebGL resources to avoid memory leaks
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        } else if (obj instanceof THREE.Points) {
          obj.geometry?.dispose();
          if (obj.material instanceof THREE.Material) {
            obj.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (domElement.parentElement) {
        domElement.parentElement.removeChild(domElement);
      }
    };
  }, [interactive, onSelectLocation]);

  if (!webglSupported) {
    return (
      <div
        role="region"
        aria-label="Interactive Moneyverse Island illustration fallback"
        className={`relative ${className} select-none overflow-hidden rounded-3xl group`}
      >
        <IsometricWorldIllustration
          interactive={interactive}
          onSelectLocation={onSelectLocation}
          selectedLocation={selectedLocation}
          showSpeechBubble={showSpeechBubble}
        />
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label="Interactive 3D Moneyverse Island diorama"
      className={`relative ${className} select-none overflow-hidden rounded-3xl group`}
    >
      <div ref={mountRef} className="w-full h-full" style={{ touchAction: 'pan-y' }} />

      {/* Speech Bubble Overlay Matching Screen 2 */}
      {showSpeechBubble && (
        <div className="absolute top-[20%] right-6 md:right-12 max-w-xs glass-panel-glow p-4 rounded-2xl border border-pink-400/40 shadow-2xl text-left pointer-events-none animate-float-gentle">
          <p className="text-xs md:text-sm text-slate-100 font-semibold leading-snug">
            Visit the college cafe and decide — <span className="text-pink-400 font-bold">coffee</span> or{' '}
            <span className="text-cyan-300 font-bold">budget food</span>?
          </p>
          <div className="absolute -bottom-2 left-6 w-3.5 h-3.5 bg-[#161d3a] border-r border-b border-pink-400/40 rotate-45" />
        </div>
      )}

      {/* Floating Interactive Badge Overlays */}
      {interactive && (
        <div
          role="toolbar"
          aria-label="Location focus navigation"
          className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-1.5 sm:gap-2 pointer-events-none flex-wrap"
        >
          {(['College', 'Home', 'Market', 'Cafe', 'Bank'] as const).map((loc) => {
            const isActive = selectedLocation === loc || hoveredBuilding === loc;
            return (
              <button
                key={loc}
                onClick={() => onSelectLocation && onSelectLocation(loc)}
                aria-label={`Inspect ${loc} landmark`}
                aria-pressed={isActive}
                className={`pointer-events-auto px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-pink-400 focus-visible:outline-offset-2 ${
                  isActive
                    ? 'btn-glow-pink text-white shadow-lg scale-105'
                    : 'glass-pill text-slate-300 hover:text-white hover:border-pink-400/40'
                }`}
              >
                {loc}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
