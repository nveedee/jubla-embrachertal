import { motion } from 'framer-motion'
import { HiDownload, HiCalendar, HiCurrencyDollar, HiUserGroup, HiPhone, HiDocumentText } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'
import PageHeader from '../components/PageHeader'

const groups = [
  {
    name: 'Jublinis',
    age: '1. Kindergarten – 1. Klasse',
    note: 'Nach Absprache früher möglich',
    color: '#283583',
    leaders: ['Noel', 'Linus', 'Livia', 'Melvin'],
    pdf: '/Halbjahresprogramm_Jublinis_2026.pdf',
  },
  {
    name: 'Wildi Füchsli',
    age: '2. – 5. Klasse',
    note: 'Mädchengruppe',
    color: '#2598D5',
    leaders: ['Valentina', 'Alisha', 'Jil'],
    pdf: '/Halbjahresprogramm_Girls_2026.pdf',
  },
  {
    name: 'Kaugummischlangä',
    age: '2. – 5. Klasse',
    note: 'Jungsgruppe',
    color: '#283583',
    leaders: ['Matteo', 'Fernando', 'Lars', 'Jay'],
    pdf: '/Halbjahresprogramm Kaugummischlangä (1).pdf',
  },
  {
    name: '15ner',
    age: '6. Klasse – 3. Oberstufe',
    note: 'Für junge Jugendliche',
    color: '#2598D5',
    leaders: ['Tina', 'Yannis', 'Nina', 'Marlon'],
    pdf: '/Halbjahresprogramm_15ner_2026.pdf',
  },
]

export default function Gruppenstunde() {
  return (
    <main>
      <PageHeader
        title="Gruppenstunde"
        subtitle="Einmal im Monat zusammen spielen, lachen und Freunde finden."
        waveFill="#F8FAFC"
      />

      <section className="py-24 bg-jubla-light relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-3 gap-4 mb-10"
          >
            {[
              { icon: HiCalendar, label: '1× pro Monat', sub: 'Samstag, 14:00 – 16:00 Uhr' },
              { icon: HiCurrencyDollar, label: 'CHF 50.–', sub: 'Jahresbeitrag' },
              { icon: HiUserGroup, label: 'Alle willkommen', sub: '' },
            ].map(({ icon: Icon, label, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-jubla text-center"
              >
                <Icon className="text-primary mx-auto mb-2" size={24} />
                <p className="font-heading font-bold text-jubla-dark text-sm">{label}</p>
                <p className="font-body text-jubla-gray text-xs mt-1">{sub}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Groups */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white rounded-3xl shadow-jubla p-8 mb-8"
          >
            <h2 className="font-heading font-bold text-2xl text-primary mb-6">Unsere Gruppen</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {groups.map((g, i) => (
                <motion.div
                  key={g.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.2 }}
                  className="rounded-2xl p-5 border-l-4 bg-jubla-light"
                  style={{ borderColor: g.color }}
                >
                  <h3 className="font-heading font-bold" style={{ color: g.color }}>
                    {g.name}
                  </h3>
                  <p className="font-body text-jubla-dark text-sm mt-1">{g.age}</p>
                  {g.note && <p className="font-body text-jubla-gray text-xs mt-0.5 italic">{g.note}</p>}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {g.leaders.map(l => (
                      <span
                        key={l}
                        className="text-xs font-body font-medium px-2.5 py-1 rounded-full text-white"
                        style={{ backgroundColor: g.color }}
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                  {g.pdf && (
                    <button
                      onClick={() => window.open(g.pdf, '_blank')}
                      className="mt-4 flex items-center gap-2 bg-[#283583] hover:bg-[#1e2666] text-white font-heading font-semibold text-xs px-4 py-2 rounded-full transition-colors duration-200"
                    >
                      <HiDocumentText size={14} />
                      Halbjahresprogramm ansehen
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Registration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="bg-white rounded-3xl shadow-jubla p-8 mb-8"
          >
            <h2 className="font-heading font-bold text-2xl text-primary mb-2">Anmeldung</h2>
            <p className="font-body text-jubla-gray mb-6">
              Formular herunterladen, ausfüllen und per WhatsApp an Jil oder Dean senden.
            </p>

            <ol className="space-y-3 font-body text-jubla-gray mb-8">
              {[
                'Anmeldeformular als PDF herunterladen',
                'Vollständig ausfüllen und unterschreiben',
                'Per WhatsApp an Jil, Noel oder Linus senden',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

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
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="bg-gradient-jubla rounded-3xl p-8 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '28px 28px' }} />
            <div className="relative z-10">
              <h3 className="font-heading font-bold text-xl mb-4">Fragen? Meld dich bei uns!</h3>
              <div className="flex flex-col sm:flex-row gap-6">
                {[
                  { name: 'Jil Grabner',      phone: '+41 79 451 35 81', wa: 'https://wa.me/41794513581' },
                  { name: 'Noel von Däniken', phone: '+41 76 544 40 95', wa: 'https://wa.me/41765444095' },
                  { name: 'Linus Kreis',      phone: '+41 76 574 82 23', wa: 'https://wa.me/41765748223' },
                ].map(p => (
                  <div key={p.name} className="flex items-center gap-4">
                    <div>
                      <p className="font-heading font-semibold">{p.name}</p>
                      <a href={`tel:${p.phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-body transition-colors mt-0.5">
                        <HiPhone size={13} /> {p.phone}
                      </a>
                    </div>
                    <a
                      href={p.wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5a] text-white text-xs font-heading font-semibold px-3 py-2 rounded-xl transition-colors"
                    >
                      <FaWhatsapp size={14} /> WhatsApp
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </main>
  )
}
