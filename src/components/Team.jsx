import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import teamData from '../data/team.json'

const groups = ['Scharleitung', 'Leiterinnen & Leiter', 'Präses']

function TeamCard({ member, index, inView }) {
  const [imgError, setImgError] = useState(false)
  const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl p-5 shadow-jubla hover:shadow-jubla-lg transition-all duration-300 text-center border border-gray-50 group"
    >
      <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 ring-2 ring-gray-100 group-hover:ring-secondary/40 transition-all duration-300">
        {!imgError ? (
          <img
            src={`/${member.image}`}
            alt={member.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-jubla flex items-center justify-center">
            <span className="font-heading font-bold text-white text-xl">{initials}</span>
          </div>
        )}
      </div>

      <h3 className="font-heading font-bold text-jubla-dark text-sm leading-snug">
        {member.name}
      </h3>
      <p className="font-body text-xs text-secondary mt-1 leading-snug">
        {member.role}
      </p>
    </motion.div>
  )
}

export default function Team() {
  const navigate = useNavigate()
  const { ref, inView } = useInView({ threshold: 0.05 })

  return (
    <section id="team" className="py-24 bg-jubla-light relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="tag mb-4">Das Team</span>
          <h2 className="section-title mb-4">Leitungsteam</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Engagierte und ausgebildete Leitende sorgen für unvergessliche Erlebnisse
            und eine sichere Umgebung.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-14 rounded-3xl overflow-hidden shadow-jubla-lg"
        >
          <img
            src="/gruppenfoto.png"
            alt="Gruppenfoto Leitungsteam"
            className="w-full object-cover max-h-[650px]"
          />
        </motion.div>

        {groups.map((group) => {
          const members = teamData.filter(m => m.group === group)
          if (!members.length) return null
          return (
            <div key={group} className="mb-12">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="font-heading font-bold text-base text-primary mb-6 pb-2 border-b border-primary/20 uppercase tracking-wide"
              >
                {group}
              </motion.h3>
              <div className={`grid gap-4 ${
                group === 'Scharleitung'
                  ? 'grid-cols-2 sm:grid-cols-4'
                  : group === 'Präses'
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
                  : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
              }`}>
                {members.map((member, i) => (
                  <TeamCard key={member.id} member={member} index={i} inView={inView} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
