import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Film, Upload, Info } from 'lucide-react'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  currentVideoSrc: string
  onSelectVideoSrc: (src: string) => void
}

const DEFAULT_VIDEO = '/videos/Woman_running_on_treadmill_1080p_20260919205918.mp4'

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  onSelectVideoSrc,
}) => {
  const [videoUrlInput, setVideoUrlInput] = useState('')
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const objectUrl = URL.createObjectURL(file)
    setUploadedFileName(file.name)
    onSelectVideoSrc(objectUrl)
    onClose()
  }

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (videoUrlInput.trim()) {
      onSelectVideoSrc(videoUrlInput.trim())
      onClose()
    }
  }

  const handleRestoreDefault = () => {
    onSelectVideoSrc(DEFAULT_VIDEO)
    setUploadedFileName(null)
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
            className="relative w-full max-w-lg bg-[#0d0d0d] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-white my-8"
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
              <Film className="w-3.5 h-3.5" />
              Configuração de Vídeo
            </div>

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              Vídeo de Fundo da Hero
            </h3>
            <p className="text-white/70 text-sm mb-6 leading-relaxed">
              Você pode testar diretamente o seu arquivo de vídeo animado ou usar o vídeo padrão otimizado.
            </p>

            {/* Option 1: File selector */}
            <div className="mb-5">
              <span className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
                Opção 1: Selecionar seu vídeo local (.mp4)
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 px-4 rounded-2xl border border-dashed border-white/25 hover:border-[#C6FF00] bg-white/[0.03] hover:bg-white/[0.06] flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 text-white group-hover:bg-[#C6FF00] group-hover:text-black flex items-center justify-center transition-colors">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <span className="text-sm font-medium text-white block">
                    {uploadedFileName ? `Arquivo: ${uploadedFileName}` : 'Clique para carregar seu arquivo .mp4'}
                  </span>
                  <span className="text-xs text-white/50">
                    O vídeo será carregado imediatamente no background da Hero
                  </span>
                </div>
              </button>
            </div>

            {/* Option 2: URL input */}
            <div className="mb-5">
              <span className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
                Opção 2: Inserir URL direta de vídeo
              </span>
              <form onSubmit={handleUrlSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="url"
                    placeholder="https://exemplo.com/meu-video.mp4"
                    value={videoUrlInput}
                    onChange={(e) => setVideoUrlInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  Aplicar
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={handleRestoreDefault}
                className="text-xs text-white/60 hover:text-[#C6FF00] underline transition-colors cursor-pointer"
              >
                Restaurar vídeo padrão (/hero-fitness.mp4)
              </button>
              <div className="text-xs text-white/40 flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                <span>Formatos: MP4, WebM</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
