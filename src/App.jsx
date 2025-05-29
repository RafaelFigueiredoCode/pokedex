import Home from './paginas/home.jsx'
import DetalhePokemon from './paginas/detalhes.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './styles/detalhes.module.css'


const App = () => (
  <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemons/:id" element={<DetalhePokemon/>} />
      </Routes>
  </Router>
);
export default App