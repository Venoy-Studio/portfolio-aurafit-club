import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { useSmoothScroll } from './SmoothScrollProvider'

export interface NavItem {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: 'Início', href: '#inicio' },
  { label: 'Estrutura', href: '#estrutura' },
  { label: 'Planos', href: '#planos' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Contato', href: '#contato' },
]

interface NavbarProps {
  onStartClick: () => void
  onNavigate?: (label: string) => void
  activeSection?: string
}

export const Navbar: React.FC<NavbarProps> = ({
  onStartClick,
  onNavigate,
  activeSection = 'Início',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState(activeSection)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollTo } = useSmoothScroll()

  useEffect(() => {
    setCurrentSection(activeSection)
  }, [activeSection])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault()
    setCurrentSection(item.label)
    setMobileMenuOpen(false)

    if (item.href === '#inicio') {
      scrollTo(0, { offset: 0 })
    } else {
      scrollTo(item.href, { offset: -68 })
    }

    if (onNavigate) {
      onNavigate(item.label)
    }
  }

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.08]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between h-16 sm:h-20">
        {/* Brand */}
        <a
          id="navbar-brand"
          href="#inicio"
          onClick={(e) => {
            e.preventDefault()
            setCurrentSection('Início')
            scrollTo(0, { offset: 0 })
            if (onNavigate) onNavigate('Início')
          }}
          className="group flex items-center gap-2.5 focus:outline-none select-none cursor-pointer"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#C6FF00] shadow-[0_0_10px_#C6FF00]" />
          <span className="text-xl sm:text-2xl font-black tracking-tight text-white leading-none">
            AURA<span className="text-[#C6FF00]">FIT</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-8 xl:gap-10">
          {navItems.map((item) => {
            const isActive = currentSection === item.label
            return (
              <a
                key={item.label}
                id={`nav-${item.label.toLowerCase()}`}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`relative py-2 text-[13px] uppercase tracking-[0.16em] font-medium transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-white font-semibold' : 'text-white/60 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C6FF00] rounded-full shadow-[0_0_8px_#C6FF00]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            )
          })}
        </nav>

        {/* CTA Desktop */}
        <div className="hidden lg:flex items-center">
          <button
            id="navbar-cta-desktop"
            type="button"
            onClick={onStartClick}
            className="group inline-flex items-center gap-2 h-10 px-6 rounded-full bg-[#C6FF00] hover:bg-white text-black text-xs uppercase tracking-[0.14em] font-bold transition-all duration-200 shadow-[0_0_20px_rgba(198,255,0,0.18)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] focus:outline-none cursor-pointer"
          >
            <span>Começar agora</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden items-center">
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-[#C6FF00] focus:outline-none transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-[#050505]/95 backdrop-blur-2xl border-b border-white/10"
          >
            <div className="px-6 py-6 flex flex-col gap-2 max-w-md mx-auto">
              {navItems.map((item) => {
                const isActive = currentSection === item.label
                return (
                  <a
                    key={item.label}
                    id={`mobile-nav-${item.label.toLowerCase()}`}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`flex items-center justify-between py-3.5 px-3 rounded-lg text-sm uppercase tracking-[0.14em] font-medium transition-colors ${
                      isActive ? 'text-[#C6FF00] bg-white/[0.04] font-semibold' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#C6FF00]" />}
                  </a>
                )
              })}
              <div className="pt-4 mt-2 border-t border-white/10">
                <button
                  id="mobile-nav-cta"
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onStartClick()
                  }}
                  className="w-full h-12 rounded-full bg-[#C6FF00] text-black text-xs uppercase tracking-[0.14em] font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(198,255,0,0.2)] active:scale-[0.98] transition-transform"
                >
                  <span>Começar agora</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
