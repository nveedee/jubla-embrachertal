import { motion } from 'framer-motion'
import { HiMoon, HiSun } from 'react-icons/hi'
import { useTheme } from '../context/ThemeContext'

export default function DarkModeToggle() {
  const { darkMode, setDarkMode } = useTheme()

  return (
    <motion.button
      onClick={() => setDarkMode(!darkMode)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={darkMode ? 'Tagmodus' : 'Nachtmodus'}
      className="relative w-14 h-7 rounded-full bg-white/15 border border-white/25 focus:outline-none overflow-hidden"
    >
      {/* Track fill */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ opacity: darkMode ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: 'rgba(255,255,255,0.08)' }}
      />

      {/* Sliding thumb */}
      <motion.div
        animate={{ x: darkMode ? 28 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-1 w-5 h-5 rounded-full bg-white shadow flex items-center justify-center"
      >
        <motion.div
          animate={{ rotate: darkMode ? 0 : 180, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {darkMode
            ? <HiMoon size={11} className="text-[#283583]" />
            : <HiSun  size={11} className="text-yellow-500" />
          }
        </motion.div>
      </motion.div>
    </motion.button>
  )
}
