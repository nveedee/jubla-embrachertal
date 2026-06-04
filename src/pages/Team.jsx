import TeamComponent from '../components/Team'
import PageHeader from '../components/PageHeader'

export default function TeamPage() {
  return (
    <main>
      <PageHeader
        title="Team"
        subtitle="Die engagierten Leitenden hinter der Jubla Embrachertal."
        emoji="👥"
        waveFill="#F8FAFC"
      />
      <TeamComponent />
    </main>
  )
}
