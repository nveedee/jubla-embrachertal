import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { useCounterAnimation } from '../hooks/useCounterAnimation'

const stats = [
  { value: 30, suffix: '', label: 'Teilnehmer', emoji: '👧🏻', desc: 'aktive Mitglieder' },
  { value: 17, suffix: '', label: 'Leitende', emoji: '🧭', desc: 'engagierte Leitpersonen' },
  { value: 20, suffix: '', label: 'Sommerlager', emoji: '⛺', desc: 'unvergessliche Erlebnisse' },
  { value: 1, suffix: '', label: 'Lager pro Jahr', emoji: '🏆', desc: 'das grosse Sommerlager' },
]

function StatItem({ stat, isVisible }) {
  const { count, start } = useCounterAnimation(stat.value, 2000)

  useEffect(() => {
    if (isVisible) start()
  }, [isVisible])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center text-center group"
    >
      <div className="font-heading font-black text-5xl md:text-6xl text-primary counter-value">
        {count}{stat.suffix}
      </div>
      <div className="font-heading font-bold text-xl text-jubla-dark mt-2">
        {stat.label}
      </div>
      <div className="font-body text-sm text-jubla-gray mt-1">
        {stat.desc}
      </div>
    </motion.div>
  )
}

export default function Stats() {
  const { ref, inView } = useInView({ threshold: 0.3 })

  return (
    <section id="stats" className="py-20 bg-jubla-light relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="tag mb-4">In Zahlen</span>
          <h2 className="section-title">Die Jubla Embrachertal</h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <StatItem stat={stat} isVisible={inView} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
