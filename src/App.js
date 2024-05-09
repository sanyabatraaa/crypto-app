import './App.css';
import {Routes,Route} from "react-router-dom";
import Exchanges from './components/Exchanges';
import Coins from './components/Coins';
import Details from './components/Details';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Exchanges/>}/>
      <Route path='/coins' element={<Coins/>}/>
      <Route path='/coins/:id' element={<Details/>}/>
    </Routes>
  );
}

export default App;
