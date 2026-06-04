import Gallery from '../components/Gallery'
import PageHeader from '../components/PageHeader'

export default function Bilder() {
  return (
    <main>
      <PageHeader
        title="Bilder"
        subtitle="Einblicke in unsere unvergesslichen Momente."
        emoji="📸"
      />
      <Gallery />
    </main>
  )
}
