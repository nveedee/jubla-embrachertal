import AgendaComponent from '../components/Agenda'
import PageHeader from '../components/PageHeader'

export default function AgendaPage() {
  return (
    <main>
      <PageHeader
        title="Agenda"
        subtitle="Kommende Events, Lager und Aktivitäten."
        emoji="📅"
      />
      <AgendaComponent />
    </main>
  )
}
