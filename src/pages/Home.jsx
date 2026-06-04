import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import Stats from '../components/Stats'

const quickNavCards = [
  { to: '/wer-sind-wir', title: 'Wer sind wir?', desc: 'Lerne uns und unsere Werte kennen' },
  { to: '/lager', title: 'Sommerlager', desc: 'Zwei Wochen Abenteuer in den Bergen' },
  { to: '/bilder', title: 'Bilder', desc: 'Einblicke in unsere unvergesslichen Momente' },
  { to: '/team', title: 'Team', desc: 'Die Menschen hinter der Jubla' },
  { to: '/agenda', title: 'Agenda', desc: 'Kommende Events und Termine' },
  { to: '/kontakt', title: 'Kontakt', desc: 'Fragen, Anmeldung, Infos' },
]

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />

      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {quickNavCards.map((card, i) => (
              <motion.div
                key={card.to}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link to={card.to} className="group block">
                  <div className="bg-white rounded-2xl p-7 shadow-jubla hover:shadow-jubla-lg border border-gray-50 hover:border-secondary/30 transition-all duration-300 group-hover:-translate-y-1">
                    <h3 className="font-heading font-bold text-xl text-jubla-dark group-hover:text-primary transition-colors duration-300 mb-2">
                      {card.title}
                    </h3>
                    <p className="font-body text-jubla-gray text-sm leading-relaxed">
                      {card.desc}
                    </p>
                    <div className="mt-4 flex items-center gap-1 font-body text-sm font-medium text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Mehr erfahren <span className="text-base">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
