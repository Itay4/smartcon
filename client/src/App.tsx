import './App.css';
import { Provider } from 'react-redux';
import Store from './redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    // <center>
      <Provider store={Store}>
        <Router>
          <Routes>
            {/* <Route path="/pick-a-pokemon">
              <PickAPokemon />
            </Route>
            <Route path="/my-pokemons">
              <MyPokemons />
            </Route>
            <Route path="/battle">
              <Battle />
            </Route>
            <Route path="/result">
              <BattleResult />
            </Route>
            <Route path="/:address">
              <Pokemons />
            </Route> */}
            <Route path='/' element={<Login/>} />
          </Routes>
        </Router>
      </Provider>
    // </center>
  );
}

export default App;
