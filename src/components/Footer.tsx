import React from 'react'
import { Dumbbell, MapPin, Clock, Instagram, MessageSquare, ArrowUpRight, Phone, Mail } from 'lucide-react'

interface FooterProps {
  onNavigate: (section: string) => void
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer
      id="contato"
      className="relative w-full bg-[#050505]/75 backdrop-blur-[2px] text-white/70 border-t border-white/10 py-16 md:py-20 px-6 lg:px-10"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Brand & Mission */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-[#C6FF00]">
                <Dumbbell className="w-4 h-4" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                AURA<span className="text-[#C6FF00]">FIT</span>
              </span>
            </div>
            <p className="text-sm text-white/55 leading-relaxed max-w-sm mb-6">
              Academia de alta performance dedicada a quem busca consistência, biomecânica precisa e superação diária.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-white/70">
              <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
              <span>Matrículas abertas para a temporada</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white mb-5">
              Navegação
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('Início')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Academia
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('Estrutura')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Estrutura
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('Planos')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Planos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('Resultados')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Resultados
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('Contato')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>

          {/* Fictitious Contacts & Visits */}
          <div className="lg:col-span-5 flex flex-col">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white mb-5">
              Informações & Visitas
            </h4>
            <div className="space-y-4 text-sm text-white/65">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C6FF00] shrink-0 mt-1" />
                <span>
                  Av. Paulista, 2164 — Cerqueira César, São Paulo - SP, CEP 01310-300
                </span>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C6FF00] shrink-0 mt-1" />
                <div>
                  <span className="block text-white">Segunda a Sexta: 05:30 — 23:00</span>
                  <span className="block text-xs text-white/50">
                    Sábados, Domingos e Feriados: 08:00 — 18:00
                  </span>
                </div>
              </div>

              {/* Fictitious Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#C6FF00]" />
                  <span>Tel: (11) 3284-9000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#C6FF00]" />
                  <span>contato@aurafitclub.com.br</span>
                </div>
              </div>

              {/* Social / WhatsApp buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-xs text-white transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#C6FF00]" />
                  <span>@aurafit.oficial</span>
                  <ArrowUpRight className="w-3 h-3 text-white/40" />
                </a>

                <a
                  href="https://wa.me/5511998765432"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-xs text-white transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#C6FF00]" />
                  <span>WhatsApp: (11) 99876-5432</span>
                  <ArrowUpRight className="w-3 h-3 text-white/40" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} AuraFit Club. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white/60 cursor-pointer">Termos de Uso</span>
            <span className="hover:text-white/60 cursor-pointer">Privacidade</span>
            <span className="hover:text-white/60 cursor-pointer">Regulamento Interno</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
