import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function PageHeader({ title, subtitle, emoji, waveFill = 'white' }) {
  return (
    <div className="relative overflow-hidden" style={{ minHeight: '280px' }}>
      <div className="absolute inset-0 bg-[#283583]" />

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 pb-12 pt-28"
      >
        <div className="flex items-center gap-2 text-white/60 text-sm font-body mb-4">
          <Link to="/" className="hover:text-white transition-colors duration-200">
            Home
          </Link>
          <span>/</span>
          <span className="text-white">{title}</span>
        </div>

        <h1 className="font-heading font-black text-4xl md:text-5xl text-white mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="font-body text-white/80 text-lg max-w-xl mt-2">{subtitle}</p>
        )}
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path
            d="M0,30 Q360,60 720,30 Q1080,0 1440,30 L1440,60 L0,60 Z"
            fill={waveFill}
          />
        </svg>
      </div>
    </div>
  )
}
