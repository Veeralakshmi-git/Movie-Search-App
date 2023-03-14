import '@blueprintjs/core/lib/css/blueprint.css';
import {
    Navbar, NavbarGroup, Button
} from "@blueprintjs/core";
import "./Header.css" 
import { useNavigate } from "react-router-dom"


function Header() {
 const navigate = useNavigate()
    return (
        <div>
            <Navbar fixedToTop className='nav'>
                <h4 className='nav__header'>🍿BOTFLIX 🎥</h4>
                <NavbarGroup align={'right'}  className="nav__navGroup">
                    <Button icon="trending-up" style={{backgroundColor:"#39445a", color:"white"}} className='nav__button'  onClick={(e)=> {e.preventDefault(); navigate("/")}} >Trending</Button>
                    <Button icon="search" style={{backgroundColor:"#39445a",color:"white"}}  className='nav__button' onClick={(e)=> {e.preventDefault(); navigate("/search")}}>Search</Button>
                </NavbarGroup>
            </Navbar>
        </div>
    );
}
 
export default Header;