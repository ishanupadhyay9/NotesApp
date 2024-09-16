import Home from "./pages/Home";
import "./App.css"
import { BrowserRouter as Router , Routes , Route  } from "react-router-dom";
import Login from "./pages/Login";
import Signupp from "./pages/Signupp";

import { Toaster } from "react-hot-toast";
export default function App() {

  return (<div>
<Router>
<Toaster/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/Login' element={<Login/>}/>
    <Route path='/Signup' element={<Signupp/>}/>
  
  </Routes>
</Router>

  </div>);
}
