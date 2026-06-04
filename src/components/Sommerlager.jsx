import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { HiDownload, HiMail, HiShieldCheck, HiUsers, HiStar, HiCamera, HiCalendar, HiLocationMarker, HiCurrencyDollar, HiUserGroup, HiPhone } from 'react-icons/hi'

const keyInfo = [
  {
    icon: HiCalendar,
    label: 'Datum',
    value: '11. – 18. Juli 2026',
    sub: 'Samstag bis Samstag',
  },
  {
    icon: HiLocationMarker,
    label: 'Ort',
    value: 'Sedrun, Graubünden',
    sub: 'Ustria Planatsch',
  },
  {
    icon: HiCurrencyDollar,
    label: 'Kosten',
    value: 'Fr. 260.–',
    sub: 'Geschwister je Fr. 240.–',
  },
  {
    icon: HiUserGroup,
    label: 'Alter',
    value: '1. Klasse – 3. Oberstufe',
    sub: 'Beschränkte Anzahl Plätze',
  },
]

const features = [
  {
    icon: HiStar,
    title: 'Unvergessliche Erlebnisse',
    desc: 'Coole Spiele, spannende Ausflüge und Lagerfeuer-Momente, die ein Leben lang bleiben.',
    bg: '#EEF0F9',
    color: '#283583',
  },
  {
    icon: HiUsers,
    title: 'Echte Gemeinschaft',
    desc: 'Neue Freundschaften entstehen, alte vertiefen sich. Das Lager schweisst zusammen.',
    bg: '#E8F5FB',
    color: '#2598D5',
  },
  {
    icon: HiShieldCheck,
    title: 'Beste Betreuung',
    desc: 'Ausgebildete Leitende sorgen für Sicherheit und eine geborgene Atmosphäre.',
    bg: '#E8F5FB',
    color: '#2598D5',
  },
  {
    icon: HiCamera,
    title: 'Lagerimpressionen',
    desc: 'Jeder Tag wird festgehalten – Fotos und Erinnerungen die ein Leben lang begleiten.',
    bg: '#EEF0F9',
    color: '#283583',
  },
]

