import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  HiChevronRight, HiUserGroup, HiSun, HiPhotograph,
  HiUsers, HiCalendar, HiMail,
} from 'react-icons/hi'
import Hero from '../components/Hero'
import Stats from '../components/Stats'

const quickNavCards = [
  {
    to: '/wer-sind-wir',
    icon: HiUserGroup,
    title: 'Wer sind wir?',
    desc: 'Lerne uns und unsere Werte kennen',
    color: '#283583',
  },
  {
    to: '/lager',
    icon: HiSun,
    title: 'Sommerlager',
    desc: 'Zwei Wochen Abenteuer in den Bergen',
    color: '#2598D5',
  },
  {
    to: '/bilder',
    icon: HiPhotograph,
    title: 'Bilder',
    desc: 'Einblicke in unsere unvergesslichen Momente',
    color: '#E6007E',
  },
  {
    to: '/team',
    icon: HiUsers,
    title: 'Team',
    desc: 'Die Menschen hinter der Jubla',
    color: '#283583',
  },
  {
    to: '/agenda',
    icon: HiCalendar,
    title: 'Agenda',
    desc: 'Kommende Events und Termine',
    color: '#2598D5',
  },
  {
    to: '/kontakt',
    icon: HiMail,
    title: 'Kontakt',
    desc: 'Fragen, Anmeldung, Infos',
    color: '#E6007E',
  },
]

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />

      <section className="py-24 bg-white dark:bg-[#0f172a] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 dark:[&_h2]:text-white dark:[&_p]:text-slate-400">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="tag mb-4">Entdecke uns</span>
            <h2 className="section-title mb-4">Schnellnavigation</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Alles über die Jubla Embrachertal – finde schnell, was dich interessiert.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickNavCards.map((card, i) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.to}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <Link to={card.to} className="block group">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="relative bg-white dark:bg-[#1e293b] dark:border-slate-700 rounded-2xl p-6 border border-gray-100 overflow-hidden shadow-sm hover:shadow-jubla transition-shadow duration-300"
                      style={{ backgroundColor: card.color + '08' }}
                    >
                      {/* Left accent bar */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"
                        style={{ backgroundColor: '#E6007E' }}
                      />

                      {/* Icon badge */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: card.color + '18' }}
                      >
                        <Icon size={26} style={{ color: card.color }} />
                      </div>

                      {/* Text */}
                      <h3
                        className="font-heading font-bold text-lg mb-1.5 transition-colors duration-200"
                        style={{ color: card.color }}
                      >
                        {card.title}
                      </h3>
                      <p className="font-body text-jubla-gray dark:text-slate-400 text-sm leading-relaxed">
                        {card.desc}
                      </p>

                      {/* Arrow */}
                      <div className="flex justify-end mt-4">
                        <motion.div
                          className="w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200"
                          style={{ backgroundColor: card.color + '18' }}
                          whileHover={{ x: 3 }}
                        >
                          <HiChevronRight size={16} style={{ color: card.color }} />
                        </motion.div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
