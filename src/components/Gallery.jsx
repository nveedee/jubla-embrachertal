import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { HiX, HiChevronLeft, HiChevronRight, HiZoomIn } from 'react-icons/hi'

// Fotos hier einfach nummerieren — foto1.png, foto2.png, usw.
const FOTO_COUNT = 12

const galleryItems = Array.from({ length: FOTO_COUNT }, (_, i) => ({
  id: i + 1,
  image: `foto${i + 1}.png`,
}))

function GalleryItem({ item, onClick, index, inView }) {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)

  if (imgError) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-2xl cursor-pointer group bg-jubla-light"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(item.id)}
    >
      <img
        src={`/fotos/${item.image}`}
        alt={`Foto ${item.id}`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={() => setImgError(true)}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute inset-0 bg-black/30 flex items-center justify-center"
      >
        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
          <HiZoomIn size={18} className="text-primary" />
        </div>
      </motion.div>
    </motion.div>
  )
}

function Lightbox({ items, activeIndex, onClose, onPrev, onNext }) {
  const item = items[activeIndex]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={`/fotos/${item.image}`}
          alt={`Foto ${item.id}`}
          className="w-full max-h-[80vh] object-contain rounded-2xl"
        />

        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-jubla-light transition-colors"
        >
          <HiX size={18} />
        </button>
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
        >
          <HiChevronLeft size={18} />
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
        >
          <HiChevronRight size={18} />
        </button>

        <div className="text-center text-white/50 text-sm mt-4 font-body">
          {activeIndex + 1} / {items.length}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Gallery() {
  const { ref, inView } = useInView({ threshold: 0.1 })
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const openLightbox = (id) => {
    setLightboxIndex(galleryItems.findIndex(i => i.id === id))
  }
  const closeLightbox = () => setLightboxIndex(null)
  const prevItem = () => setLightboxIndex(i => (i - 1 + galleryItems.length) % galleryItems.length)
  const nextItem = () => setLightboxIndex(i => (i + 1) % galleryItems.length)

  return (
    <section id="galerie" className="py-24 bg-white dark:bg-[#0f172a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="tag mb-4">Eindrücke</span>
          <h2 className="section-title mb-4">Galerie</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Einblicke in unsere unvergesslichen Momente – Lager, Ausflüge und gemeinsame Abenteuer.
          </p>
        </motion.div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryItems.map((item, i) => (
            <div key={item.id} className="break-inside-avoid">
              <GalleryItem
                item={item}
                onClick={openLightbox}
                index={i}
                inView={inView}
              />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10"
        >
          <p className="font-body text-jubla-gray text-sm mb-4">
            Folge uns auf Instagram für noch mehr Eindrücke
          </p>
          <a
            href="https://www.instagram.com/jubla_embrachertal/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Instagram öffnen
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={galleryItems}
            activeIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevItem}
            onNext={nextItem}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
