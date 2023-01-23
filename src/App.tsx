import "./App.scss";
import { Route, Routes } from "react-router-dom";

import List from "./pages/List/List";
import Portfolio from "./pages/Profile/Profile";
import Page404 from "./pages/Page404/Page404";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/user/:id" element={<Portfolio />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
