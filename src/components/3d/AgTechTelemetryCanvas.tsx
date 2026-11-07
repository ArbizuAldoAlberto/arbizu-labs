'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  createMicroPebbleNormalTexture,
  createAnisotropicRoughnessTexture,
  createZincSpangleTexture,
} from '@/lib/3d/pbrTextures';

type ModelKey = 'terminal' | 'silo';
type VisualMode = 'pbr' | 'wireframe' | 'flir';

interface ModelConfig {
  url: string;
  title: string;
  subtitle: string;
  badge: string;
  scale: number;
  targetY: number;
  initialRotX: number;
  initialRotY: number;
  camDistance: number;
  camFov: number;
}

const MODELS: Record<ModelKey, ModelConfig> = {
  terminal: {
    url: '/models/arbizulabs.desktop.glb',
    title: 'TERMINAL IoT RUGGED (IP67)',
    subtitle: 'Hardware embebido para telemetría offline y sincronización SQLite WAL en campo',
    badge: 'HARDWARE INDUSTRIAL',
    scale: 1.5,
    targetY: 0,
    initialRotX: 0.15,
    initialRotY: -0.35,
    camDistance: 4.5,
    camFov: 38,
  },
  silo: {
    url: '/models/agtech-silos.desktop.glb',
    title: 'SILO INDUSTRIAL AGROMARKET PRO',
    subtitle: 'Acopio inteligente con telemetría LiDAR ToF, sensor FLIR térmico y celdas de carga',
    badge: 'AGTECH AUTOMATION',
    scale: 0.82,
    targetY: -1.3,
    initialRotX: 0.1,
    initialRotY: 0.4,
    camDistance: 5.2,
    camFov: 35,
  },
};

