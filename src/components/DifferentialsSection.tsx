import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { FadeIn, SplitHeading, StaggerContainer, staggerItem } from './animations'

export interface DifferentialCard {
  id: string
  title: string
  description: string
  tag: string
  image: string
  className: string
}

export const differentialCards: DifferentialCard[] = [
  {
    id: 'musculacao',
    title: 'Musculação completa',
    description: 'Aparelhos com biomecânica avançada para ativação muscular máxima e proteção articular.',
    tag: 'Área Principal',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80',
    className: 'col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[360px] lg:min-h-[460px]',
  },
  {
    id: 'cardio',
    title: 'Cardio',
    description: 'Esteiras inteligentes e simuladores com amortecimento dinâmico.',
    tag: 'Conectado',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80',
    className: 'col-span-1 md:col-span-1 lg:col-span-1 min-h-[220px]',
  },
  {
    id: 'personal',
    title: 'Personal trainer',
    description: 'Acompanhamento individual focado em correção postural e progressão de carga.',
    tag: '1-on-1',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=80',
    className: 'col-span-1 md:col-span-1 lg:col-span-1 min-h-[220px]',
  },
  {
    id: 'avaliacao',
    title: 'Avaliação física',
    description: 'Bioimpedância com relatórios detalhados de massa magra e visceral.',
    tag: 'Bioanálise',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    className: 'col-span-1 md:col-span-1 lg:col-span-1 min-h-[200px]',
  },
  {
    id: 'treinos',
    title: 'Treinos personalizados',
    description: 'Periodização digital e séries ajustadas ao seu ritmo biológico.',
    tag: 'App Aura',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    className: 'col-span-1 md:col-span-1 lg:col-span-1 min-h-[200px]',
  },
]

export const DifferentialsSection: React.FC = () => {
  return (
    <section
      id="diferenciais"
      className="relative w-full bg-[#050505]/50 backdrop-blur-[2px] py-24 md:py-32 lg:py-40 px-6 lg:px-10 border-t border-white/10"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <FadeIn delay={0.05} y={15}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF00]" />
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/70">
                  Diferenciais
                </span>
              </div>
            </FadeIn>
            <SplitHeading
              lines={[
                {
                  text: 'Tudo o que você precisa',
                  className: 'text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.035em] text-white',
                },
                {
                  text: 'para evoluir.',
                  className: 'text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.035em] text-[#C6FF00]',
                },
              ]}
            />
          </div>
          <FadeIn delay={0.2} y={20}>
            <p className="text-white/60 text-base max-w-md leading-relaxed">
              Metodologias integradas e infraestrutura desenhada para resultados mensuráveis, sem improvisos.
            </p>
          </FadeIn>
        </div>

        {/* Bento Grid */}
        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {differentialCards.map((card) => (
            <motion.div
              key={card.id}
              variants={staggerItem}
              className={`group relative rounded-3xl overflow-hidden border border-white/10 bg-[#0d0d0d] flex flex-col justify-end p-6 sm:p-8 transition-all duration-500 ease-out hover:border-white/30 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)] ${card.className}`}
            >
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 group-hover:from-black/85 group-hover:via-black/45 group-hover:to-transparent transition-colors duration-500 ease-out" />

              <div className="relative z-10 flex flex-col transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#C6FF00] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    {card.tag}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:bg-[#C6FF00] group-hover:text-black transition-all duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/65 leading-relaxed font-normal line-clamp-2">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
