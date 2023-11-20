import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from './Components/Main/main';
import Navbar from './Components/Navbar/navbar';
import About from './Components/About Us/about';
import Wishlist from './Components/Wishlist/wishlist';
import Bag from './Components/Bag/bag';
import BWBtn from './Components/BagWishlist/bwBtn';
import Product from './Components/Product/Product';
import Assortment from './Components/Assortment/Assortment';
import Filter from './Components/Filter/Filter';
import AdminPage from './Components/Admin/Admin/AdminPage';
import Account from './Components/AccountPanel/Account/Account';
import CreateAccount from './Components/AccountPanel/CreateAccount/createAccount';
import { AuthProvider } from './Context/AuthContext';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Main />}></Route>
            <Route path="/create_account" element={<CreateAccount />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/wishlist" element={<Wishlist />}></Route>
            <Route path="/bag" element={<Bag />}></Route>
            <Route path='/account' element={<Account />}></Route>
            <Route path="/bw" element={<BWBtn />}></Route>
            <Route path="/product/:id" element={<Product />}></Route>
            <Route path="/assortment" element={<Assortment />}></Route>
            <Route path="/filter" element={<Filter />}></Route>
            <Route path="/admin" element={<AdminPage />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
