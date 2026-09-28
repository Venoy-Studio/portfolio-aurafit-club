import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Flame, Dumbbell, HeartPulse, Clock } from 'lucide-react'

interface VirtualTourModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectPlan: () => void
}

const spaceHighlights = [
  {
    icon: Flame,
    title: 'Zona Cardio Conectada',
    desc: 'Esteiras biomecânicas de última geração com monitoramento de métricas em tempo real e amortecimento ativo.',
  },
  {
    icon: Dumbbell,
    title: 'Musculação Premium',
    desc: 'Equipamentos importados com biomecânica precisa, pesos livres calibrados e espaço amplo sem superlotação.',
  },
  {
    icon: HeartPulse,
    title: 'Recuperação & Spa',
    desc: 'Área de sauna seca, banheira de imersão no gelo e recuperação muscular assistida para máxima performance.',
  },
  {
    icon: Clock,
    title: 'Acesso Estendido',
    desc: 'Horário flexível de segunda a domingo para você nunca deixar seu treino de lado.',
  },
]

export const VirtualTourModal: React.FC<VirtualTourModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#0d0d0d] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-white my-8"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6FF00]/10 border border-[#C6FF00]/30 text-[#C6FF00] text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Estrutura de Alta Performance</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Conheça o espaço AuraFit
            </h3>
            <p className="text-white/70 text-sm sm:text-base mb-6 leading-relaxed">
              Projetada para elevar o seu padrão de treino. Cada detalhe foi pensado para maximizar a sua energia, segurança e constância.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {spaceHighlights.map((item, idx) => {
                const IconComponent = item.icon
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col gap-2 hover:border-white/25 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#C6FF00]/15 text-[#C6FF00] flex items-center justify-center">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h4 className="font-semibold text-white text-sm sm:text-base">{item.title}</h4>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                )
              })}
            </div>

            {/* Footer Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="text-center sm:text-left">
                <span className="text-xs text-white/50 block">Agende um tour presencial</span>
                <span className="text-sm font-semibold text-white">Treino experimental 100% gratuito</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose()
                  onSelectPlan()
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#C6FF00] text-black font-semibold text-sm hover:bg-[#b8f000] transition-colors shadow-[0_0_20px_rgba(198,255,0,0.3)] cursor-pointer"
              >
                Agendar Treino Experimental
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
