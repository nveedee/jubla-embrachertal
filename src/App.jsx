import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import WerSindWir from './pages/WerSindWir'
import Lager from './pages/Lager'
import Gruppenstunde from './pages/Gruppenstunde'
import Bilder from './pages/Bilder'
import TeamPage from './pages/Team'
import AgendaPage from './pages/Agenda'
import Kontakt from './pages/Kontakt'
import Anmeldung from './pages/Anmeldung'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wer-sind-wir" element={<WerSindWir />} />
          <Route path="/lager" element={<Lager />} />
          <Route path="/gruppenstunde" element={<Gruppenstunde />} />
          <Route path="/bilder" element={<Bilder />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/anmeldung" element={<Anmeldung />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
