import Contact from '../components/Contact'
import PageHeader from '../components/PageHeader'

export default function Kontakt() {
  return (
    <main>
      <PageHeader
        title="Kontakt"
        subtitle="Wir freuen uns auf deine Nachricht!"
        emoji="📬"
        waveFill="#F8FAFC"
      />
      <Contact />
    </main>
  )
}
