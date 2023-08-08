import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from './Components/Main/main';
import Navbar from './Components/Navbar/navbar';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Main />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
