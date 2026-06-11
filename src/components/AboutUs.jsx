import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { HiCheckCircle, HiChevronRight } from 'react-icons/hi'

const highlights = [
  { text: 'Freunde fürs Leben finden', color: '#283583' },
  { text: 'Hochwertige Freizeitgestaltung', color: '#2598D5' },
  { text: 'Abenteuer erleben', color: '#283583' },
  { text: 'Gemeinschaft spüren', color: '#2598D5' },
  { text: 'Persönlich wachsen', color: '#283583' },
]

export default function AboutUs() {
  const navigate = useNavigate()
  const { ref, inView } = useInView({ threshold: 0.15 })

  return (
    <section id="ueber-uns" className="py-24 bg-jubla-light relative overflow-hidden">
      <div className="absolute top-10 right-0 w-96 h-96 bg-secondary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="tag mb-4">Über uns</span>
            <h2 className="section-title mb-6">
              Mehr als ein{' '}
              <span className="text-transparent bg-clip-text bg-gradient-jubla">Verein</span>
            </h2>
            <p className="font-body text-jubla-gray text-lg leading-relaxed mb-6">
              Die Jubla Embrachertal ist ein Ort, wo{' '}
              <strong className="text-primary">Lebensfreu(n)de</strong> entsteht.
              Seit über 20 Jahren begleiten wir Kinder und Jugendliche auf ihrem Weg –
              mit <strong className="text-secondary">Abenteuer</strong>, Kreativität
              und echter <strong className="text-primary">Gemeinschaft</strong>.
            </p>
            <p className="font-body text-jubla-gray text-lg leading-relaxed mb-8">
              Bei uns entstehen <strong className="text-secondary">Freunde fürs Leben</strong>.
              Durch hochwertige Freizeitgestaltung, spannende Lager und gemeinsame
              Erlebnisse wachsen Kinder zu selbstständigen, empathischen Menschen heran.
            </p>

            <div className="space-y-3 mb-8">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <HiCheckCircle size={20} style={{ color: h.color }} />
                  <span className="font-body font-medium text-jubla-dark">{h.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/gruppenstunde')}
              className="inline-flex items-center gap-2 bg-[#283583] hover:bg-[#1e2666] text-white font-heading font-semibold px-6 py-3 rounded-full transition-colors duration-300"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              Mach mit!
              <HiChevronRight />
            </motion.button>
          </motion.div>

          {/* Right: Gruppenfoto */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-jubla-lg">
              <img
                src="/gruppenfoto.png"
                alt="Jubla Embrachertal Team"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, type: 'spring' }}
              className="absolute -bottom-4 -right-4 bg-gradient-jubla text-white rounded-2xl px-5 py-3 shadow-jubla"
            >
              <div className="font-heading font-bold text-lg leading-none">20+</div>
              <div className="font-body text-xs text-white/80">Jahre Jubla</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, type: 'spring' }}
              className="absolute -top-4 -left-4 bg-white rounded-2xl px-5 py-3 shadow-jubla"
            >
              <div className="font-heading font-bold text-lg text-primary leading-none">30+</div>
              <div className="font-body text-xs text-jubla-gray">Mitglieder</div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
