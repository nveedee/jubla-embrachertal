import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const LAGER_DATE = new Date('2026-07-11T08:00:00')

function getTimeLeft() {
  const now = new Date()
  const diff = LAGER_DATE - now
  if (diff <= 0) return null
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function CountdownUnit({ value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="relative">
        <div
          className="w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center shadow-jubla-lg relative overflow-hidden"
          style={{ background: '#283583' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <motion.span
            key={value}
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="font-heading font-black text-3xl md:text-5xl text-white tabular-nums relative z-10"
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#E6007E]" />
      </div>
      <span className="font-body font-semibold text-xs md:text-sm text-jubla-gray dark:text-slate-400 mt-3 uppercase tracking-widest">
        {label}
      </span>
    </motion.div>
  )
}

function Separator() {
  return (
    <motion.span
      animate={{ opacity: [1, 0.2, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
      className="font-heading font-black text-4xl text-primary/30 mb-6 hidden sm:block"
    >
      :
    </motion.span>
  )
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())
  const { ref, inView } = useInView({ threshold: 0.2 })

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!timeLeft) {
    return (
      <section className="py-16 bg-white dark:bg-[#0f172a]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl text-primary">
            Das Sommerlager läuft gerade!
          </h2>
          <p className="font-body text-jubla-gray dark:text-slate-400 mt-2">
            Wir sind im Lager – bis bald!
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-[#0f172a] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-[#283583]/10 text-[#283583] rounded-full px-5 py-2 text-sm font-body font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-[#E6007E] animate-pulse" />
            Sommerlager 2026
          </span>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-primary dark:text-white mb-3">
            Noch so lange bis zum Lager!
          </h2>
          <p className="font-body text-jubla-gray dark:text-slate-400 text-lg">
            11. – 18. Juli 2026 · Sedrun, Graubünden
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap">
          <CountdownUnit value={timeLeft.days}    label="Tage"     delay={0.1} />
          <Separator />
          <CountdownUnit value={timeLeft.hours}   label="Stunden"  delay={0.2} />
          <Separator />
          <CountdownUnit value={timeLeft.minutes} label="Minuten"  delay={0.3} />
          <Separator />
          <CountdownUnit value={timeLeft.seconds} label="Sekunden" delay={0.4} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="font-body text-jubla-gray dark:text-slate-400 mb-4">
            Noch nicht angemeldet?
          </p>
          <Link
            to="/lager"
            className="inline-flex items-center gap-2 bg-[#283583] hover:bg-[#1e2666] text-white font-heading font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-jubla-lg hover:-translate-y-0.5"
          >
            Jetzt zum Sommerlager anmelden →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
