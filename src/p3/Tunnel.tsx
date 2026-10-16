import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { reduceMotion } from '../shared/motion'

/**
 * ALLORA's ring as a tunnel of time.
 * Ring 0 is the logo (red to deep red to dark by angle). Deeper rings move from
 * red (emitted) to bone white (compensated). Scroll flies the camera through.
 * `progressRef` 0..1 is driven from outside by ScrollTrigger.
 */
export type TunnelState = { progress: number; visible: number }

const RED = new THREE.Color('#ff2a1f')
const DEEP = new THREE.Color('#7a0f0c')
const DARK = new THREE.Color('#2a1a18')
const BONE = new THREE.Color('#f1ebe3')

export function Tunnel({ stateRef }: { stateRef: React.MutableRefObject<TunnelState> }) {
  const mount = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mount.current!
    const reduce = reduceMotion()
    const mobile = window.matchMedia('(max-width: 760px)').matches
    const RINGS = mobile ? 30 : 44
    const PER = mobile ? 72 : 96
    const GAP = 2.4
    const R = 3

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 1.75))
    renderer.setClearColor(0x000000, 1)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x000000, 0.085)
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200)

    const geo = new THREE.CapsuleGeometry(0.034, 0.42, 4, 8)
    const mat = new THREE.MeshBasicMaterial({ toneMapped: false })
    const mesh = new THREE.InstancedMesh(geo, mat, RINGS * PER)
    const dummy = new THREE.Object3D()
    const color = new THREE.Color()
    const base: { a: number; z: number; r: number; k: number; len: number }[] = []

    for (let k = 0; k < RINGS; k++) {
      const z = -k * GAP
      const twist = k * 0.11
      for (let i = 0; i < PER; i++) {
        const f = i / PER
        const a = -Math.PI * 0.72 + f * Math.PI * 2 + (k === 0 ? 0 : twist)
        const len = k === 0 ? (i % 6 === 0 ? 1.35 : 1) : 0.8 + 0.5 * Math.abs(Math.sin(i * 1.7 + k))
        base.push({ a, z, r: R * (k === 0 ? 1 : 1 + 0.04 * Math.sin(k * 0.9)), k, len })
        if (k === 0) {
          // the logo: red through deep red to dark, clockwise
          if (f < 0.5) color.copy(RED).lerp(DEEP, f / 0.5)
          else color.copy(DEEP).lerp(DARK, (f - 0.5) / 0.5)
        } else {
          const d = k / (RINGS - 1)
          // emitted (red) -> transition (deep) -> compensated (bone)
          if (d < 0.45) color.copy(RED)
          else if (d < 0.62) color.copy(RED).lerp(DEEP, (d - 0.45) / 0.17)
          else color.copy(DEEP).lerp(BONE, Math.min(1, (d - 0.62) / 0.2))
          // a few sparks keep the eye moving
          if ((i + k * 7) % 23 === 0) color.lerp(BONE, 0.5)
        }
        mesh.setColorAt(k * PER + i, color)
      }
    }
    scene.add(mesh)

    // dust: tiny points drifting inside the tunnel
    const dustGeo = new THREE.BufferGeometry()
    const DUST = mobile ? 500 : 1200
    const pos = new Float32Array(DUST * 3)
    for (let i = 0; i < DUST; i++) {
      const a = Math.random() * Math.PI * 2, r = Math.random() * R * 0.9
      pos[i * 3] = Math.cos(a) * r; pos[i * 3 + 1] = Math.sin(a) * r; pos[i * 3 + 2] = -Math.random() * RINGS * GAP
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0xf1ebe3, size: 0.018, transparent: true, opacity: 0.4 }))
    scene.add(dust)

    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.6, 0.35, 0.42)
    composer.addPass(bloom)
    composer.addPass(new OutputPass())

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight
      renderer.setSize(w, h, false)
      composer.setSize(w, h)
      camera.aspect = w / h
      // keep the hero ring a constant share of the short side
      camera.fov = w < h ? 68 : 50
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    const pointer = { x: 0, y: 0, sx: 0, sy: 0 }
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    if (!reduce) window.addEventListener('pointermove', onMove, { passive: true })

    const clock = new THREE.Clock()
    let raf = 0
    let smooth = 0
    const START_Z = 9.5
    const END_Z = -(RINGS - 3) * GAP

    const frame = () => {
      raf = requestAnimationFrame(frame)
      const st = stateRef.current
      const el2 = renderer.domElement
      el2.style.opacity = String(st.visible)
      if (st.visible <= 0.001) return
      const t = clock.getElapsedTime()
      const target = reduce ? 0 : st.progress
      smooth += (target - smooth) * 0.08
      pointer.sx += (pointer.x - pointer.sx) * 0.05
      pointer.sy += (pointer.y - pointer.sy) * 0.05

      // ease the dive so the logo ring holds for a beat before the plunge
      const p = smooth < 0.08 ? smooth * 0.4 : 0.032 + (smooth - 0.08) * (1 - 0.032) / 0.92
      camera.position.set(pointer.sx * 0.45, -pointer.sy * 0.3, THREE.MathUtils.lerp(START_Z, END_Z, p))
      camera.lookAt(pointer.sx * 0.2, -pointer.sy * 0.15, camera.position.z - 10)
      camera.rotation.z = reduce ? 0 : Math.sin(t * 0.15) * 0.04 + smooth * 0.9

      // ignite on load, breathe, and reach toward the camera as it passes
      const ignite = reduce ? 1 : Math.min(1, t / 2.2)
      for (let n = 0; n < base.length; n++) {
        const b = base[n]
        const ringOn = b.k === 0 ? Math.min(1, Math.max(0, ignite * 1.6 - (n / PER) * 0.6)) : Math.min(1, Math.max(0, ignite * 2 - 0.6 - b.k * 0.02))
        const dz = b.z - camera.position.z
        const near = Math.max(0, 1 - Math.abs(dz) / 6)
        const breathe = reduce ? 0 : Math.sin(t * 1.4 + b.a * 3 + b.k) * 0.04
        const spin = reduce ? 0 : t * (b.k % 2 ? 0.03 : -0.03) * (b.k === 0 ? 0.3 : 1)
        const a = b.a + spin
        const r = b.r * (1 + breathe + near * 0.12)
        dummy.position.set(Math.cos(a) * r, Math.sin(a) * r, b.z)
        dummy.rotation.set(0, 0, a - Math.PI / 2)
        const s = Math.max(0.0001, ringOn)
        dummy.scale.set(s, s * b.len * (1 + near * 0.6), s)
        dummy.updateMatrix()
        mesh.setMatrixAt(n, dummy.matrix)
      }
      mesh.instanceMatrix.needsUpdate = true
      dust.rotation.z = t * 0.02
      composer.render()
    }
    frame()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      composer.dispose(); renderer.dispose(); geo.dispose(); mat.dispose(); dustGeo.dispose()
      el.removeChild(renderer.domElement)
    }
  }, [stateRef])

  return <div ref={mount} className="tunnel" aria-hidden="true" />
}
