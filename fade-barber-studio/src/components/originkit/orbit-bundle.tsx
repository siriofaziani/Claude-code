// Originkit: Orbit Bundle (https://originkit.dev) - codice del componente; rimosse solo le costanti inutilizzate.
"use client"

import * as React from "react"
import { useEffect, useLayoutEffect, useRef } from "react"

type Props = {
    background?: string
    lineColor?: string
    rings?: number
    size?: number
    speed?: number
    spread?: number
    textColor?: string
    dragSensitivity?: number
    style?: React.CSSProperties
}

const STAGE_W = 1100
const STAGE_H = 800
const AXIS_DEG = 24.7
const R_OUTER = 343
const R_INNER = 284
const C_OUTER = { x: 546, y: 384 }
const C_INNER = { x: 565, y: 355 }

const DEG_PER_SEC_AT_50 = 18

const HOVER_SPEED_MULT = 1.8

const DRAG_DEG_PER_PX = 0.6

const LINE_WIDTH = 1
const INTRO_RING_DELAY = 0.1
const INTRO_RING_STAGGER = 0.035
const INTRO_RING_DUR = 0.5

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
const easeOut = (v: number) => 1 - Math.pow(1 - v, 3)

function ringGeom(i: number, n: number) {
    const t = n > 1 ? i / (n - 1) : 0
    return {
        t,
        r: R_OUTER + (R_INNER - R_OUTER) * t,
        cx: C_OUTER.x + (C_INNER.x - C_OUTER.x) * t,
        cy: C_OUTER.y + (C_INNER.y - C_OUTER.y) * t,
    }
}

