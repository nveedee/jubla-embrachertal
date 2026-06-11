import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Wer sind wir?', to: '/wer-sind-wir' },
  { label: 'Lager', to: '/lager' },
  { label: 'Gruppenstunde', to: '/gruppenstunde' },
  { label: 'Bilder', to: '/bilder' },
  { label: 'Team', to: '/team' },
  { label: 'Kontakt', to: '/kontakt' },

]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#283583] shadow-jubla py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col leading-none">
                <span className="font-heading font-black text-white text-base">Jubla</span>
                <span className="font-body text-white/70 text-xs">Embrachertal</span>
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1 px-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="relative px-4 py-2 font-body font-medium text-sm text-white/90 hover:text-white transition-colors duration-300 rounded-full group"
                >
                  {link.label}
                  <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-white rounded-full transition-all duration-300 ${
                    isActive(link.to) ? 'w-4/5' : 'w-0 group-hover:w-4/5'
                  }`} />
                </Link>
              ))}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-white transition-colors"
            >
              {menuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="fixed inset-0 z-40 bg-primary md:hidden"
          >
            <div className="flex flex-col h-full justify-center items-center gap-6 px-8">
              {/* Close button */}
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-5 right-4 text-white p-2"
              >
                <HiX size={28} />
              </button>

              {/* Logo in mobile menu */}
              <div className="absolute top-5 left-4">
                <img
                  src="/logo.png"
                  alt="Jubla Embrachertal"
                  className="h-10 w-auto object-contain"
                />
              </div>

              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    to={link.to}
                    className="font-heading font-semibold text-3xl text-white hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
