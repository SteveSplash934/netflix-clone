import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
// import { Link } from 'react-router-dom'
import { login, signup } from '../../firebase'

const Login = () => {
    const [signState, setSignState] = useState("Sign In");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const user_auth = async (event) => {
        event.preventDefault();
        if (signState === "Sign In") {
            await login(email, password);
        } else {
            await signup(name, email, password);
        }
    }

    return (
        <div className='login'>
            <img src={logo} alt="" className='login-logo' />
            <div className="login-form">
                <h1>{signState}</h1>
                <form>
                    {
                        signState === "Sign Up" ?
                            <input type="text" placeholder='Your name' value={name} onChange={(e) => { setName(e.target.value) }} /> : <></>}
                    <input type="email" placeholder='Your email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <input type="password" placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <button onClick={user_auth} type="submit">{signState}</button>
                    <div className="form-help">
                        <div className="remember">
                            <input type="checkbox" />
                            <label htmlFor="">Remember me</label>
                        </div>
                        <p>Need Help?</p>
                    </div>
                </form>
                <div className="form-switch">
                    {
                        signState === "Sign In" ?
                            <p>New to Netflix? <span onClick={() => { setSignState("Sign Up") }}>Sign Up now</span></p>
                            :
                            <p>Already have an account? <span onClick={() => { setSignState("Sign In") }}>Sign In now</span></p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Login
