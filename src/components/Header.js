import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';
import axios from 'axios';

function Header() {

    const navigate = useNavigate();

    const handleLogout = async () => {
        const url = 'http://localhost:4000/auth/logout';
        await axios.post(url, { headers: { "Content-Type": "application/json" } });
        navigate("/login");
    }

    return (
        <nav className="navbar">
            <h3>Jersey Closet</h3>
            <ul>
                <li><Link to="/jerseys">Jerseys</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li onClick={handleLogout}>Logout</li>
            </ul>
        </nav>
    )
}

export default Header;