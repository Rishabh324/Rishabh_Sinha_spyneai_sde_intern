// import { toast } from 'react-toastify';
import { useState } from "react";
import { Link } from "react-router-dom";
import { handleLogin } from "../services/AuthService";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="p-4 flex h-screen justify-center items-center bg-blue-400">
            <div className="bg-blue-200 rounded-lg p-4">
                <h1 className="text-3xl text-center">Login</h1>
                <form className="p-4" onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin(e, email, password);
                }}>
                    <div>
                        <label htmlFor="email" className="block">Email:</label>
                        <input
                            type="text"
                            value={email}
                            placeholder="Enter Email"
                            name="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-400 rounded-lg"
                        />
                    </div>
                    <div>
                        <label htmlFor="pswd" className="block">Password:</label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter Password"
                            name="pswd"
                            id="pswd"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-400 rounded-lg"
                        />
                    </div>
                    <div>
                        <button type="submit" className="p-2 bg-blue-500 mt-2 rounded-lg shadow-md">
                            Sign In
                        </button>
                        <p>Not a User? <Link to={'/register'}>SignUp</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login