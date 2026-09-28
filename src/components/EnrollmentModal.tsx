import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Zap, Check, ShieldCheck } from 'lucide-react'

export interface EnrollmentPlan {
  id: string
  name: string
  tag: string
  price: string
  period: string
  features: string[]
  popular: boolean
}

export const enrollmentPlans: EnrollmentPlan[] = [
  {
    id: 'start',
    name: 'START',
    tag: 'Para Começar',
    price: 'R$ 119',
    period: '/mês no anual',
    features: [
      'Musculação e área cardio completa',
      'Vestiários com duchas privativas',
      'Avaliação física inicial',
    ],
    popular: false,
  },
  {
    id: 'performance',
    name: 'PERFORMANCE',
    tag: 'Mais Escolhido',
    price: 'R$ 169',
    period: '/mês no anual',
    features: [
      'Acesso irrestrito 7 dias/semana',
      'App AuraFit com treinos sincronizados',
      'Bioimpedância trimestral inclusa',
      'Aulas coletivas de alta intensidade',
    ],
    popular: true,
  },
  {
    id: 'black',
    name: 'BLACK VIP',
    tag: 'Experiência Completa',
    price: 'R$ 249',
    period: '/mês no anual',
    features: [
      'Área de Recovery, Sauna e Gelo',
      'Leve 1 convidado 4x ao mês',
      'Acesso a todas as unidades do clube',
      'Toalhas premium e armário privativo',
    ],
    popular: false,
  },
]

interface EnrollmentModalProps {
  isOpen: boolean
  onClose: () => void
  initialPlan?: string
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  initialPlan = 'performance',
}) => {
  const [selectedPlan, setSelectedPlan] = useState(initialPlan)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })

  useEffect(() => {
    if (initialPlan) {
      setSelectedPlan(initialPlan)
    }
  }, [initialPlan])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email) {
      setIsSuccess(true)
    }
  }

  const handleFinish = () => {
    setIsSuccess(false)
    setFormData({ name: '', email: '', phone: '' })
    onClose()
  }

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
            className="relative w-full max-w-2xl bg-[#0c0c0c] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-white my-8"
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

            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#C6FF00]/20 text-[#C6FF00] flex items-center justify-center mx-auto mb-4 border border-[#C6FF00]/40">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">Inscrição Confirmada!</h3>
                <p className="text-white/70 text-sm max-w-sm mx-auto mb-6 leading-relaxed">
                  Bem-vindo à AuraFit,{' '}
                  <span className="text-white font-medium">{formData.name}</span>! Enviamos os
                  detalhes do plano{' '}
                  <span className="text-[#C6FF00] font-semibold uppercase">{selectedPlan}</span> para{' '}
                  <span className="text-white font-medium">{formData.email}</span>.
                </p>
                <button
                  type="button"
                  onClick={handleFinish}
                  className="px-8 py-3 rounded-full bg-[#C6FF00] text-black font-semibold text-sm hover:bg-[#b8f000] transition-colors cursor-pointer"
                >
                  Concluir
                </button>
              </div>
            ) : (
              <div>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6FF00]/10 border border-[#C6FF00]/30 text-[#C6FF00] text-xs font-semibold uppercase tracking-wider mb-4">
                  <Zap className="w-3.5 h-3.5" />
                  Passo Inicial
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                  Comece sua jornada hoje
                </h3>
                <p className="text-white/70 text-sm mb-6">
                  Selecione seu formato preferido e garanta condições especiais de inauguração.
                </p>

                {/* Plan Selection Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {enrollmentPlans.map((plan) => {
                    const isSelected = selectedPlan.toLowerCase() === plan.id.toLowerCase()
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                          isSelected
                            ? 'bg-white/[0.08] border-[#C6FF00] shadow-[0_0_20px_rgba(198,255,0,0.15)]'
                            : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C6FF00]">
                            {plan.tag}
                          </span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-[#C6FF00] bg-[#C6FF00]' : 'border-white/30'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                          </div>
                        </div>
                        <h4 className="font-bold text-white text-sm">{plan.name}</h4>
                        <div className="mt-1 mb-2">
                          <span className="text-xl font-black text-white">{plan.price}</span>
                          <span className="text-[11px] text-white/50 ml-1">{plan.period}</span>
                        </div>
                        <ul className="space-y-1 text-[11px] text-white/70">
                          {plan.features.slice(0, 2).map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-1.5">
                              <Check className="w-3 h-3 text-[#C6FF00] shrink-0" />
                              <span className="line-clamp-1">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Mariana Silva"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#C6FF00] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-1">E-mail</label>
                      <input
                        type="email"
                        required
                        placeholder="mariana@exemplo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#C6FF00] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-1">
                        WhatsApp / Telefone
                      </label>
                      <input
                        type="tel"
                        placeholder="(11) 99876-5432"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#C6FF00] transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 py-3.5 px-6 rounded-full bg-[#C6FF00] text-black font-bold text-sm hover:bg-[#b8f000] transition-transform active:scale-[0.98] shadow-[0_0_20px_rgba(198,255,0,0.3)] cursor-pointer"
                  >
                    Confirmar e Agendar Acesso
                  </button>
                  <p className="text-[11px] text-center text-white/40">
                    Sem taxa de matrícula oculta. Atendimento humanizado e personalizado.
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
