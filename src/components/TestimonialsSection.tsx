import React from 'react'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { FadeIn, SplitHeading, StaggerContainer, staggerItem } from './animations'

export interface TestimonialItem {
  id: string
  quote: string
  author: string
  role: string
  membershipLength: string
  avatar: string
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: '1',
    quote:
      'Treinar aqui mudou minha relação com o esporte. O respeito ao silêncio e o nível dos equipamentos me mantêm focado no que importa.',
    author: 'Gabriel Fontana',
    role: 'Empresário',
    membershipLength: 'Aluno há 1 ano',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    quote:
      'Não existe aquela poluição visual nem a espera absurda entre aparelhos. É o ambiente mais refinado e funcional em que já treinei.',
    author: 'Beatriz Vasconcelos',
    role: 'Arquiteta',
    membershipLength: 'Aluna há 2 anos',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
  },
]

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="depoimentos"
      className="relative w-full bg-[#050505]/50 backdrop-blur-[2px] py-24 md:py-32 lg:py-40 px-6 lg:px-10 border-t border-white/10"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <FadeIn delay={0.05} y={15}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF00]" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/70">
                Depoimentos
              </span>
            </div>
          </FadeIn>
          <SplitHeading
            lines={[
              {
                text: 'A voz de quem vive',
                className: 'text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.035em] text-white',
              },
              {
                text: 'a experiência.',
                className: 'text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.035em] text-[#C6FF00]',
              },
            ]}
          />
        </div>

        {/* Testimonials List */}
        <StaggerContainer
          staggerDelay={0.12}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {testimonialsData.map((item) => (
            <motion.div
              key={item.id}
              variants={staggerItem}
              className="flex flex-col justify-between border-l border-white/15 pl-6 sm:pl-8 py-2 group hover:border-[#C6FF00] transition-colors duration-500"
            >
              <div>
                <Quote className="w-7 h-7 text-[#C6FF00]/50 mb-6 group-hover:text-[#C6FF00] transition-colors" />
                <p className="text-xl sm:text-2xl text-white/90 font-light leading-relaxed mb-8">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white/15 group-hover:ring-[#C6FF00]/60 transition-all"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-bold text-white text-base tracking-tight">
                    {item.author}
                  </h4>
                  <p className="text-xs text-white/50">
                    {item.role} • {item.membershipLength}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
