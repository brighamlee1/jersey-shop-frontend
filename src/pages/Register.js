import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/register.css';

function Register(props) {

    const [data, setData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:4000/auth/register';
            await axios.post(url, data, { headers: { "Content-Type": "application/json" } })
            navigate("/login")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="signup-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <label>Username</label>
                        <input
                            className="signup-inputs"
                            type="text"
                            name="username"
                            value={data.username}
                            onChange={handleChange}
                            required
                        >
                        </input>
                    </div>
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
                    <input type="submit" value="Register" className="signup-button" />
                </form>
            </div>
            <h3 className="signup-text">Already have an account? Click <span><Link to="/login">here</Link> </span> to login.</h3>
        </>
    )
}

export default Register;