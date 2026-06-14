import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
export default function Hero() {
  const containerRef = useRef(null)
  const navigate = useNavigate()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Photo background with parallax */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src="/hero.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/70 to-transparent" />
      </motion.div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-secondary/20 blur-sm"
          style={{
            width: 40 + i * 15,
            height: 40 + i * 15,
            left: `${10 + i * 12}%`,
            bottom: `${15 + (i % 3) * 10}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4 + i, delay: i * 0.5, repeat: Infinity }}
        />
      ))}

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          className="font-heading font-black text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-4"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
        >
          Jubla{' '}
          <span className="text-white">
            Embrachertal
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="font-heading font-semibold text-2xl md:text-3xl text-white/90 mb-6"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
        >
          Lebensfreu(n)de erleben.
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="font-body text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Abenteuer, Freundschaften und unvergessliche Erlebnisse
          für Kinder und Jugendliche.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/anmeldung')}
            className="bg-[#283583] hover:bg-[#1e2666] text-white font-heading font-semibold px-8 py-4 rounded-full shadow-lg transition-colors duration-300"
          >
            Jetzt anmelden
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/wer-sind-wir')}
            className="btn-secondary text-base"
          >
            Mehr erfahren
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}
