import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  Play,
  Sparkles,
  Star,
  Volume2,
  VolumeX,
  AlertCircle,
} from 'lucide-react'
import { EASE } from './animations'

interface HeroProps {
  videoSrc: string
  posterSrc?: string
  onStartClick: () => void
  onExploreClick: () => void
  onScrollDown: () => void
  onOpenSourceModal?: () => void
}

const socialAvatars = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export const Hero: React.FC<HeroProps> = ({
  videoSrc,
  posterSrc = '/hero-poster.jpg',
  onStartClick,
  onExploreClick,
  onScrollDown,
  onOpenSourceModal,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroWrapperRef = useRef<HTMLDivElement>(null)
  const [videoError, setVideoError] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const { scrollYProgress } = useScroll({
    target: heroWrapperRef,
    offset: ['start start', 'end start'],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 40])
  const parallaxScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.07])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    setVideoError(false)
    setVideoLoaded(false)

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Autoplay prevented or deferred:', err)
      })
    }
  }, [videoSrc])

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted
      videoRef.current.muted = nextMuted
      setIsMuted(nextMuted)
    }
  }

  return (
    <section id="inicio" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Video / Poster Background */}
      <div
        ref={heroWrapperRef}
        id="hero-media-wrapper"
        className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0.8, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1.02 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: parallaxY, scale: parallaxScale, transformOrigin: 'center center' }}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          <img
            src={posterSrc}
            alt="Atleta em esteira na academia"
            className="absolute inset-0 h-full w-full object-cover object-[75%_center] md:object-right lg:object-right transition-opacity duration-700"
            loading="eager"
          />

          {!videoError && (
            <video
              ref={videoRef}
              key={videoSrc}
              id="hero-background-video"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster={posterSrc}
              onLoadedData={() => {
                setVideoLoaded(true)
                setVideoError(false)
              }}
              onError={() => {
                console.warn('Video failed to load, falling back to poster.')
                setVideoError(true)
              }}
              onEnded={(e) => {
                e.currentTarget.currentTime = 0
                e.currentTarget.play()
              }}
              className={`absolute inset-0 w-full h-full object-cover object-[75%_center] md:object-right lg:object-right pointer-events-none transition-opacity duration-1000 ${
                videoLoaded ? 'opacity-100' : 'opacity-85'
              }`}
            >
              <source src={videoSrc} type="video/mp4" />
              Seu navegador não suporta vídeos em HTML5.
            </video>
          )}
        </motion.div>

        {/* Gradient Overlays */}
        <div
          id="hero-horizontal-overlay"
          className="absolute inset-0 h-full w-full bg-gradient-to-r from-black/88 via-black/55 via-55% to-black/10 pointer-events-none"
        />
        <div
          id="hero-vertical-overlay"
          className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/70 via-transparent to-black/25 pointer-events-none"
        />

        {/* Video Audio & Settings Controls */}
        <div
          id="hero-video-controls"
          className="absolute bottom-6 right-6 z-40 hidden sm:flex items-center gap-2 pointer-events-auto"
        >
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 hover:border-white/25 text-white/80 hover:text-white backdrop-blur-md text-xs font-medium transition-all active:scale-95 cursor-pointer"
            title={isMuted ? 'Áudio mudo (clique para ativar)' : 'Áudio ativado'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#C6FF00]" />
            )}
            <span className="text-[11px] tracking-wider uppercase font-semibold">
              {isMuted ? 'Mudo' : 'Som'}
            </span>
          </button>

          {onOpenSourceModal && (
            <button
              type="button"
              onClick={onOpenSourceModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 hover:border-[#C6FF00]/50 text-white/80 hover:text-white backdrop-blur-md text-xs font-medium transition-all active:scale-95 cursor-pointer"
              title="Personalizar vídeo de fundo"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C6FF00]" />
              <span className="text-[11px] tracking-wider uppercase font-semibold">Vídeo</span>
            </button>
          )}
        </div>

        {videoError && (
          <div className="absolute top-24 right-6 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-amber-500/30 text-amber-300 text-xs backdrop-blur-md">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Exibindo poster de alta definição</span>
          </div>
        )}
      </div>

      {/* Main Hero Content */}
      <div
        id="hero-main-container"
        className="relative z-20 w-full max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center min-h-screen pt-28 pb-20 md:py-32"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-[58%] xl:w-[50%] flex flex-col items-start text-left"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            id="hero-badge"
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF00] shadow-[0_0_8px_#C6FF00]" />
            <span className="text-xs uppercase tracking-[0.18em] font-medium text-white/70">
              PERFORMANCE • SAÚDE • RESULTADOS
            </span>
          </motion.div>

          {/* Headline */}
          <h1
            id="hero-headline"
            className="text-[38px] sm:text-[48px] md:text-[56px] lg:text-[72px] xl:text-[82px] font-black tracking-[-0.055em] leading-[0.88] max-w-[650px] mb-7 select-none"
          >
            <div className="overflow-hidden pb-1">
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 45 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
                }}
                className="text-white block"
              >
                Transforme <br />
                seu corpo.
              </motion.span>
            </div>
            <div className="overflow-hidden pb-1 mt-1.5 sm:mt-2.5">
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 45 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.1, ease: EASE } },
                }}
                className="text-[#C6FF00] block"
              >
                Supere seus <br />
                limites.
              </motion.span>
            </div>
          </h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            id="hero-description"
            className="max-w-[520px] text-base sm:text-lg text-white/65 leading-relaxed mb-9 font-normal"
          >
            Estrutura completa, equipamentos de alto nível e um ambiente criado para transformar cada treino em evolução.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            id="hero-cta-group"
            className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10 sm:mb-12"
          >
            <motion.button
              id="hero-primary-cta"
              type="button"
              onClick={onStartClick}
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#C6FF00] text-black font-semibold text-base shadow-[0_0_20px_rgba(198,255,0,0.22)] hover:shadow-[0_0_35px_rgba(198,255,0,0.20)] focus:outline-none cursor-pointer"
            >
              <span>Começar agora</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>

            <motion.button
              id="hero-secondary-cta"
              type="button"
              onClick={onExploreClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 backdrop-blur-md text-white font-medium text-base transition-colors duration-300 focus:outline-none cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white text-white translate-x-0.5" />
              <span>Conhecer a academia</span>
            </motion.button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.25, ease: EASE } },
            }}
            id="hero-social-proof"
            className="flex items-center gap-4 text-xs sm:text-sm text-white/80 select-none"
          >
            <div className="flex items-center -space-x-2">
              {socialAvatars.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Aluno AuraFit ${index + 1}`}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full ring-2 ring-black object-cover"
                  loading="lazy"
                />
              ))}
            </div>
            <span className="font-semibold text-white tracking-tight">+2.000 alunos</span>
            <span className="text-white/25">|</span>
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-white/90">4.9/5</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator button */}
      <motion.div
        id="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-auto cursor-pointer group select-none"
        onClick={onScrollDown}
        role="button"
        tabIndex={0}
        aria-label="Rolar para ver mais"
      >
        <span className="text-[10px] tracking-[0.28em] font-semibold text-white/50 group-hover:text-white uppercase transition-colors mb-1.5">
          EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 4, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center text-white/40 group-hover:text-[#C6FF00] transition-colors"
        >
          <span className="w-[1px] h-3 bg-current mb-0.5" />
          <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
