import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from './Components/Main/main';
import Navbar from './Components/Navbar/navbar';
import CreateAccount from './Components/Account/createAccount';
import About from './Components/About Us/about';
import Wishlist from './Components/Wishlist/wishlist';
import Bag from './Components/Bag/bag';
import Account from './Components/Account/account';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Main />}></Route>
          <Route path="/create_account" element={<CreateAccount />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/wishlist" element={<Wishlist />}></Route>
          <Route path="/bag" element={<Bag />}></Route>
          <Route path="/account" element={<Account />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
