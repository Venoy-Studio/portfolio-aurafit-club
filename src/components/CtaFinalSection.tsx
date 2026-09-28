import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { EASE } from './animations'

interface CtaFinalSectionProps {
  onStartClick: () => void
}

export const CtaFinalSection: React.FC<CtaFinalSectionProps> = ({ onStartClick }) => {
  return (
    <section
      id="cta-final"
      className="relative w-full bg-transparent py-28 md:py-36 lg:py-44 px-6 lg:px-10 overflow-hidden border-t border-white/10"
    >
      {/* Background Image with Ambient Glow */}
      <motion.div
        initial={{ scale: 1.06, opacity: 0.6 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
      >
        <img
          src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1800&auto=format&fit=crop&q=80"
          alt="Atleta em foco total"
          className="w-full h-full object-cover object-center opacity-25"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-radial-[circle_at_center_rgba(198,255,0,0.08)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/55 to-black/75" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-md mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C6FF00]" />
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/80">
            Comece Sua Jornada
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.045em] text-white leading-[0.95] mb-6 select-none"
        >
          Seu próximo resultado <br />
          <span className="text-[#C6FF00]">começa hoje.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="text-base sm:text-lg text-white/70 max-w-xl leading-relaxed mb-10 font-normal"
        >
          Comece agora e descubra até onde você consegue chegar quando tem o ambiente, a tecnologia e os profissionais certos ao seu lado.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="relative group"
        >
          <div className="absolute -inset-1 rounded-full bg-[#C6FF00]/25 blur-lg group-hover:bg-[#C6FF00]/40 transition-all duration-300 opacity-70 group-hover:opacity-100" />
          <motion.button
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            type="button"
            onClick={onStartClick}
            className="relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-[#C6FF00] text-black font-extrabold text-base tracking-wider uppercase shadow-[0_0_25px_rgba(198,255,0,0.3)] hover:shadow-[0_0_35px_rgba(198,255,0,0.20)] transition-shadow duration-300 cursor-pointer"
          >
            <span>Quero começar</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs text-white/50"
        >
          <span>✓ 7 dias de garantia incondicional</span>
          <span>✓ Sem fidelidade obrigatória</span>
          <span>✓ Suporte diário com treinadores</span>
        </motion.div>
      </div>
    </section>
  )
}
