import React from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles, ArrowRight } from 'lucide-react'
import { FadeIn, SplitHeading, StaggerContainer, EASE } from './animations'

export interface PlanItem {
  id: string
  name: string
  price: string
  period: string
  description: string
  features: string[]
  highlighted: boolean
  badge?: string
  ctaText: string
}

export const plansData: PlanItem[] = [
  {
    id: 'start',
    name: 'Start',
    price: '149',
    period: '/mês',
    description: 'Para quem busca regularidade e uma rotina de treinos consistente e eficiente.',
    features: [
      'Acesso livre à área de musculação',
      'Zona de cardio completa',
      'Treino inicial prescrito no app Aura',
      'Vestiários com armários privativos',
    ],
    highlighted: false,
    ctaText: 'Escolher Start',
  },
  {
    id: 'performance',
    name: 'Performance',
    price: '229',
    period: '/mês',
    description: 'O equilíbrio perfeito entre tecnologia de biomecânica, acompanhamento e recovery.',
    features: [
      'Tudo incluído no plano Start',
      'Bioimpedância mensal computadorizada',
      'Acesso à área de Recovery & Banho de Gelo',
      'Aulas coletivas especiais de alta intensidade',
      'Passe livre para 1 convidado por mês',
    ],
    highlighted: true,
    badge: 'Mais Escolhido',
    ctaText: 'Escolher Performance',
  },
  {
    id: 'black',
    name: 'Black',
    price: '349',
    period: '/mês',
    description: 'A experiência máxima em exclusividade, com suporte individualizado contínuo.',
    features: [
      'Tudo incluído no plano Performance',
      'Acompanhamento mensal com nutricionista esportivo',
      'Toalha e amenities premium em todos os treinos',
      'Acesso prioritário a eventos e workshops',
      'Convites ilimitados aos finais de semana',
    ],
    highlighted: false,
    ctaText: 'Escolher Black',
  },
]

interface PlansSectionProps {
  onSelectPlan: (plan: PlanItem) => void
}

export const PlansSection: React.FC<PlansSectionProps> = ({ onSelectPlan }) => {
  return (
    <section
      id="planos"
      className="relative w-full bg-[#050505]/50 backdrop-blur-[2px] py-24 md:py-32 lg:py-40 px-6 lg:px-10 border-t border-white/10"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <FadeIn delay={0.05} y={15}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF00]" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/70">
                Planos & Mensalidades
              </span>
            </div>
          </FadeIn>
          <SplitHeading
            className="mb-4"
            lines={[
              {
                text: 'Escolha a frequência',
                className: 'text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.035em] text-white',
              },
              {
                text: 'da sua evolução.',
                className: 'text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.035em] text-[#C6FF00]',
              },
            ]}
          />
          <FadeIn delay={0.2} y={15}>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              Sem taxas de adesão escondidas. Cancele quando quiser, com transparência total.
            </p>
          </FadeIn>
        </div>

        {/* Cards Grid */}
        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {plansData.map((plan) => {
            const isHighlight = plan.highlighted
            return (
              <motion.div
                key={plan.id}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: isHighlight ? 0.97 : 1 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.7, ease: EASE },
                  },
                }}
                className={`relative rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 ${
                  isHighlight
                    ? 'bg-[#0d0d0d] border-2 border-[#C6FF00] shadow-[0_15px_40px_rgba(198,255,0,0.12)]'
                    : 'bg-white/[0.035] border border-white/10 hover:border-white/20'
                }`}
              >
                {isHighlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#C6FF00] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_12px_rgba(198,255,0,0.4)]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-black text-white tracking-tight">{plan.name}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-white/60 mb-6 leading-relaxed min-h-[40px]">
                    {plan.description}
                  </p>

                  <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-white/10">
                    <span className="text-sm font-semibold text-white/60">R$</span>
                    <span className="text-5xl font-black tracking-tight text-white">{plan.price}</span>
                    <span className="text-sm text-white/50">{plan.period}</span>
                  </div>

                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-white/80">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isHighlight ? 'bg-[#C6FF00]/20 text-[#C6FF00]' : 'bg-white/10 text-white/80'
                          }`}
                        >
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  type="button"
                  onClick={() => onSelectPlan(plan)}
                  className={`group w-full py-3.5 px-6 rounded-full font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-shadow duration-300 ${
                    isHighlight
                      ? 'bg-[#C6FF00] text-black shadow-[0_0_20px_rgba(198,255,0,0.22)] hover:shadow-[0_0_35px_rgba(198,255,0,0.20)]'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </motion.button>
              </motion.div>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