export default function DemandOrbit(props: Props) {
    const {
        background = "#000000",
        lineColor = "#FFFFFF",
        rings = 24,
        size = 74,
        speed = 50,
        spread = 68,
        dragSensitivity = 50,
        style,
    } = props

    const n = Math.max(1, Math.round(rings))

    const rootRef = useRef<HTMLDivElement>(null)
    const stageRef = useRef<HTMLDivElement>(null)
    const ringEls = useRef<(SVGEllipseElement | null)[]>([])
    ringEls.current.length = n

    const live = useRef({ speed, spread, n, dragSensitivity })
    live.current = { speed, spread, n, dragSensitivity }

    const spinRef = useRef(0)
    const hoverRef = useRef(false)
    const dragRef = useRef({ active: false, startX: 0, startSpin: 0 })

    useLayoutEffect(() => {
        const root = rootRef.current
        const stage = stageRef.current
        if (!root || !stage) return
        const fit = () => {
            const w = root.offsetWidth
            const h = root.offsetHeight
            if (!w || !h) return
            const s = Math.min(w / STAGE_W, h / STAGE_H)
            stage.style.transform = `translate(-50%, -50%) scale(${s})`
        }
        fit()
        const ro = new ResizeObserver(fit)
        ro.observe(root)
        return () => ro.disconnect()
    }, [])

    useLayoutEffect(() => {
        for (const el of ringEls.current) el?.setAttribute("stroke-opacity", "0")
    }, [])

    useEffect(() => {
        const root = rootRef.current
        if (!root) return
        const onEnter = () => {
            hoverRef.current = true
        }
        const onLeave = () => {
            hoverRef.current = false
        }
        const onDown = (e: PointerEvent) => {
            dragRef.current = { active: true, startX: e.clientX, startSpin: spinRef.current }
        }
        const onMove = (e: PointerEvent) => {
            if (!dragRef.current.active) return
            const { dragSensitivity: ds } = live.current
            const degPerPx = (ds / 100) * DRAG_DEG_PER_PX
            spinRef.current =
                (dragRef.current.startSpin + (e.clientX - dragRef.current.startX) * degPerPx) % 360
        }
        const onUp = () => {
            dragRef.current.active = false
        }
        root.addEventListener("pointerenter", onEnter)
        root.addEventListener("pointerleave", onLeave)
        root.addEventListener("pointerdown", onDown)
        window.addEventListener("pointermove", onMove)
        window.addEventListener("pointerup", onUp)
        window.addEventListener("pointercancel", onUp)
        return () => {
            root.removeEventListener("pointerenter", onEnter)
            root.removeEventListener("pointerleave", onLeave)
            root.removeEventListener("pointerdown", onDown)
            window.removeEventListener("pointermove", onMove)
            window.removeEventListener("pointerup", onUp)
            window.removeEventListener("pointercancel", onUp)
        }
    }, [])

    useEffect(() => {
        let raf = 0
        let start = -1
        let last = -1
        let introDone = false

        const frame = (now: number) => {
            raf = requestAnimationFrame(frame)
            if (start < 0) start = last = now
            const dt = Math.min(0.1, Math.max(0, (now - last) / 1000))
            last = now
            const el = (now - start) / 1000
            const { speed: sp, spread: spr, n: count } = live.current

            if (!dragRef.current.active) {
                const mult = hoverRef.current ? HOVER_SPEED_MULT : 1
                spinRef.current = (spinRef.current + (sp / 50) * DEG_PER_SEC_AT_50 * mult * dt) % 360
            }
            const spin = spinRef.current

            const els = ringEls.current
            for (let i = 0; i < count; i++) {
                const node = els[i]
                if (!node) continue
                const { t, r } = ringGeom(i, count)
                const phi = ((spin + spr * t) * Math.PI) / 180
                node.setAttribute("rx", (r * Math.abs(Math.cos(phi))).toFixed(2))
                if (!introDone) {
                    const k = clamp01(
                        (el - INTRO_RING_DELAY - i * INTRO_RING_STAGGER) /
                            INTRO_RING_DUR
                    )
                    node.setAttribute("stroke-opacity", easeOut(k).toFixed(3))
                }
            }

            if (!introDone) {
                const ringsEnd =
                    INTRO_RING_DELAY + count * INTRO_RING_STAGGER + INTRO_RING_DUR
                if (el > ringsEnd) {
                    introDone = true
                    for (const node of els) node?.setAttribute("stroke-opacity", "1")
                }
            }
        }
        raf = requestAnimationFrame(frame)
        return () => cancelAnimationFrame(raf)
    }, [])

    const ellipses = []
    for (let i = 0; i < n; i++) {
        const { t, r, cx, cy } = ringGeom(i, n)
        const rx = +(r * Math.abs(Math.cos((spread * t * Math.PI) / 180))).toFixed(2)
        ellipses.push(
            <ellipse
                key={i}
                ref={(node) => {
                    ringEls.current[i] = node
                }}
                cx={cx}
                cy={cy}
                rx={rx}
                ry={r}
                transform={`rotate(${AXIS_DEG} ${cx} ${cy})`}
                fill="none"
                stroke={lineColor}
                strokeWidth={LINE_WIDTH}
                vectorEffect="non-scaling-stroke"
            />
        )
    }

    return (
        <div
            ref={rootRef}
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                minWidth: 1200,
                minHeight: 800,
                ...style,
                background,
                overflow: "hidden",
            }}
        >
            <div
                ref={stageRef}
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: STAGE_W,
                    height: STAGE_H,
                    transform: "translate(-50%, -50%)",
                    transformOrigin: "50% 50%",
                }}
            >
                <svg
                    width={STAGE_W}
                    height={STAGE_H}
                    viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
                    style={{ position: "absolute", inset: 0, overflow: "visible" }}
                    aria-hidden="true"
                >
                    <g
                        transform={`translate(${C_OUTER.x} ${C_OUTER.y}) scale(${
                            size / 100
                        }) translate(${-C_OUTER.x} ${-C_OUTER.y})`}
                    >
                        {ellipses}
                    </g>
                </svg>
            </div>
        </div>
    )
}