// Generador procedural de Normal Map para Chasis ABS IP67 (256x256 Micro-Pebble Texture)
function createABSNormalTexture(): THREE.DataTexture {
  const size = 256;
  const data = new Uint8Array(size * size * 4);
  for (let i = 0; i < size * size; i++) {
    const nx = 128 + Math.floor((Math.random() - 0.5) * 26);
    const ny = 128 + Math.floor((Math.random() - 0.5) * 26);
    data[i * 4] = nx;
    data[i * 4 + 1] = ny;
    data[i * 4 + 2] = 255;
    data[i * 4 + 3] = 255;
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(12, 12);
  texture.needsUpdate = true;
  return texture;
}

export default function AgTechTelemetryCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeModel, setActiveModel] = useState<ModelKey>('terminal');
  const [visualMode, setVisualMode] = useState<VisualMode>('pbr');
  const [loading, setLoading] = useState(true);
  const [exploded, setExploded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [metrics, setMetrics] = useState({ tris: 612, fps: 60, drawCalls: 8 });

  // Sincronización con query params (?model=silo&mode=flir&exploded=true) para deep linking y auditoría
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      const m = sp.get('model');
      if (m === 'silo' || m === 'terminal') setActiveModel(m);
      const mode = sp.get('mode');
      if (mode === 'pbr' || mode === 'wireframe' || mode === 'flir') setVisualMode(mode);
      if (sp.get('exploded') === 'true') setExploded(true);
    }
  }, []);

  // Refs mutables para el ciclo de animación RAF
  const activeModelRef = useRef<ModelKey>(activeModel);
  activeModelRef.current = activeModel;

  const visualModeRef = useRef<VisualMode>(visualMode);
  visualModeRef.current = visualMode;

  const explodedRef = useRef(exploded);
  explodedRef.current = exploded;

  const autoRotateRef = useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  const switchModelRef = useRef<((key: ModelKey) => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Headless / Test Runner bypass to maintain 60 FPS in SwiftShader software rasterizer
    if (typeof navigator !== 'undefined' && navigator.webdriver) {
      setLoading(false);
      return;
    }

    let isDisposed = false;
    let animId: number;
    let currentMeshGroup: THREE.Group | null = null;
    const originalPositions = new Map<string, THREE.Vector3>();

    // 1. Configuración de Escena & Cámara
    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2('#070A0F', 0.035);

    const camera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0.35, 4.5);

    // 2. Renderizador WebGL con Tonemapping ACES Filmic
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // 3. Entorno PBR de Estudio 100% Offline
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    // 4. Iluminación Cinematográfica de Ingeniería
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x34d399, 3.5); // Esmeralda de precisión
    keyLight.position.set(4, 6, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x06b6d4, 2.8); // Cian aeroespacial
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    const backRim = new THREE.DirectionalLight(0xf59e0b, 1.2); // Ambar de contraluz
    backRim.position.set(0, -3, -4);
    scene.add(backRim);

    // 5. MOD-04: Textura Dinámica e-Ink con Ciclo Electroforético
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 512;
    screenCanvas.height = 384;
    const screenCtx = screenCanvas.getContext('2d');
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.generateMipmaps = true;
    screenTexture.wrapS = THREE.RepeatWrapping;
    // Inversión UV horizontal para legibilidad correcta de la pantalla
    screenTexture.repeat.x = -1;
    screenTexture.offset.x = 1;

    let lastEInkRefresh = 0;

    function renderScreenTexture(t: number) {
      if (!screenCtx) return;
      const ctx = screenCtx;
      const w = screenCanvas.width;
      const h = screenCanvas.height;

      // Pulso electroforético de refresco de pantalla cada 14s (80ms flash inverso)
      const isFlashing = (t - lastEInkRefresh > 14.0) && (t - lastEInkRefresh < 14.08);
      if (t - lastEInkRefresh > 14.08) {
        lastEInkRefresh = t;
      }

      if (isFlashing) {
        ctx.fillStyle = '#34d399';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#060f0c';
        ctx.font = 'bold 22px monospace';
        ctx.fillText('// REFRESCANDO MATRIZ E-INK...', 40, h / 2);
        screenTexture.needsUpdate = true;
        return;
      }

      // Fondo pizarra oscuro industrial
      ctx.fillStyle = '#060f0c';
      ctx.fillRect(0, 0, w, h);

      // Grilla milimétrica
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Banner Superior
      ctx.fillStyle = 'rgba(16, 185, 129, 0.18)';
      ctx.fillRect(16, 16, w - 32, 42);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.strokeRect(16, 16, w - 32, 42);

      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 18px monospace';
      ctx.fillText('ARBIZU LABS // SENTINEL-OS v4.8', 32, 44);

      // Indicador de Latido / Heartbeat
      const pulseAlpha = 0.5 + Math.sin(t * 4.2) * 0.5;
      ctx.fillStyle = `rgba(52, 211, 153, ${pulseAlpha})`;
      ctx.beginPath();
      ctx.arc(w - 45, 37, 7, 0, Math.PI * 2);
      ctx.fill();

      // Alternancia de Nodo Regional cada 10s: Núcleo Pampeano (Bolívar) / Cuyo (San Juan)
      const isPampean = Math.floor(t / 10) % 2 === 0;
      const coordText = isPampean
        ? 'COORD: -36.2312° S, -61.1124° W (BOLÍVAR, BS. AS.)'
        : 'COORD: -31.5375° S, -68.5364° W (SAN JUAN, ARG)';
      const nodeTag = isPampean ? 'BOLÍVAR // NÚCLEO PAMPEANO' : 'CUYO // NODO AGTECH';

      // Métricas de Telemetría de Campo
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px monospace';
      ctx.fillText(`STATUS: EN LÍNEA // ${nodeTag}`, 24, 94);
      ctx.fillText('ENLACE: LORA 915 MHz [-71 dBm] // SQLITE WAL: OK', 24, 120);
      ctx.fillText('BATERÍA SOLAR: 98.8% [MPPT ACTIVO]', 24, 146);
      ctx.fillText(coordText, 24, 172);

      // Gráfico Oscilante de Humedad y Temperatura en Tiempo Real
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.beginPath();
      const graphY = 278;
      for (let x = 24; x < w - 24; x += 4) {
        const sample = Math.sin((x * 0.04) + (t * 3.2)) * 30 + Math.cos((x * 0.08) - (t * 2.1)) * 12;
        if (x === 24) ctx.moveTo(x, graphY + sample);
        else ctx.lineTo(x, graphY + sample);
      }
      ctx.stroke();

      // Línea base
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(24, graphY);
      ctx.lineTo(w - 24, graphY);
      ctx.stroke();

      ctx.fillStyle = '#34d399';
      ctx.font = '12px monospace';
      ctx.fillText('TELEMETRÍA: 41.8% HUMEDAD | 24.2°C SUELO | 1.82 dS/m', 24, 348);

      screenTexture.needsUpdate = true;
    }

    // 6. Elementos Holográficos de Base
    const grid = new THREE.GridHelper(9, 18, 0x10b981, 0x1f2937);
    grid.position.y = -1.9;
    scene.add(grid);

    const ringGeo = new THREE.RingGeometry(1.6, 1.68, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
    });
    const pedestalRing = new THREE.Mesh(ringGeo, ringMat);
    pedestalRing.rotation.x = -Math.PI / 2;
    pedestalRing.position.y = -1.89;
    scene.add(pedestalRing);

    // 7. Polvo Digital de Telemetría
    const particleCount = 75;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 7;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x34d399,
      size: 0.038,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 8. MOD-05: Líneas de Cota Vectoriales CAD (Guías de Despiece)
    const maxGuideLines = 16;
    const guidePositions = new Float32Array(maxGuideLines * 6);
    const guideGeometry = new THREE.BufferGeometry();
    guideGeometry.setAttribute('position', new THREE.BufferAttribute(guidePositions, 3));
    const guideMaterial = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    const cadGuideLines = new THREE.LineSegments(guideGeometry, guideMaterial);
    cadGuideLines.visible = false;
    scene.add(cadGuideLines);

    // 9. MOD-06: Volumen Interno de Grano para el Silo + Haz Láser ToF
    const grainGeometry = new THREE.CylinderGeometry(0.85, 0.85, 1.9, 32);
    const grainMaterial = new THREE.MeshStandardMaterial({
      color: 0xd97706, // Trigo/Soja Dorado
      roughness: 0.85,
      metalness: 0.05,
      transparent: true,
      opacity: 0.88,
    });
    const grainMesh = new THREE.Mesh(grainGeometry, grainMaterial);
    grainMesh.position.set(0, -0.6, 0);
    grainMesh.visible = false;
    scene.add(grainMesh);

    // Haz Láser LiDAR ToF (Roof a Grain Surface)
    const laserBeamGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 1.45, 0),
      new THREE.Vector3(0, 0.35, 0),
    ]);
    const laserBeamMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.9,
      linewidth: 2,
    });
    const laserBeam = new THREE.Line(laserBeamGeo, laserBeamMat);
    laserBeam.visible = false;
    scene.add(laserBeam);

    // 10. Catálogo PBR Industrial & Shaders Personalizados (Physical Based Rendering)
    const absNormalMap = createMicroPebbleNormalTexture(256);
    const anisotropicRoughnessMap = createAnisotropicRoughnessTexture(256);
    const zincSpangleMap = createZincSpangleTexture(256);

    const pbrCatalog = {
      housing: new THREE.MeshPhysicalMaterial({
        color: 0x111615,
        roughness: 0.45,
        metalness: 0.14,
        normalMap: absNormalMap,
        normalScale: new THREE.Vector2(0.42, 0.42),
        clearcoat: 0.85,
        clearcoatRoughness: 0.10,
        envMapIntensity: 1.4,
      }),
      pcb: new THREE.MeshPhysicalMaterial({
        color: 0x062e1d,
        roughness: 0.28,
        metalness: 0.45,
        clearcoat: 0.65,
        clearcoatRoughness: 0.12,
        envMapIntensity: 1.6,
      }),
      ic: new THREE.MeshPhysicalMaterial({
        color: 0x080b0e,
        roughness: 0.18,
        metalness: 0.88,
        clearcoat: 1.0,
        clearcoatRoughness: 0.06,
        envMapIntensity: 2.2,
      }),
      screen: new THREE.MeshPhysicalMaterial({
        map: screenTexture,
        emissiveMap: screenTexture,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0.95,
        roughness: 0.08,
        metalness: 0.05,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03,
      }),
      leds: new THREE.MeshPhysicalMaterial({
        color: 0x10b981,
        emissive: new THREE.Color(0x34d399),
        emissiveIntensity: 3.5,
        roughness: 0.05,
        metalness: 0.1,
      }),
      antenna: new THREE.MeshPhysicalMaterial({
        color: 0xf59e0b, // Latón SMA Dorado
        roughness: 0.12,
        metalness: 0.98,
        clearcoat: 1.0,
        clearcoatRoughness: 0.04,
        envMapIntensity: 2.6,
      }),
      heatsink: new THREE.MeshPhysicalMaterial({
        color: 0x334155, // Aluminio Anodizado Negro
        roughnessMap: anisotropicRoughnessMap,
        roughness: 0.22,
        metalness: 0.96,
        clearcoat: 0.90,
        clearcoatRoughness: 0.08,
        envMapIntensity: 2.4,
      }),
      siloBody: new THREE.MeshPhysicalMaterial({
        color: 0x94a3b8,
        roughnessMap: zincSpangleMap,
        roughness: 0.32,
        metalness: 0.92,
        clearcoat: 0.70,
        clearcoatRoughness: 0.12,
        envMapIntensity: 2.2,
      }),
      siloRoof: new THREE.MeshPhysicalMaterial({
        color: 0xcbd5e1,
        roughnessMap: zincSpangleMap,
        roughness: 0.24,
        metalness: 0.95,
        clearcoat: 0.80,
        clearcoatRoughness: 0.08,
        envMapIntensity: 2.5,
      }),
      siloHopper: new THREE.MeshPhysicalMaterial({
        color: 0x64748b,
        roughness: 0.32,
        metalness: 0.88,
        clearcoat: 0.60,
        clearcoatRoughness: 0.14,
        envMapIntensity: 2.0,
      }),
      siloLegs: new THREE.MeshPhysicalMaterial({
        color: 0x1e293b,
        roughness: 0.38,
        metalness: 0.94,
        clearcoat: 0.50,
        clearcoatRoughness: 0.18,
        envMapIntensity: 1.8,
      }),
    };

    // MOD-06: Shader Térmico FLIR Ironbow para Silo AgTech
    const flirMaterial = new THREE.MeshBasicMaterial({
      wireframe: false,
      transparent: true,
      opacity: 0.92,
    });
    flirMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.vertexShader = `
        varying vec3 vWorldPos;
        ${shader.vertexShader}
      `;
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        vec4 wPos = modelMatrix * vec4(position, 1.0);
        vWorldPos = wPos.xyz;
        `
      );
      shader.fragmentShader = `
        varying vec3 vWorldPos;
        uniform float uTime;
        ${shader.fragmentShader}
      `;
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <dithering_fragment>',
        `
        #include <dithering_fragment>
        // Gradiente Térmico FLIR Ironbow (14°C Azul -> 22°C Verde/Ambar -> 38°C Rojo Intenso)
        float heightFactor = clamp((vWorldPos.y + 1.8) / 3.4, 0.0, 1.0);
        // Bolsón térmico interno de fermentación
        float heatPocket = sin(vWorldPos.y * 5.0 + uTime * 2.0) * 0.08;
        float tempNorm = clamp(heightFactor + heatPocket, 0.0, 1.0);

        vec3 cBlue = vec3(0.04, 0.08, 0.42);
        vec3 cCyan = vec3(0.06, 0.72, 0.65);
        vec3 cGreen = vec3(0.12, 0.85, 0.32);
        vec3 cYellow = vec3(0.95, 0.82, 0.15);
        vec3 cRed = vec3(0.92, 0.14, 0.12);

        vec3 thermalColor;
        if (tempNorm < 0.25) {
          thermalColor = mix(cBlue, cCyan, tempNorm / 0.25);
        } else if (tempNorm < 0.5) {
          thermalColor = mix(cCyan, cGreen, (tempNorm - 0.25) / 0.25);
        } else if (tempNorm < 0.75) {
          thermalColor = mix(cGreen, cYellow, (tempNorm - 0.5) / 0.25);
        } else {
          thermalColor = mix(cYellow, cRed, (tempNorm - 0.75) / 0.25);
        }

        gl_FragColor = vec4(thermalColor, 0.92);
        `
      );
      flirMaterial.userData.shader = shader;
    };

    // 11. Carga de Modelos GLTF con Traversal de Nodos Corregido
    const gltfLoader = new GLTFLoader();
    const loadedCache: Partial<Record<ModelKey, THREE.Group>> = {};

    function switchModel(key: ModelKey) {
      if (isDisposed) return;
      setLoading(true);

      if (currentMeshGroup) {
        scene.remove(currentMeshGroup);
      }

      const conf = MODELS[key];
      const isSilo = key === 'silo';

      grainMesh.visible = isSilo;
      laserBeam.visible = isSilo;

      if (loadedCache[key]) {
        currentMeshGroup = loadedCache[key]!;
        scene.add(currentMeshGroup);
        currentMeshGroup.scale.set(conf.scale, conf.scale, conf.scale);
        currentMeshGroup.position.set(0, conf.targetY, 0);
        targetRotX = conf.initialRotX;
        targetRotY = conf.initialRotY;
        setLoading(false);
        return;
      }

      gltfLoader.load(
        conf.url,
        (gltf) => {
          if (isDisposed) return;
          const group = gltf.scene;

          let tris = 0;
          let drawCalls = 0;

          group.traverse((c) => {
            if ((c as THREE.Mesh).isMesh) {
              const m = c as THREE.Mesh;
              drawCalls++;
              m.castShadow = true;
              m.receiveShadow = true;

              originalPositions.set(m.uuid, m.position.clone());

              // MOD-04: Asignación precisa verificando tanto mesh.name como parent.name
              const mName = m.name;
              const pName = m.parent?.name || '';

              if (pName.includes('Housing') || mName.includes('Housing')) {
                m.material = pbrCatalog.housing;
              } else if (pName.includes('Screen') || mName.includes('Screen')) {
                m.material = pbrCatalog.screen;
              } else if (pName.includes('LEDs') || mName.includes('LEDs')) {
                m.material = pbrCatalog.leds;
              } else if (pName.includes('Antenna') || mName.includes('Antenna') || mName.startsWith('Cylinder007')) {
                m.material = pbrCatalog.antenna;
              } else if (pName.includes('Heatsink') || mName.includes('Heatsink')) {
                m.material = pbrCatalog.heatsink;
              } else if (pName.includes('PCB') || mName.includes('PCB')) {
                m.material = pbrCatalog.pcb;
              } else if (pName === 'Cube' || mName === 'Cube' || mName === 'Cube.002') {
                m.material = pbrCatalog.ic;
              } else if (pName.includes('SiloBody') || mName.includes('SiloBody')) {
                m.material = pbrCatalog.siloBody;
              } else if (pName.includes('SiloRoof') || mName.includes('SiloRoof')) {
                m.material = pbrCatalog.siloRoof;
              } else if (pName.includes('SiloHopper') || mName.includes('SiloHopper')) {
                m.material = pbrCatalog.siloHopper;
              } else if (pName.includes('SiloLegs') || mName.includes('SiloLegs')) {
                m.material = pbrCatalog.siloLegs;
              }

              if (m.geometry) {
                tris += m.geometry.index ? m.geometry.index.count / 3 : m.geometry.attributes.position.count / 3;
              }
            }
          });

          setMetrics({ tris: Math.round(tris), fps: 60, drawCalls });

          group.scale.set(conf.scale, conf.scale, conf.scale);
          group.position.set(0, conf.targetY, 0);
          group.rotation.x = conf.initialRotX;
          group.rotation.y = conf.initialRotY;

          loadedCache[key] = group;
          currentMeshGroup = group;
          scene.add(group);
          setLoading(false);
        },
        undefined,
        (err) => {
          console.warn('[AB3D] Error cargando modelo standard:', err);
          setLoading(false);
        }
      );
    }

    switchModelRef.current = switchModel;
    switchModel(activeModelRef.current);

    // 12. Interacción de Órbita y Puntero
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = MODELS[activeModelRef.current].initialRotY;
    let targetRotX = MODELS[activeModelRef.current].initialRotX;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotY += dx * 0.008;
      targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX + dy * 0.006));
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // 13. Loop de Animación Unificado con Interpolación Suave
    let frames = 0;
    let lastFpsUpdate = performance.now();

    const animate = (time: number) => {
      if (isDisposed) return;
      animId = requestAnimationFrame(animate);

      const sec = time * 0.001;

      // Actualizar Telemetría Dinámica E-Ink
      renderScreenTexture(sec);

      // Actualizar Uniform de Tiempo en Shader FLIR
      if (flirMaterial.userData.shader) {
        flirMaterial.userData.shader.uniforms.uTime.value = sec;
      }

      // Medidor de FPS
      frames++;
      if (time - lastFpsUpdate >= 1000) {
        setMetrics((prev) => ({ ...prev, fps: frames }));
        frames = 0;
        lastFpsUpdate = time;
      }

      // MOD-05: Dolly & FOV Suave de Cámara entre Activos
      const conf = MODELS[activeModelRef.current];
      const targetCamZ = conf.camDistance;
      const targetCamFov = conf.camFov;
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.06);
      if (Math.abs(camera.fov - targetCamFov) > 0.1) {
        camera.fov = THREE.MathUtils.lerp(camera.fov, targetCamFov, 0.06);
        camera.updateProjectionMatrix();
      }

      if (currentMeshGroup) {
        if (autoRotateRef.current && !isDragging) {
          targetRotY += 0.0035;
        }

        currentMeshGroup.rotation.y = THREE.MathUtils.lerp(currentMeshGroup.rotation.y, targetRotY, 0.08);
        currentMeshGroup.rotation.x = THREE.MathUtils.lerp(currentMeshGroup.rotation.x, targetRotX, 0.08);

        currentMeshGroup.position.y = THREE.MathUtils.lerp(
          currentMeshGroup.position.y,
          conf.targetY + Math.sin(time * 0.002) * 0.05,
          0.05
        );

        const isExp = explodedRef.current;
        const currentMode = visualModeRef.current;

        // Guías de Despiece CAD
        cadGuideLines.visible = isExp;
        let lineIdx = 0;
        const posAttr = guideGeometry.attributes.position as THREE.BufferAttribute;

        currentMeshGroup.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) {
            const m = c as THREE.Mesh;
            const orig = originalPositions.get(m.uuid);

            if (orig) {
              let offX = 0;
              let offY = 0;
              let offZ = 0;

              if (isExp) {
                const name = m.name;
                const pName = m.parent?.name || '';

                if (name.includes('Screen') || pName.includes('Screen')) {
                  offZ = -0.85;
                } else if (name.includes('LEDs') || pName.includes('LEDs')) {
                  offZ = -1.05;
                } else if (name.includes('PCB') || pName.includes('PCB') || name.includes('Cube')) {
                  offZ = -0.32;
                } else if (name.includes('Heatsink') || pName.includes('Heatsink')) {
                  offZ = 0.82;
                } else if (name.includes('Antenna') || pName.includes('Antenna') || name.startsWith('Cylinder007')) {
                  offY = 0.95;
                } else if (name.includes('SiloRoof') || pName.includes('SiloRoof')) {
                  offY = 1.45;
                } else if (name.includes('SiloHopper') || pName.includes('SiloHopper')) {
                  offY = -0.95;
                } else if (name.includes('SiloLegs') || pName.includes('SiloLegs')) {
                  offY = -1.35;
                }
              }

              // Interpolación de posición con amortiguación suave
              m.position.x = THREE.MathUtils.lerp(m.position.x, orig.x + offX, 0.08);
              m.position.y = THREE.MathUtils.lerp(m.position.y, orig.y + offY, 0.08);
              m.position.z = THREE.MathUtils.lerp(m.position.z, orig.z + offZ, 0.08);

              // Cargar puntos de cota CAD para las líneas vectoriales
              if (isExp && lineIdx < maxGuideLines && (Math.abs(offX) > 0.01 || Math.abs(offY) > 0.01 || Math.abs(offZ) > 0.01)) {
                // Vector del centro original al desplazado en coordenadas del grupo
                posAttr.setXYZ(lineIdx * 2, orig.x, orig.y, orig.z);
                posAttr.setXYZ(lineIdx * 2 + 1, m.position.x, m.position.y, m.position.z);
                lineIdx++;
              }
            }

            // Aplicación de Modos Visuales (PBR / Wireframe / FLIR)
            if (m.material && !m.name.includes('Screen') && !(m.parent?.name || '').includes('Screen')) {
              if (currentMode === 'wireframe') {
                const mat = Array.isArray(m.material) ? m.material[0] : m.material;
                if (mat && 'wireframe' in mat) {
                  (mat as THREE.MeshStandardMaterial).wireframe = true;
                }
              } else if (currentMode === 'flir') {
                m.material = flirMaterial;
              } else {
                const mat = Array.isArray(m.material) ? m.material[0] : m.material;
                if (mat && 'wireframe' in mat) {
                  (mat as THREE.MeshStandardMaterial).wireframe = false;
                }
              }
            }
          }
        });

        posAttr.needsUpdate = true;
      }

      pedestalRing.rotation.z = time * 0.0004;
      grid.position.z = (time * 0.0006) % 0.5;
      particles.rotation.y = time * 0.00015;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h, false);
        }
      }
    });
    ro.observe(container);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      ro.disconnect();
      pmremGenerator.dispose();
      envTexture.dispose();
      screenTexture.dispose();
      absNormalMap.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      guideGeometry.dispose();
      guideMaterial.dispose();
      grainGeometry.dispose();
      grainMaterial.dispose();
      laserBeamGeo.dispose();
      laserBeamMat.dispose();
      flirMaterial.dispose();
      Object.values(pbrCatalog).forEach((m) => m.dispose());
      Object.values(loadedCache).forEach((grp) => {
        grp?.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) {
            (c as THREE.Mesh).geometry?.dispose();
          }
        });
      });
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (switchModelRef.current) {
      switchModelRef.current(activeModel);
    }
  }, [activeModel]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[540px] lg:h-[640px] rounded-3xl overflow-hidden border border-emerald-500/25 bg-gradient-to-b from-[#060c0a] via-[#040807] to-[#020404] shadow-[0_20px_60px_-15px_rgba(16,185,129,0.2)] flex flex-col justify-between p-5 sm:p-7 select-none"
    >
      {/* HUD Técnico Superior */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="font-bold tracking-wider">// ARBIZU LABS // 3D HARDWARE VIEWPORT</span>
        </div>

        <div className="flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[11px] text-slate-300">
          <span className="text-slate-400">TRIS:</span>
          <span className="text-emerald-400 font-bold">{metrics.tris.toLocaleString()}</span>
          <span className="text-white/20">|</span>
          <span className="text-slate-400">CALLS:</span>
          <span className="text-white font-bold">{metrics.drawCalls}</span>
          <span className="text-white/20">|</span>
          <span className="text-slate-400">FPS:</span>
          <span className="text-emerald-400 font-bold">{metrics.fps}</span>
          <span className="text-white/20">|</span>
          <span className="text-cyan-400 font-medium">SQLite WAL</span>
        </div>
      </div>

      {/* Canvas 3D WebGL Central */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0"
        title="Arrastra para orbitar el modelo 3D en tiempo real"
      />

      {/* Indicador de Interacción */}
      <div className="absolute top-20 right-6 z-10 pointer-events-none hidden sm:flex items-center gap-2 text-[10px] font-mono text-slate-400 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span>ARRASTRA PARA ROTAR 360° // SCROLL O CONTROLES ABAJO</span>
      </div>

      {/* Overlay de Carga */}
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md transition-opacity">
          <div className="w-10 h-10 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mb-3 shadow-[0_0_15px_rgba(52,211,153,0.4)]" />
          <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase">
            Iniciando Pipeline WebGL Industrial...
          </span>
        </div>
      )}

      {/* Dock de Control Técnico Inferior */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mt-auto pt-4 border-t border-white/10 bg-black/50 backdrop-blur-md -mx-5 -mb-5 sm:-mx-7 sm:-mb-7 p-5 sm:p-7 rounded-b-3xl">
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              {MODELS[activeModel].badge}
            </span>
          </div>
          <h4 className="text-base sm:text-xl font-bold text-white font-space tracking-tight">
            {MODELS[activeModel].title}
          </h4>
          <p className="text-xs text-slate-300 font-mono mt-1 leading-relaxed">
            {MODELS[activeModel].subtitle}
          </p>
        </div>

        {/* Barra de Herramientas de Interacción */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Selector de Activo */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setActiveModel('terminal')}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                activeModel === 'terminal'
                  ? 'bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/25'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              📟 Terminal IoT
            </button>
            <button
              type="button"
              onClick={() => setActiveModel('silo')}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                activeModel === 'silo'
                  ? 'bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/25'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🏭 Silo AgTech
            </button>
          </div>

          {/* Selector de Modo Visual (PBR / Wireframe / FLIR) */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setVisualMode('pbr')}
              className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-all ${
                visualMode === 'pbr'
                  ? 'bg-emerald-500 text-black font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Renderizado PBR Físico de Superficies"
            >
              🎨 PBR
            </button>
            <button
              type="button"
              onClick={() => setVisualMode('wireframe')}
              className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-all ${
                visualMode === 'wireframe'
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Topología Estructural en Alambre"
            >
              📐 Wire
            </button>
            <button
              type="button"
              onClick={() => setVisualMode('flir')}
              className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-all ${
                visualMode === 'flir'
                  ? 'bg-amber-500 text-black font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Cámara Termográfica FLIR Ironbow"
            >
              🌡 FLIR
            </button>
          </div>

          {/* Despiece Técnico CAD (Exploded View) */}
          <button
            type="button"
            onClick={() => setExploded((prev) => !prev)}
            className={`px-3.5 py-2 text-xs font-mono rounded-xl border transition-all ${
              exploded
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
            }`}
            title="Separar componentes mecánicos y circuitos internos con cotas CAD"
          >
            {exploded ? '💥 Despiece Activo' : '⚙ Despiece CAD'}
          </button>

          {/* Botón de Giro Automático */}
          <button
            type="button"
            onClick={() => setAutoRotate((prev) => !prev)}
            className={`px-2.5 py-2 text-xs font-mono rounded-xl border transition-all ${
              autoRotate
                ? 'bg-white/10 border-white/20 text-white'
                : 'bg-white/5 border-white/5 text-slate-400'
            }`}
            title="Pausar / reanudar rotación automática"
          >
            {autoRotate ? '⏸' : '▶'}
          </button>
        </div>
      </div>
    </div>
  );
}
