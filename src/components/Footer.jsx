import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiHeart } from 'react-icons/hi'
import { FaInstagram } from 'react-icons/fa'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Wer sind wir?', to: '/wer-sind-wir' },
  { label: 'Lager', to: '/lager' },
  { label: 'Gruppenstunde', to: '/gruppenstunde' },
  { label: 'Bilder', to: '/bilder' },
  { label: 'Team', to: '/team' },
  { label: 'Agenda', to: '/agenda' },
  { label: 'Kontakt', to: '/kontakt' },
]

const socials = [
  { Icon: FaInstagram, href: 'https://www.instagram.com/jubla_embrachertal/', label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer className="bg-primary relative overflow-hidden">
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,20 Q360,40 720,20 Q1080,0 1440,20 L1440,0 L0,0 Z" fill="#F8FAFC" />
        </svg>
      </div>

      {/* Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img src="/logo.png" alt="Jubla Embrachertal" className="h-12 w-auto object-contain" />
            </div>
            <p className="font-body text-white/60 text-sm leading-relaxed mb-6">
              Lebensfreu(n)de erleben. Seit über 20 Jahren begleiten wir Kinder und
              Jugendliche im Embrachertal auf ihrem Weg zu Freunden fürs Leben.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  aria-label={label}
                  className="w-10 h-10 bg-white/10 hover:bg-accent rounded-xl flex items-center justify-center text-white transition-colors duration-300"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="font-body text-white/60 hover:text-white text-sm transition-colors duration-200 hover:pl-1 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Info */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4">Kontakt</h4>
            <div className="space-y-3 font-body text-sm text-white/60">
              <p>📍 Embrach, Kanton Zürich</p>
              <p>📧 hallo@jubla-embrachertal.ch</p>
              <p>📱 @jubla_embrachertal</p>
            </div>
            <div className="mt-6">
              <h4 className="font-heading font-bold text-white mb-3">Teil der</h4>
              <a
                href="https://www.jubla.ch/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-xs font-body px-3 py-1 rounded-full transition-colors duration-200"
              >
                Jubla Schweiz
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-white/40 text-xs">
            © {new Date().getFullYear()} Jubla Embrachertal. Alle Rechte vorbehalten.
          </p>
          <p className="font-body text-white/40 text-xs flex items-center gap-1">
            Gemacht mit <HiHeart className="text-accent" size={12} /> im Embrachertal
          </p>
        </div>
      </div>
    </footer>
  )
}
