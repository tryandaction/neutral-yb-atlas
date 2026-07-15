import { useEffect, useRef } from 'react'
import {
  assignNearestTargets,
  createArrangementTargets,
  smootherstep,
  type ArrangementShape,
  type Point,
} from './atomicRearrangementModel'

interface AtomicRearrangementCanvasProps {
  shape: ArrangementShape
  reducedMotion: boolean
  description: string
}

interface MotionState {
  from: Point[]
  to: Point[]
  targetIndices: number[]
  startedAt: number
  duration: number
}

const ATOM_COUNT = 81
const MAX_PIXEL_RATIO = 2

function interpolate(from: Point, to: Point, progress: number): Point {
  return {
    x: from.x + (to.x - from.x) * progress,
    y: from.y + (to.y - from.y) * progress,
  }
}

function transitionDuration(from: Point[], to: Point[]) {
  let longestPath = 0
  for (let index = 0; index < from.length; index += 1) {
    longestPath = Math.max(longestPath, Math.hypot(to[index].x - from[index].x, to[index].y - from[index].y))
  }
  return Math.min(2200, Math.max(1050, longestPath * 4.3))
}

export default function AtomicRearrangementCanvas({
  shape,
  reducedMotion,
  description,
}: AtomicRearrangementCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shapeRef = useRef(shape)
  const reducedMotionRef = useRef(reducedMotion)
  const positionsRef = useRef<Point[]>([])
  const motionRef = useRef<MotionState | null>(null)

  useEffect(() => {
    shapeRef.current = shape
    reducedMotionRef.current = reducedMotion

    const canvas = canvasRef.current
    const bounds = canvas?.getBoundingClientRect()
    if (!canvas || !bounds || bounds.width === 0 || bounds.height === 0) return

    const viewport = { width: bounds.width, height: bounds.height, mobile: bounds.width < 760 }
    const targets = createArrangementTargets(shape, viewport)
    if (positionsRef.current.length !== ATOM_COUNT || reducedMotion) {
      positionsRef.current = targets
      motionRef.current = null
      return
    }

    const assignment = assignNearestTargets(positionsRef.current, targets)
    const assignedTargets = assignment.map((targetIndex) => targets[targetIndex])
    motionRef.current = {
      from: positionsRef.current.map((point) => ({ ...point })),
      to: assignedTargets,
      targetIndices: assignment,
      startedAt: performance.now(),
      duration: transitionDuration(positionsRef.current, assignedTargets),
    }
  }, [reducedMotion, shape])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || typeof ResizeObserver === 'undefined') return

    const context = canvas.getContext('2d')
    if (!context) return

    let frame = 0
    let width = 0
    let height = 0

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      width = bounds.width
      height = bounds.height
      if (width === 0 || height === 0) return

      const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO)
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      const targets = createArrangementTargets(shapeRef.current, {
        width,
        height,
        mobile: width < 760,
      })
      positionsRef.current = targets
      motionRef.current = null
    }

    const drawAtom = (point: Point, previous: Point, warm: boolean, moving: boolean) => {
      if (moving) {
        const trail = context.createLinearGradient(previous.x, previous.y, point.x, point.y)
        trail.addColorStop(0, 'rgba(151, 221, 198, 0)')
        trail.addColorStop(1, warm ? 'rgba(247, 177, 116, 0.32)' : 'rgba(151, 221, 198, 0.26)')
        context.beginPath()
        context.moveTo(previous.x, previous.y)
        context.lineTo(point.x, point.y)
        context.strokeStyle = trail
        context.lineWidth = 1.2
        context.stroke()
      }

      const halo = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, moving ? 11 : 8)
      halo.addColorStop(0, warm ? 'rgba(255, 211, 160, 0.55)' : 'rgba(197, 255, 234, 0.48)')
      halo.addColorStop(1, 'rgba(113, 216, 181, 0)')
      context.fillStyle = halo
      context.fillRect(point.x - 12, point.y - 12, 24, 24)

      context.beginPath()
      context.arc(point.x, point.y, warm ? 2.8 : 2.45, 0, Math.PI * 2)
      context.fillStyle = warm ? '#ffd39b' : '#d9fff2'
      context.shadowColor = warm ? '#ef965f' : '#77d9b9'
      context.shadowBlur = moving ? 8 : 5
      context.fill()
      context.shadowBlur = 0
    }

    const draw = (time: number) => {
      frame = requestAnimationFrame(draw)
      if (width === 0 || height === 0) return

      context.clearRect(0, 0, width, height)
      const motion = motionRef.current
      let progress = 1
      if (motion) progress = Math.min(1, (time - motion.startedAt) / motion.duration)
      const eased = reducedMotionRef.current ? 1 : smootherstep(progress)

      const targetSites = motion?.to ?? positionsRef.current
      for (const site of targetSites) {
        context.beginPath()
        context.arc(site.x, site.y, 1, 0, Math.PI * 2)
        context.fillStyle = 'rgba(191, 242, 224, 0.13)'
        context.fill()
      }

      if (motion) {
        positionsRef.current = motion.from.map((point, index) => interpolate(point, motion.to[index], eased))
      }

      for (let index = 0; index < positionsRef.current.length; index += 1) {
        const point = positionsRef.current[index]
        const previous = motion ? interpolate(motion.from[index], motion.to[index], smootherstep(Math.max(0, progress - 0.035))) : point
        const targetIndex = motion?.targetIndices[index] ?? index
        const warm = shapeRef.current === 'pairs' && targetIndex % 9 % 2 === 1
        drawAtom(point, previous, warm, Boolean(motion && progress < 1))
      }

      if (motion && progress >= 1) motionRef.current = null
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    resize()
    frame = requestAnimationFrame(draw)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="atomic-cover__canvas"
      role="img"
      aria-label={description}
      data-arrangement={shape}
    />
  )
}
