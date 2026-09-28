import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react'
import { FadeIn, SplitHeading, StaggerContainer, staggerItem } from './animations'

export interface CaseStudy {
  id: string
  name: string
  time: string
  photo: string
  testimonial: string
  outcome: string
  metric: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    name: 'Juliana Mendes',
    time: 'Treina há 1 ano e 2 meses',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    testimonial: 'Eu nunca consegui ser consistente até entrar aqui. A atmosfera e as esteiras conectadas mudaram tudo.',
    outcome: 'Eliminou 14kg de gordura e concluiu sua primeira meia-maratona.',
    metric: '-14kg de gordura',
  },
  {
    id: '2',
    name: 'Rodrigo Lima',
    time: 'Treina há 9 meses',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    testimonial: 'Os aparelhos biomecânicos não agridem os ombros e a coluna. Ganhei massa magra sem dores.',
    outcome: 'Ganho expressivo de densidade muscular e fim das dores lombares.',
    metric: '+7.5kg massa magra',
  },
  {
    id: '3',
    name: 'Camila Ferraz',
    time: 'Treina há 2 anos',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
    testimonial: 'A organização, a limpeza e o silêncio focado no treino são raros de encontrar. Não troco por nada.',
    outcome: 'Aumento de 40% no VO2 max e condicionamento cardiovascular pleno.',
    metric: '+40% VO2 Max',
  },
  {
    id: '4',
    name: 'Eduardo Silveira',
    time: 'Treina há 6 meses',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
    testimonial: 'O acompanhamento dos professores desde o primeiro dia me deu a segurança que eu precisava após cirurgia.',
    outcome: 'Reabilitação total com retorno aos treinos de alta intensidade.',
    metric: '100% Recuperado',
  },
]

export const ResultsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -520 : 520,
        behavior: 'smooth',
      })
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scrollRef.current) {
      setIsDragging(true)
      setStartX(e.pageX - scrollRef.current.offsetLeft)
      setScrollLeft(scrollRef.current.scrollLeft)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUpOrLeave = () => {
    setIsDragging(false)
  }

  return (
    <section
      id="resultados"
      className="relative w-full bg-transparent py-24 md:py-32 lg:py-40 px-6 lg:px-10 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <FadeIn delay={0.05} y={15}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF00]" />
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/70">
                  Casos de Sucesso
                </span>
              </div>
            </FadeIn>
            <SplitHeading
              lines={[
                {
                  text: 'RESULTADOS',
                  className: 'text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.035em] text-white',
                },
                {
                  text: 'REAIS',
                  className: 'text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.035em] text-[#C6FF00]',
                },
              ]}
            />
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => handleScroll('left')}
              aria-label="Ver resultado anterior"
              className="w-11 h-11 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => handleScroll('right')}
              aria-label="Ver próximo resultado"
              className="w-11 h-11 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Carousel Container */}
        <StaggerContainer staggerDelay={0.08} delayChildren={0.2}>
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={`flex gap-6 overflow-x-auto scrollbar-none pb-6 -mx-6 px-6 sm:mx-0 sm:px-0 select-none ${
              isDragging ? 'cursor-grabbing scroll-auto' : 'cursor-grab scroll-smooth snap-x snap-mandatory'
            }`}
          >
            {caseStudies.map((item) => (
              <motion.div
                key={item.id}
                variants={staggerItem}
                className="snap-start flex-none w-[90vw] sm:w-[500px] lg:w-[540px] rounded-3xl bg-white/[0.035] border border-white/10 hover:border-white/20 p-6 sm:p-7 flex flex-col sm:flex-row gap-6 transition-all duration-300"
              >
                {/* Photo & Metric */}
                <div className="relative w-full sm:w-44 h-48 sm:h-auto rounded-2xl overflow-hidden shrink-0 bg-black/40">
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-full h-full object-cover pointer-events-none"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-[#C6FF00]">
                    {item.metric}
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-0.5">{item.name}</h3>
                    <span className="text-xs text-white/50 block mb-4">{item.time}</span>
                    <p className="text-xs sm:text-sm text-white/75 leading-relaxed italic mb-4">
                      "{item.testimonial}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-[#C6FF00] shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-white/90 leading-tight">
                      {item.outcome}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}
