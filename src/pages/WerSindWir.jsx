import AboutUs from '../components/AboutUs'
import Principles from '../components/Principles'
import PageHeader from '../components/PageHeader'

export default function WerSindWir() {
  return (
    <main>
      <PageHeader
        title="Wer sind wir?"
        subtitle="Mehr als ein Verein – eine Gemeinschaft fürs Leben."
        emoji="🤝"
      />
      <AboutUs />
      <Principles />
    </main>
  )
}
