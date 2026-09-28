import React, { useEffect, useState } from 'react'
import { SmoothScrollProvider, useSmoothScroll } from './components/SmoothScrollProvider'
import { ShaderBackground } from './components/ShaderBackground'
import { ScrollProgress } from './components/ScrollProgress'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { NumbersBar } from './components/NumbersBar'
import { ConceptSection } from './components/ConceptSection'
import { DifferentialsSection } from './components/DifferentialsSection'
import { ResultsSection } from './components/ResultsSection'
import { PlansSection, PlanItem } from './components/PlansSection'
import { ExperienceGallery } from './components/ExperienceGallery'
import { TestimonialsSection } from './components/TestimonialsSection'
import { CtaFinalSection } from './components/CtaFinalSection'
import { Footer } from './components/Footer'
import { VirtualTourModal } from './components/VirtualTourModal'
import { EnrollmentModal } from './components/EnrollmentModal'
import { VideoModal } from './components/VideoModal'

function AppContent() {
  const [videoSrc, setVideoSrc] = useState(
    '/videos/Woman_running_on_treadmill_1080p_20260919205918.mp4'
  )
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false)
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [selectedPlanId, setSelectedPlanId] = useState('performance')
  const [activeSection, setActiveSection] = useState('Início')

  const { scrollTo } = useSmoothScroll()

  const handleNavigate = (label: string) => {
    setActiveSection(label)
    switch (label) {
      case 'Início':
        scrollTo(0, { offset: 0 })
        break
      case 'Estrutura':
        scrollTo('#estrutura', { offset: -68 })
        break
      case 'Planos':
        scrollTo('#planos', { offset: -68 })
        break
      case 'Resultados':
        scrollTo('#resultados', { offset: -68 })
        break
      case 'Contato':
        scrollTo('#contato', { offset: -68 })
        break
      default:
        break
    }
  }

  useEffect(() => {
    const sections = [
      { id: 'inicio', label: 'Início' },
      { id: 'estrutura', label: 'Estrutura' },
      { id: 'planos', label: 'Planos' },
      { id: 'resultados', label: 'Resultados' },
      { id: 'contato', label: 'Contato' },
    ]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const current = sections.find((s) => s.id === entry.target.id)
            if (current) {
              setActiveSection(current.label)
            }
          }
        })
      },
      { threshold: 0.25, rootMargin: '-68px 0px -40% 0px' }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const openEnrollment = (planId: string = 'performance') => {
    setSelectedPlanId(planId)
    setIsEnrollmentOpen(true)
  }

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-[#C6FF00] selection:text-black overflow-x-hidden">
      {/* Interactive WebGL Dot Distortion Shader Background */}
      <ShaderBackground />

      {/* Top Scroll Indicator */}
      <ScrollProgress />

      {/* Main Navigation */}
      <Navbar
        onStartClick={() => openEnrollment('performance')}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Hero Section */}
      <Hero
        videoSrc={videoSrc}
        posterSrc="/hero-poster.jpg"
        onStartClick={() => openEnrollment('performance')}
        onExploreClick={() => setIsVirtualTourOpen(true)}
        onScrollDown={() => scrollTo('#faixa-numeros', { offset: -68 })}
        onOpenSourceModal={() => setIsVideoModalOpen(true)}
      />

      {/* Numbers / Stats Bar */}
      <NumbersBar />

      {/* Structure & Concept */}
      <ConceptSection onExploreClick={() => setIsVirtualTourOpen(true)} />

      {/* Differentials Bento Grid */}
      <DifferentialsSection />

      {/* Member Results & Transformations Carousel */}
      <ResultsSection />

      {/* Pricing & Membership Plans */}
      <PlansSection onSelectPlan={(plan: PlanItem) => openEnrollment(plan.id)} />

      {/* Visual Experience Gallery */}
      <ExperienceGallery />

      {/* Community Testimonials */}
      <TestimonialsSection />

      {/* Final CTA Banner */}
      <CtaFinalSection onStartClick={() => openEnrollment('performance')} />

      {/* Footer with Fictional Contacts (No Netlify Watermark) */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals */}
      <VirtualTourModal
        isOpen={isVirtualTourOpen}
        onClose={() => setIsVirtualTourOpen(false)}
        onSelectPlan={() => openEnrollment('performance')}
      />

      <EnrollmentModal
        isOpen={isEnrollmentOpen}
        onClose={() => setIsEnrollmentOpen(false)}
        initialPlan={selectedPlanId}
      />

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        currentVideoSrc={videoSrc}
        onSelectVideoSrc={(newSrc) => setVideoSrc(newSrc)}
      />
    </div>
  )
}

export default function App() {
  return (
    <SmoothScrollProvider>
      <AppContent />
    </SmoothScrollProvider>
  )
}
