import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
function Header() {

    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState("")

    async function populateUserData() {
        const req = await fetch('https://jersey-shop-backend.herokuapp.com/auth/status', {
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
        const url = 'https://jersey-shop-backend.herokuapp.com/auth/logout';
        await axios.post(url, { headers: { "Content-Type": "application/json" } });
        const token = localStorage.getItem("accessToken");
        if (token) {
            console.log(token)
            localStorage.removeItem("accessToken");
            localStorage.removeItem("username");
            localStorage.removeItem("profile");
            localStorage.removeItem("id");
            navigate("/login");
        } else {
            return
        }
    }

    useEffect(() => {
        populateUserData();
    })
    console.log(profile);
    const user = localStorage.getItem("accessToken");

    return (
        <>
            <h3><Link className="header-title" to="/jerseys">Jersey Closet</Link></h3>
            <nav className="navbar">
                <ul>
                    <li><Link to="/jerseys">Jerseys</Link></li>
                    {user ? <></> :
                        <li><Link to="/register">Register</Link></li>
                    }
                    {user ? <></> :
                        <li><Link to="/login">Login</Link></li>
                    }
                    {!user ? <></> :
                        <li>Welcome {username}</li>
                    }
                    {!user ? <></> :
                        <li className="logout" onClick={handleLogout}>Logout</li>
                    }
                    {!user ? <></> :
                        <li><Link to="/wishlist">Wishlist</Link></li>
                    }

                </ul>
            </nav>
        </>
    )
}

export default Header;