import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import PageTransition from './components/PageTransition'
import PullToRefresh from './components/PullToRefresh'
import Home from './pages/Home'
import WerSindWir from './pages/WerSindWir'
import Lager from './pages/Lager'
import Gruppenstunde from './pages/Gruppenstunde'
import Bilder from './pages/Bilder'
import TeamPage from './pages/Team'
import Kontakt from './pages/Kontakt'
import Anmeldung from './pages/Anmeldung'
import { useMobileAnimations } from './hooks/useMobileAnimations'

function App() {
  useMobileAnimations()

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <ScrollToTop />
        <PullToRefresh />
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wer-sind-wir" element={<WerSindWir />} />
            <Route path="/lager" element={<Lager />} />
            <Route path="/gruppenstunde" element={<Gruppenstunde />} />
            <Route path="/bilder" element={<Bilder />} />
            <Route path="/team" element={<TeamPage />} />
              <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/anmeldung" element={<Anmeldung />} />
          </Routes>
        </PageTransition>
        <Footer />
      </div>
    </Router>
  )
}

export default App
