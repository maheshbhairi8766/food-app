import logo from './logo.svg';
import './App.css';
import Navb from './components/Navb';
import Login from './Screens/Login';
import About from './components/About';
import Carouselg from './components/Carouselg';
import Cart from './Screens/Cart';
import { BrowserRouter as Router,
  Switch,
  Route,
  Link, 
  Routes} from 'react-router-dom';


import Home from "./components/Home"
import Footerg from './components/Footerg';
import SignUp from './Screens/SignUp';
import { CartProvider } from './components/ContextReducer';
import MyOrders from './Screens/MyOrders';
function App() {
  return (
    <div style={{backgroundColor:"#080707"}}>
    <CartProvider >
    <Router >
      <Navb/>
      
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/createuser" element={<SignUp/>} />
        <Route exact path="/cart" element={<Cart/>} />
        <Route exact path="/myorders" element={<MyOrders/>} />
      </Routes>
      
      
    </Router>
    </CartProvider>
    </div>
  );
}

export default App;
