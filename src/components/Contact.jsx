import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { HiLocationMarker, HiPhone } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'

const contacts = [
  {
    name: 'Jil Grabner',
    role: 'Scharleitung',
    phone: '+41 79 451 35 81',
    whatsapp: 'https://wa.me/41794513581',
    image: 'jil.png',
  },
  {
    name: 'Noel von Däniken',
    role: 'Scharleitung',
    phone: '+41 76 544 40 95',
    whatsapp: 'https://wa.me/41765444095',
    image: 'noel.png',
  },
  {
    name: 'Linus Kreis',
    role: 'Scharleitung',
    phone: '+41 76 574 82 23',
    whatsapp: 'https://wa.me/41765748223',
    image: 'linus.png',
  },
]

function MapPlaceholder() {
  return (
    <div className="w-full h-64 rounded-2xl overflow-hidden">
      <iframe
        title="Jubla Embrachertal Standort"
        src="https://maps.google.com/maps?q=Steinackerweg+22,+8424+Embrach,+Schweiz&output=embed&z=15"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}

function ContactCard({ person, index, inView }) {
  const [imgError, setImgError] = useState(false)
  const initials = person.name.split(' ').map(n => n[0]).join('').toUpperCase()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="bg-white rounded-3xl p-8 shadow-jubla hover:shadow-jubla-lg transition-all duration-300 flex flex-col items-center text-center"
    >
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 ring-jubla-light">
        {!imgError ? (
          <img
            src={`/${person.image}`}
            alt={person.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-jubla flex items-center justify-center">
            <span className="font-heading font-bold text-white text-2xl">{initials}</span>
          </div>
        )}
      </div>

      <h3 className="font-heading font-bold text-xl text-jubla-dark">{person.name}</h3>
      <p className="font-body text-sm text-secondary mt-1 mb-6">{person.role}</p>

      <a
        href={`tel:${person.phone.replace(/\s/g, '')}`}
        className="flex items-center gap-2 text-jubla-gray hover:text-primary transition-colors duration-200 font-body text-sm mb-6"
      >
        <HiPhone size={16} />
        {person.phone}
      </a>

      <motion.a
        href={person.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5a] text-white font-heading font-semibold px-6 py-3 rounded-xl transition-colors duration-300"
      >
        <FaWhatsapp size={18} />
        WhatsApp {person.name.split(' ')[0]}
      </motion.a>
    </motion.div>
  )
}

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <section id="kontakt" className="py-24 bg-jubla-light relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="tag mb-4">Kontakt</span>
          <h2 className="section-title mb-4">Melde dich bei uns!</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Zögere nicht, uns zu kontaktieren! Wir freuen uns auf deine Nachricht –
            ob Fragen, Ideen oder Anmeldungen.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          {contacts.map((person, i) => (
            <ContactCard key={person.name} person={person} index={i} inView={inView} />
          ))}
        </div>

        {/* Address + Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-3xl p-8 shadow-jubla"
        >
          <div className="flex items-center gap-2 text-primary font-heading font-semibold mb-4">
            <HiLocationMarker size={20} />
            Steinackerweg 22, 8424 Embrach
          </div>
          <MapPlaceholder />
        </motion.div>
      </div>
    </section>
  )
}
