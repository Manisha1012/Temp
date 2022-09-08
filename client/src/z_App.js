import './App.css';
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signin from "./components/Signin";
import Blog from "./components/Blog";

function App() {

    return (<>
    <Navbar />
    <Routes>
        <Route exact path="/" element={<Home/>} />                   
        <Route path="/blog" element={<Blog/>}/>  
        <Route path="/signup" element={<Login/>}/>          
        <Route path="/signin" element={<Signin/>}/>   
    </Routes>
    
    </>);
}

export default App;

