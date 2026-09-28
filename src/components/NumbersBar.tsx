import React from 'react'
import { motion } from 'framer-motion'
import { StaggerContainer, staggerItem, AnimatedCounter } from './animations'

export interface StatItem {
  target: number
  suffix?: string
  decimals?: number
  label: string
  highlight: string
}

const statsData: StatItem[] = [
  { target: 2000, suffix: '+', label: 'Alunos', highlight: 'Ativos no clube' },
  { target: 15, suffix: '+', label: 'Profissionais', highlight: 'Especializados' },
  { target: 40, suffix: '+', label: 'Equipamentos', highlight: 'Última geração' },
  { target: 4.9, decimals: 1, label: 'Avaliação', highlight: 'Em 1.200+ reviews' },
]

export const NumbersBar: React.FC = () => {
  return (
    <section
      id="faixa-numeros"
      className="relative w-full bg-[#050505]/60 backdrop-blur-[2px] border-y border-white/10 py-14 md:py-20 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 items-center"
        >
          {statsData.map((stat, idx) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="relative flex flex-col items-start md:items-center text-left md:text-center group"
            >
              <div className="flex items-baseline gap-1.5 mb-2">
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  duration={1.4}
                  className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white group-hover:text-white transition-colors"
                />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF00] shadow-[0_0_8px_#C6FF00] inline-block -translate-y-1" />
              </div>
              <span className="text-sm sm:text-base font-medium text-white/80 tracking-wide">
                {stat.label}
              </span>
              <span className="text-xs text-white/40 mt-0.5 font-normal">
                {stat.highlight}
              </span>

              {idx < statsData.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-white/10" />
              )}
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
