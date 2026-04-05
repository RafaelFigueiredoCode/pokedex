import Home from './paginas/home.jsx'
import DetalhePokemon from './paginas/detalhes.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Comparator from './paginas/comparator.jsx';


const App = () => (
  <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemons/:id" element={<DetalhePokemon/>} />
        <Route path="/comparator" element={<Comparator />}/>
      </Routes>
  </Router>
);
export default App