export default function Sommerlager() {
  const { ref, inView } = useInView({ threshold: 0.05 })

  return (
    <section id="sommerlager" className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white rounded-full px-5 py-2 text-sm font-body font-medium mb-6">
            Anmeldung offen
          </span>
          <h2 className="font-heading font-black text-4xl md:text-6xl text-white mb-6">
            Sommerlager 2026
          </h2>
          <p className="font-body text-white/80 text-lg max-w-2xl mx-auto leading-relaxed mb-4">
            Unser Sommerlager 2025 war ein riesiges Abenteuer – wir haben zusammen gelacht,
            gespielt, Neues gelernt und jede Menge tolle Erinnerungen gesammelt.
          </p>
          <p className="font-body text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Jetzt geht es in die nächste Runde! Das Sommerlager 2026 steht vor der Tür –
            sichere dir jetzt deinen Platz und sei dabei!
          </p>
        </motion.div>

        {/* Key info cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {keyInfo.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 + 0.2 }}
                className="bg-white/10 border border-white/20 rounded-2xl p-5 text-white"
              >
                <Icon size={20} className="text-secondary mb-3" />
                <p className="font-body text-white/60 text-xs uppercase tracking-wide mb-1">{item.label}</p>
                <p className="font-heading font-bold text-sm leading-snug">{item.value}</p>
                <p className="font-body text-white/50 text-xs mt-1">{item.sub}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* PDF Download Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="bg-white rounded-3xl p-8 md:p-10 shadow-jubla-lg mb-10"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="inline-block bg-secondary/10 text-secondary text-xs font-heading font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                Anmeldeschluss 20. Juni 2026
              </div>
              <h3 className="font-heading font-bold text-2xl text-primary mb-3">
                So meldest du dich an
              </h3>
              <ol className="space-y-3 font-body text-jubla-gray">
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
                  Scanne es ein und sende es per E-Mail zurück
                </li>
              </ol>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              <motion.a
                href="/Anmeldung_Sola26.pdf"
                download
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-heading font-semibold px-8 py-4 rounded-2xl transition-colors duration-300 shadow-jubla"
              >
                <HiDownload size={20} />
                Anmeldung herunterladen
              </motion.a>
              <motion.a
                href="mailto:mia-sollberger@bluewin.ch?subject=Anmeldung Sommerlager 2026"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 bg-jubla-light hover:bg-gray-100 text-primary font-heading font-semibold px-8 py-4 rounded-2xl transition-colors duration-300 border border-gray-200"
              >
                <HiMail size={20} />
                Per Mail senden
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Schnupper-Sommerlager + Infoabend */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white/10 border border-white/20 rounded-2xl p-6 text-white"
          >
            <p className="font-body text-white/50 text-xs uppercase tracking-wide mb-2">Für Neulinge</p>
            <h4 className="font-heading font-bold text-lg mb-2">Schnupper-Sommerlager</h4>
            <p className="font-body text-white/70 text-sm leading-relaxed mb-4">
              Sa. 09. – So. 10. Mai 2026 (14:00 – 10:00 Uhr)<br />
              Ein actionreiches Wochenende, um herauszufinden wie es ist, nicht zuhause zu schlafen.
            </p>
            <a
              href="tel:+41794513581"
              className="flex items-center gap-2 text-secondary hover:text-white transition-colors text-sm font-body"
            >
              <HiPhone size={14} />
              Jil Grabner – 079 451 35 81
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/10 border border-white/20 rounded-2xl p-6 text-white"
          >
            <p className="font-body text-white/50 text-xs uppercase tracking-wide mb-2">Obligatorisch</p>
            <h4 className="font-heading font-bold text-lg mb-2">Infoabend</h4>
            <p className="font-body text-white/70 text-sm leading-relaxed mb-4">
              04. Juni 2026, 19:30 Uhr<br />
              Kath. Kirchenzentrum Embrach, Steinackerweg 22<br />
              Für alle angemeldeten Kinder und deren Eltern.
            </p>
            <p className="font-body text-white/50 text-xs">
              Abgabe der Sola-Infozeitung
            </p>
          </motion.div>
        </div>

        {/* Lagerleitung + Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="bg-white rounded-3xl p-8 shadow-jubla-lg mb-10"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-heading font-bold text-lg text-primary mb-4">Lagerleitung & Auskünfte</h4>
              <div className="space-y-4">
                {[
                  { name: 'Mia Sollberger', phone: '079 630 48 01', mail: 'mia-sollberger@bluewin.ch' },
                  { name: 'Valentina Schäfer', phone: '077 479 71 95', mail: 'valentina.siena.schaefer@gmail.com' },
                ].map(p => (
                  <div key={p.name} className="flex flex-col gap-1">
                    <span className="font-heading font-semibold text-jubla-dark text-sm">{p.name}</span>
                    <a href={`tel:${p.phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 text-jubla-gray hover:text-primary text-xs font-body transition-colors">
                      <HiPhone size={12} /> {p.phone}
                    </a>
                    <a href={`mailto:${p.mail}`} className="flex items-center gap-1.5 text-jubla-gray hover:text-primary text-xs font-body transition-colors">
                      <HiMail size={12} /> {p.mail}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-heading font-bold text-lg text-primary mb-4">
                <span className="flex items-center gap-2"><HiLocationMarker className="text-secondary" /> Sedrun, Graubünden</span>
              </h4>
              <div className="rounded-2xl overflow-hidden h-44">
                <iframe
                  title="Sommerlager Standort"
                  src="https://maps.google.com/maps?q=Ustria+Planatsch,+Sedrun,+Schweiz&output=embed&z=13"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i + 0.5, duration: 0.6 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: f.bg }}>
                  <Icon size={22} style={{ color: f.color }} />
                </div>
                <h4 className="font-heading font-semibold text-white mb-2">{f.title}</h4>
                <p className="font-body text-white/60 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
