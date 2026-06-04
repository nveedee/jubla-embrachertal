import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const stars = [
  { x: 6,  y: 4,  r: 1.2, delay: 0 },
  { x: 16, y: 7,  r: 0.9, delay: 0.15 },
  { x: 11, y: 12, r: 0.8, delay: 0.3 },
  { x: 24, y: 5,  r: 1,   delay: 0.1 },
  { x: 30, y: 10, r: 0.7, delay: 0.25 },
]

export default function DarkModeToggle() {
  const { darkMode, setDarkMode } = useTheme()

  return (
    <motion.button
      onClick={() => setDarkMode(!darkMode)}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      title={darkMode ? 'Tagmodus' : 'Nachtmodus'}
      className="relative rounded-full overflow-hidden border border-white/25 focus:outline-none flex-shrink-0"
      style={{ width: 72, height: 34 }}
    >
      {/* Sky background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: darkMode
            ? 'linear-gradient(to bottom, #0a1628 0%, #1e2d5a 100%)'
            : 'linear-gradient(to bottom, #38bdf8 0%, #7dd3fc 100%)',
        }}
        transition={{ duration: 0.6 }}
      />

      {/* Stars */}
      <AnimatePresence>
        {darkMode && stars.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0.5, 1, 0.5], scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              opacity: { repeat: Infinity, duration: 1.5 + i * 0.4, delay: s.delay },
              scale: { duration: 0.3, delay: s.delay },
            }}
            className="absolute rounded-full bg-white"
            style={{ left: s.x, top: s.y, width: s.r * 2, height: s.r * 2 }}
          />
        ))}
      </AnimatePresence>

      {/* Cloud (light mode) */}
      <AnimatePresence>
        {!darkMode && (
          <motion.svg
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 0.9, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.4 }}
            className="absolute"
            style={{ top: 5, left: 4 }}
            width="20" height="10" viewBox="0 0 20 10"
          >
            <ellipse cx="10" cy="7" rx="9" ry="4" fill="white" />
            <ellipse cx="7"  cy="5" rx="5" ry="4" fill="white" />
            <ellipse cx="13" cy="5" rx="4" ry="3" fill="white" />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Ground */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: 10 }}
        animate={{ background: darkMode ? '#0d1f3c' : '#22c55e' }}
        transition={{ duration: 0.5 }}
      />

      {/* Hill (light mode) */}
      <AnimatePresence>
        {!darkMode && (
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-0 right-0"
            width="30" height="14" viewBox="0 0 30 14"
          >
            <ellipse cx="20" cy="14" rx="18" ry="10" fill="#16a34a" />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Tent (dark mode) */}
      <AnimatePresence>
        {darkMode && (
          <motion.svg
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="absolute bottom-2 left-2"
            width="16" height="12" viewBox="0 0 16 12"
          >
            {/* Tent body */}
            <polygon points="8,0 0,12 16,12" fill="#2598D5" />
            {/* Tent shadow side */}
            <polygon points="8,0 5,12 11,12" fill="#283583" />
            {/* Door */}
            <path d="M6,12 Q8,8 10,12 Z" fill="#0a1628" />
            {/* Guy rope left */}
            <line x1="8" y1="0" x2="1" y2="8" stroke="#2598D5" strokeWidth="0.6" opacity="0.5" />
            {/* Guy rope right */}
            <line x1="8" y1="0" x2="15" y2="8" stroke="#2598D5" strokeWidth="0.6" opacity="0.5" />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Tree (light mode) */}
      <AnimatePresence>
        {!darkMode && (
          <motion.svg
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-2 left-3"
            width="10" height="12" viewBox="0 0 10 12"
          >
            <polygon points="5,0 0,8 10,8" fill="#15803d" />
            <polygon points="5,3 1,9 9,9" fill="#16a34a" />
            <rect x="4" y="9" width="2" height="3" fill="#92400e" />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Sun / Moon orb */}
      <motion.div
        animate={{ x: darkMode ? 38 : 4 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        className="absolute top-[5px]"
        style={{ width: 24, height: 24 }}
      >
        <AnimatePresence mode="wait">
          {darkMode ? (
            <motion.svg
              key="moon"
              initial={{ opacity: 0, rotate: -30, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 30, scale: 0.6 }}
              transition={{ duration: 0.35 }}
              width="24" height="24" viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="11" fill="#fef9c3" />
              {/* Crescent shadow */}
              <circle cx="16" cy="9" r="8.5" fill="#1e2d5a" />
              {/* Craters */}
              <circle cx="7"  cy="13" r="1.5" fill="#fde68a" opacity="0.6" />
              <circle cx="10" cy="8"  r="1"   fill="#fde68a" opacity="0.5" />
              <circle cx="5"  cy="8"  r="0.8" fill="#fde68a" opacity="0.4" />
            </motion.svg>
          ) : (
            <motion.svg
              key="sun"
              initial={{ opacity: 0, rotate: 30, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -30, scale: 0.6 }}
              transition={{ duration: 0.35 }}
              width="24" height="24" viewBox="0 0 24 24"
            >
              {/* Rays */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
                <line
                  key={a}
                  x1={12 + 7 * Math.cos(a * Math.PI / 180)}
                  y1={12 + 7 * Math.sin(a * Math.PI / 180)}
                  x2={12 + 10 * Math.cos(a * Math.PI / 180)}
                  y2={12 + 10 * Math.sin(a * Math.PI / 180)}
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ))}
              {/* Sun body */}
              <circle cx="12" cy="12" r="6" fill="#fbbf24" />
              <circle cx="12" cy="12" r="4.5" fill="#fde68a" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  )
}
