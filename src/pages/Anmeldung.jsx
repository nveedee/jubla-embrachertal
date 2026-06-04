import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiDownload, HiCalendar, HiUserGroup, HiCurrencyDollar, HiChevronRight } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'
import PageHeader from '../components/PageHeader'

const groups = [
  { name: 'Jublinis', age: '1. Kindergarten – 1. Klasse', note: 'Nach Absprache früher möglich' },
  { name: 'Wildi Füchsli', age: '2. – 5. Klasse', note: 'Mädchengruppe' },
  { name: 'Kaugummischlangä', age: '2. – 5. Klasse', note: 'Jungsgruppe' },
  { name: '15ner', age: '6. Klasse – 3. Oberstufe', note: '' },
]

export default function Anmeldung() {
  return (
    <main>
      <PageHeader
        title="Anmeldung"
        subtitle="Jetzt anmelden und Teil der Jubla Embrachertal werden!"
        waveFill="#F8FAFC"
      />

      <section className="py-24 bg-jubla-light relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* Gruppenstunde */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-jubla-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-jubla p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '28px 28px' }} />
              <div className="relative z-10">
                <span className="font-body text-white/70 text-xs uppercase tracking-widest">Ganzjährig</span>
                <h2 className="font-heading font-black text-3xl mt-1">Anmeldung Gruppenstunde</h2>
                <p className="font-body text-white/80 mt-2">Einmal im Monat gemeinsam spielen, lachen und neue Freunde finden.</p>
              </div>
            </div>

            <div className="p-8">
              {/* Info-Kacheln */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-jubla-light rounded-2xl p-4 text-center">
                  <HiCalendar className="text-primary mx-auto mb-2" size={22} />
                  <p className="font-heading font-bold text-jubla-dark text-sm">1× pro Monat</p>
                  <p className="font-body text-jubla-gray text-xs mt-0.5">14:00 – 16:00 Uhr</p>
                </div>
                <div className="bg-jubla-light rounded-2xl p-4 text-center">
                  <HiCurrencyDollar className="text-primary mx-auto mb-2" size={22} />
                  <p className="font-heading font-bold text-jubla-dark text-sm">CHF 50.–</p>
                  <p className="font-body text-jubla-gray text-xs mt-0.5">Jahresbeitrag</p>
                </div>
                <div className="bg-jubla-light rounded-2xl p-4 text-center">
                  <HiUserGroup className="text-primary mx-auto mb-2" size={22} />
                  <p className="font-heading font-bold text-jubla-dark text-sm">Alle willkommen</p>
                  <p className="font-body text-jubla-gray text-xs mt-0.5">Kein Glauben nötig</p>
                </div>
              </div>

              {/* Gruppen */}
              <h3 className="font-heading font-bold text-primary mb-4">Unsere Gruppen</h3>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {groups.map(g => (
                  <div key={g.name} className="flex items-start gap-3 bg-jubla-light rounded-xl p-4">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="font-heading font-bold text-jubla-dark text-sm">{g.name}</p>
                      <p className="font-body text-jubla-gray text-xs">{g.age}</p>
                      {g.note && <p className="font-body text-jubla-gray text-xs italic">{g.note}</p>}
                    </div>
                  </div>
                ))}
              </div>

              {/* How to register */}
              <h3 className="font-heading font-bold text-primary mb-4">So meldest du dich an</h3>
              <ol className="space-y-3 font-body text-jubla-gray mb-8">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                  Lade das Anmeldeformular als PDF herunter
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                  Fülle es vollständig aus und unterschreibe es
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                  Sende es per WhatsApp an Jil, Noel oder Linus
                </li>
              </ol>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  href="/Anmeldung-Gruppenstunde-Stand-2026-Google-Docs.pdf"
                  download
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-heading font-semibold px-6 py-4 rounded-2xl transition-colors duration-300 shadow-jubla"
                >
                  <HiDownload size={20} />
                  Formular herunterladen
                </motion.a>
                <motion.a
                  href="https://wa.me/41794513581"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5a] text-white font-heading font-semibold px-6 py-4 rounded-2xl transition-colors duration-300"
                >
                  <FaWhatsapp size={20} />
                  WhatsApp Jil / Noel / Linus
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Sommerlager teaser */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white rounded-3xl shadow-jubla overflow-hidden"
          >
            <div className="bg-primary/5 border border-primary/10 p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-1">
                <span className="font-body text-secondary text-xs uppercase tracking-widest">11. – 18. Juli 2026</span>
                <h2 className="font-heading font-black text-2xl text-primary mt-1">Anmeldung Sommerlager 2026</h2>
                <p className="font-body text-jubla-gray mt-2 text-sm leading-relaxed">
                  Sedrun, Graubünden – Ustria Planatsch. Anmeldeschluss 20. Juni 2026.
                </p>
              </div>
              <Link to="/lager">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-heading font-semibold px-6 py-4 rounded-2xl transition-colors duration-300 shadow-jubla whitespace-nowrap"
                >
                  Zur Sola-Anmeldung
                  <HiChevronRight size={18} />
                </motion.div>
              </Link>
            </div>
          </motion.div>

        </div>
      </section>
    </main>
  )
}
