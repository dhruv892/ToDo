import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function SignUp() {
    const [nAme, setNAme] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const signUpData = {
                name: nAme,
                email: email,
                password: password,
                passwordConfirm: passwordVerify,
            };
            console.log(signUpData);
            await axios.post("http://localhost:3000/signup", signUpData);
            navigate("/sign-in");

        } catch (err) {
            console.error(err);
        }
    }





  return <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
            <input
                type="text"
                placeholder="name"
                onChange={(e) => setNAme(e.target.value)}
                value={nAme} 
            />
            <input
                type="email"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <input
                type="password"
                placeholder="confirm password"
                onChange={(e) => setPasswordVerify(e.target.value)}
                value={passwordVerify}
            />
            <button type="submit">Sign Up</button>
        </form>
  </div>;
}