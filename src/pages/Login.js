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
            const url = 'http://localhost:4000/auth/login';
            await axios.post(url, data, { headers: { "Content-Type": "application/json" } });
            navigate("/jerseys")
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