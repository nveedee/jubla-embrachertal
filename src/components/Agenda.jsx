import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import eventsData from '../data/events.json'
import { HiCalendar, HiLocationMarker, HiChevronRight } from 'react-icons/hi'

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('de-CH', { day: 'numeric', month: 'long', year: 'numeric' })
}

function formatDateShort(dateStr) {
  const date = new Date(dateStr)
  return {
    day: date.toLocaleDateString('de-CH', { day: '2-digit' }),
    month: date.toLocaleDateString('de-CH', { month: 'short' }),
    year: date.getFullYear(),
  }
}

function EventCard({ event, index, inView }) {
  const dateShort = formatDateShort(event.date)
  const isHighlight = event.highlight

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ x: 4 }}
      className={`group flex gap-4 bg-white rounded-2xl p-5 shadow-jubla hover:shadow-jubla-lg transition-all duration-300 border-l-4 ${
        isHighlight ? 'border-accent' : 'border-transparent hover:border-secondary'
      }`}
    >
      {/* Date block */}
      <div
        className="flex-shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center text-white shadow"
        style={{ background: event.color }}
      >
        <span className="font-heading font-black text-xl leading-none">{dateShort.day}</span>
        <span className="font-body text-xs uppercase tracking-wide opacity-90">{dateShort.month}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{event.emoji}</span>
            <h4 className="font-heading font-bold text-jubla-dark text-base truncate">
              {event.title}
            </h4>
            {isHighlight && (
              <span className="flex-shrink-0 bg-accent text-white text-xs font-body font-semibold px-2 py-0.5 rounded-full">
                Highlight
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <div className="flex items-center gap-1 text-jubla-gray">
            <HiCalendar size={12} />
            <span className="font-body text-xs">
              {formatDate(event.date)}{event.endDate && event.endDate !== event.date ? ` – ${formatDate(event.endDate)}` : ''}
            </span>
          </div>
          <div className="flex items-center gap-1 text-jubla-gray">
            <HiLocationMarker size={12} />
            <span className="font-body text-xs">{event.location}</span>
          </div>
        </div>
        <p className="font-body text-jubla-gray text-sm mt-2 line-clamp-2 leading-relaxed">
          {event.description}
        </p>
      </div>

      <HiChevronRight
        size={18}
        className="flex-shrink-0 text-jubla-gray group-hover:text-accent transition-colors mt-1"
      />
    </motion.div>
  )
}

export default function Agenda() {
  const navigate = useNavigate()
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <section id="agenda" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: Header + CTA */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="sticky top-24"
            >
              <span className="tag mb-4">Agenda</span>
              <h2 className="section-title mb-4">Nächste Events</h2>
              <p className="font-body text-jubla-gray leading-relaxed mb-8">
                Das ganze Jahr ist gefüllt mit spannenden Anlässen, unvergesslichen
                Lagern und gemeinsamen Abenteuern.
              </p>

              {/* Next highlight */}
              {eventsData.filter(e => e.highlight)[0] && (
                <div className="bg-gradient-jubla rounded-2xl p-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <span className="font-body text-xs text-white/70 uppercase tracking-wider">Nächstes Highlight</span>
                  <div className="text-4xl mt-2 mb-2">{eventsData.filter(e => e.highlight)[0].emoji}</div>
                  <h3 className="font-heading font-bold text-xl">
                    {eventsData.filter(e => e.highlight)[0].title}
                  </h3>
                  <p className="font-body text-white/70 text-sm mt-1">
                    {formatDate(eventsData.filter(e => e.highlight)[0].date)}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate('/anmeldung')}
                    className="mt-4 bg-white text-primary font-heading font-semibold text-sm px-5 py-2 rounded-full hover:bg-accent hover:text-white transition-all duration-300 inline-flex items-center gap-2"
                  >
                    Anmelden <HiChevronRight size={14} />
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right: Event list */}
          <div className="lg:col-span-2 space-y-4">
            {eventsData.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
