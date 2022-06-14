import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
function Header() {

    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState("")

    async function populateUserData() {
        const req = await fetch('http://localhost:4000/auth/status', {
            headers: {
                "x-acess-token": localStorage.getItem("accessToken"),
            }
        });

        const data = await req.json();
        if (data.status === "ok") {
            setProfile(data.profile);
            setUsername(data.username);
        } else {
            alert(data.error);
        }
    }

    const navigate = useNavigate();

    const handleLogout = async () => {
        const url = 'http://localhost:4000/auth/logout';
        await axios.post(url, { headers: { "Content-Type": "application/json" } });
        const token = localStorage.getItem("accessToken");
        if (token) {
            console.log(token)
            localStorage.removeItem("accessToken");
            navigate("/login");
            window.location.reload();
        } else {
            return
        }
    }

    useEffect(() => {
        populateUserData();
    })

    return (
        <>
            <h3 className="header-title">Jersey Closet</h3>
            <div className="header-top">
                <img src={profile} alt={username} />
                <span>{username}</span>
            </div>
            <nav className="navbar">
                <ul>
                    <li><Link to="/jerseys">Jerseys</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li className="logout" onClick={handleLogout}>Logout</li>
                </ul>
            </nav>
        </>
    )
}

export default Header;