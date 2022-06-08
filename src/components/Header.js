import { Link } from 'react-router-dom';
import '../styles/header.css';

function Header() {
    return (
        <nav className="navbar">
            <h3>Jersey Closet</h3>
            <ul>
                <li><Link to="/jerseys">Jerseys</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </nav>
    )
}

export default Header;