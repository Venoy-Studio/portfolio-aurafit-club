import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1] as const

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  x?: number
  scale?: number
  amount?: number
  once?: boolean
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  y = 35,
  x = 0,
  scale = 1,
  amount = 0.2,
  once = true,
}) => (
  <motion.div
    initial={{ opacity: 0, y, x, scale }}
    whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
    viewport={{ once, amount }}
    transition={{ duration, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
)

interface SplitHeadingLine {
  text: string
  className?: string
}

interface SplitHeadingProps {
  lines: SplitHeadingLine[]
  className?: string
  delay?: number
  lineDelay?: number
}

export const SplitHeading: React.FC<SplitHeadingProps> = ({
  lines,
  className = '',
  delay = 0.1,
  lineDelay = 0.1,
}) => (
  <div className={`overflow-hidden ${className}`}>
    {lines.map((line, index) => (
      <div key={index} className="overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: delay + index * lineDelay, ease: EASE }}
          className={line.className || ''}
        >
          {line.text}
        </motion.div>
      </div>
    ))}
  </div>
)

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  delayChildren?: number
  amount?: number
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.08,
  delayChildren = 0.1,
  amount = 0.2,
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: staggerDelay, delayChildren } },
    }}
    className={className}
  >
    {children}
  </motion.div>
)

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

interface AnimatedCounterProps {
  target: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  duration = 1.3,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}) => {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(target)
      return
    }

    let start: number | null = null
    let rafId: number
    const easeOutExpo = (x: number) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x))

    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / (duration * 1000), 1)
      const current = easeOutExpo(progress) * target
      setVal(current)

      if (progress < 1) {
        rafId = requestAnimationFrame(step)
      } else {
        setVal(target)
      }
    }

    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [inView, target, duration])

  const formatted =
    decimals > 0
      ? val.toFixed(decimals).replace('.', ',')
      : Math.floor(val).toLocaleString('pt-BR')

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
