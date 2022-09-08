 import { NavLink } from "react-router-dom";
 function Navbar(){
    return (<>
        <NavLink to="/">Home </NavLink>
        <NavLink to="/blog">Blog </NavLink>
        <NavLink to="/signup">Login </NavLink>
        <NavLink to="/signin">Register </NavLink>
    </>)
 }

 export default Navbar;
