import Navbar from './components/Navbaar'
import Home from './components/Home'
import Footer from './components/Footer'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Home />
      <Footer />
    </div>
  )
}

export default App
