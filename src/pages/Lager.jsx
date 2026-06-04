import Sommerlager from '../components/Sommerlager'
import PageHeader from '../components/PageHeader'

export default function Lager() {
  return (
    <main>
      <PageHeader
        title="Sommerlager"
        subtitle="Das unvergesslichste Erlebnis des Jahres – zwei Wochen Abenteuer in den Alpen."
        emoji="⛺"
        waveFill="#283583"
      />
      <Sommerlager />
    </main>
  )
}
