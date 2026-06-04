import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import {
  HiUserGroup, HiHand, HiHeart, HiSparkles, HiGlobe
} from 'react-icons/hi'
import principles from '../data/principles.json'

const iconMap = {
  users: HiUserGroup,
  vote: HiHand,
  heart: HiHeart,
  sparkles: HiSparkles,
  mountain: HiGlobe,
}

export default function Principles() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="tag mb-4">Was uns ausmacht</span>
          <h2 className="section-title mb-4">Die fünf Grundsätze</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Diese Werte prägen unser Miteinander und geben unserer Arbeit Sinn und Richtung.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {principles.map((p, i) => {
            const Icon = iconMap[p.icon] || HiHeart
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white rounded-2xl p-6 shadow-jubla hover:shadow-jubla-lg transition-all duration-400 cursor-default border border-gray-100 hover:border-transparent overflow-hidden"
              >
                {/* Hover gradient background */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${p.color}08 0%, ${p.color}15 100%)`
                  }}
                />

                {/* Number badge */}
                <div className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: `${p.color}15` }}>
                  <span className="font-heading font-bold text-xs" style={{ color: p.color }}>{p.id}</span>
                </div>

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: p.bgColor }}
                >
                  <Icon size={26} style={{ color: p.color }} />
                </div>

                {/* Content */}
                <h3 className="font-heading font-bold text-lg text-jubla-dark mb-2 relative z-10">
                  {p.title}
                </h3>
                <p className="font-body text-sm text-jubla-gray leading-relaxed relative z-10">
                  {p.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                  style={{ background: p.color }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
