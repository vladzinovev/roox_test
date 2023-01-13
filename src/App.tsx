import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';


function App() {
  return (
    <div className="App">
      <Home/>
      <div className='container'>
          {/* <Routes>
            <Route path="/" element={} />
            <Route path="/post/:id" element={} />
            <Route path="/userid/:by" element={} />
          </Routes>  */}
          <div>Hello world</div>
          
        </div>
    </div>
  );
}

export default App;
