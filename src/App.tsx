import { Home, CharacterDetail, LocationDetail, EpisodeDetail } from './view/index'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/character/:id" element={<CharacterDetail />} />
      <Route path="/location/:id" element={<LocationDetail />} />
      <Route path="/episode/:id" element={<EpisodeDetail />} />
    </Routes>
  )
}

export default App
