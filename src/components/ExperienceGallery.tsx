import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FadeIn, SplitHeading, EASE } from './animations'

export interface GalleryItem {
  id: number
  src: string
  title: string
  subtitle: string
  className: string
  parallaxType: 'subtleDown' | 'subtleUp' | 'none'
}

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1000&auto=format&fit=crop&q=80',
    title: 'Área de Treino Livre',
    subtitle: 'Piso emborrachado com absorção de impacto',
    className: 'col-span-1 md:col-span-2 row-span-2 min-h-[340px] md:min-h-[460px]',
    parallaxType: 'subtleDown',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=80',
    title: 'Zona Funcional',
    subtitle: 'Kettlebells, rigs e cordas navais',
    className: 'col-span-1 md:col-span-1 min-h-[220px]',
    parallaxType: 'subtleUp',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&auto=format&fit=crop&q=80',
    title: 'Recovery & Spa',
    subtitle: 'Banheiras de gelo e sauna finlandesa',
    className: 'col-span-1 md:col-span-1 min-h-[220px]',
    parallaxType: 'none',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1000&auto=format&fit=crop&q=80',
    title: 'Esteiras Biomecânicas',
    subtitle: 'Velocidade adaptativa e telas imersivas',
    className: 'col-span-1 md:col-span-2 min-h-[240px]',
    parallaxType: 'none',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&auto=format&fit=crop&q=80',
    title: 'Pesos Livres',
    subtitle: 'Halteres usinados de 2kg a 50kg',
    className: 'col-span-1 md:col-span-1 min-h-[240px]',
    parallaxType: 'subtleDown',
  },
]

export const ExperienceGallery: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const yDown = useTransform(scrollYProgress, [0, 1], [-15, 15])
  const yUp = useTransform(scrollYProgress, [0, 1], [20, -20])

  return (
    <section
      ref={containerRef}
      id="galeria"
      className="relative w-full bg-transparent py-24 md:py-32 lg:py-40 px-6 lg:px-10 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <FadeIn delay={0.05} y={15}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF00]" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/70">
                A Experiência
              </span>
            </div>
          </FadeIn>
          <SplitHeading
            lines={[
              {
                text: 'Um espaço feito para quem leva',
                className: 'text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.035em] text-white',
              },
              {
                text: 'evolução a sério.',
                className: 'text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.035em] text-[#C6FF00]',
              },
            ]}
          />
        </div>

        {/* Parallax Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => {
            const style =
              item.parallaxType === 'subtleDown'
                ? { y: yDown }
                : item.parallaxType === 'subtleUp'
                ? { y: yUp }
                : {}

            return (
              <motion.div
                key={item.id}
                style={style}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: EASE,
                }}
                className={`group relative rounded-3xl overflow-hidden border border-white/10 bg-[#0d0d0d] flex flex-col justify-end p-6 sm:p-7 ${item.className}`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-85" />
                <div className="relative z-10">
                  <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/70">{item.subtitle}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
