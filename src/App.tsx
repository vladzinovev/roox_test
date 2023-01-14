import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import List from './pages/List/List';
import Portfolio from './pages/Profile/Profile';


function App() {
  return (
    <div className="App">
      <Home/>
      <div className='container'>
          <Routes>
            <Route path="/" element={<List/>} />
            <Route path="/:id" element={<Portfolio/>} />
          </Routes>
          
        </div>
    </div>
  );
}

export default App;
