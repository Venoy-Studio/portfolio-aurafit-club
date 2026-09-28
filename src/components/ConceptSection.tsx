import React from 'react'
import { motion } from 'framer-motion'
import { Dumbbell, Wind, Shield } from 'lucide-react'
import { FadeIn, SplitHeading, EASE } from './animations'

interface ConceptSectionProps {
  onExploreClick?: () => void
}

export const ConceptSection: React.FC<ConceptSectionProps> = () => {
  return (
    <section
      id="estrutura"
      className="relative w-full bg-transparent py-24 md:py-32 lg:py-40 px-6 lg:px-10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <FadeIn delay={0.05} y={20}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF00]" />
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/70">
                  O Conceito
                </span>
              </div>
            </FadeIn>

            <SplitHeading
              className="mb-6"
              lines={[
                {
                  text: 'TREINE',
                  className: 'text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.04em] text-white leading-[0.95]',
                },
                {
                  text: 'DIFERENTE.',
                  className: 'text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.04em] text-[#C6FF00] leading-[0.95]',
                },
              ]}
            />

            <FadeIn delay={0.2} y={25}>
              <blockquote className="text-xl sm:text-2xl text-white/90 font-medium leading-relaxed mb-6 border-l-2 border-[#C6FF00]/60 pl-5">
                "Não é apenas uma academia. É um ambiente pensado para levar sua performance para outro nível."
              </blockquote>
            </FadeIn>

            <FadeIn delay={0.3} y={20}>
              <p className="text-white/60 text-base leading-relaxed mb-8">
                Desenhamos cada metro quadrado para eliminar atritos. Sem filas para aparelhos, com biomecânica de precisão alemã, iluminação circadiana e suporte individualizado desde o aquecimento até o recovery.
              </p>
            </FadeIn>

            <FadeIn delay={0.38} y={20}>
              <div className="flex items-center gap-6 pt-4 border-t border-white/10 w-full text-sm">
                <div>
                  <span className="block text-2xl font-extrabold text-white">2.500m²</span>
                  <span className="text-xs text-white/50">Área de treino livre</span>
                </div>
                <div className="w-[1px] h-8 bg-white/10" />
                <div>
                  <span className="block text-2xl font-extrabold text-white">100%</span>
                  <span className="text-xs text-white/50">Amortecimento ativo</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Image with Floating Badges */}
          <div className="lg:col-span-7 relative">
            <FadeIn delay={0.15} y={30} scale={0.98}>
              <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[4/3] sm:aspect-[16/11] bg-[#0c0c0c] shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1600&auto=format&fit=crop&q=85"
                  alt="Ambiente arquitetônico moderno da academia"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 pointer-events-none" />

                {/* Badge 1: Equipamentos */}
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.35, ease: EASE }}
                  className="absolute top-6 left-6 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-xs font-semibold text-white shadow-xl hover:border-[#C6FF00]/50 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-[#C6FF00]/20 flex items-center justify-center text-[#C6FF00]">
                    <Dumbbell className="w-3 h-3" />
                  </div>
                  <span>Equipamentos premium</span>
                </motion.div>

                {/* Badge 2: Climatizado */}
                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.48, ease: EASE }}
                  className="absolute top-20 right-6 sm:top-8 sm:right-8 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-xs font-semibold text-white shadow-xl hover:border-[#C6FF00]/50 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-[#C6FF00]/20 flex items-center justify-center text-[#C6FF00]">
                    <Wind className="w-3 h-3" />
                  </div>
                  <span>Ambiente climatizado</span>
                </motion.div>

                {/* Badge 3: Profissionais */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.62, ease: EASE }}
                  className="absolute bottom-6 left-6 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-xs font-semibold text-white shadow-xl hover:border-[#C6FF00]/50 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-[#C6FF00]/20 flex items-center justify-center text-[#C6FF00]">
                    <Shield className="w-3 h-3" />
                  </div>
                  <span>Profissionais especializados</span>
                </motion.div>

                {/* Badge 4: Fluxo */}
                <div className="absolute bottom-6 right-6 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-[11px] text-white/70">
                  <span className="w-2 h-2 rounded-full bg-[#C6FF00] animate-pulse" />
                  <span>Fluxo controlado em tempo real</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
