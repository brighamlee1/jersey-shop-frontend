import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/register.css';

function Login(props) {

    const [data, setData] = useState({
        email: '',
        password: ''
    })


    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://jersey-shop-backend.herokuapp.com/auth/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                }),
            });
            const data2 = await response.json();
            console.log(data2.user);
            if (data2.user) {
                localStorage.setItem("accessToken", data2.user);
                localStorage.setItem("username", data2.username)
                localStorage.setItem("profile", data2.profile)
                localStorage.setItem("id", data2.id)
                navigate("/jerseys");
                window.location.reload();
            } else {
                alert("Please check username and password");
            }
            // await axios.post(url, data, { headers: { "Content-Type": "application/json" } });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="signup-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <label>Email</label>
                        <input
                            className="signup-inputs"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            required
                        >
                        </input>
                    </div>
                    <div className="input-box">
                        <label>Password</label>
                        <input
                            className="signup-inputs"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            required
                        >
                        </input>
                    </div>
                    <input type="submit" value="Login" className="signup-button" />
                </form>
            </div>
            <h3 className="signup-text">Don't have an account? Click <span><Link to="/register">here</Link> </span> to create an account.</h3>
        </>
    )
}

export default Login;