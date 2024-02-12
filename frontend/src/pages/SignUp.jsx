import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useSetRecoilState } from "recoil";
import { tokenAtom } from "../components/store/atoms";
// import { set } from "mongoose";


export function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [err, setErr] = useState(false); 
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();
    const setToken = useSetRecoilState(tokenAtom);
    

    const handleSignUp = async (e) => {
        e.preventDefault();
        if(username === "" || password === "" || passwordVerify === ""){
            setErr(true);
            setErrMsg("Please fill all the fields");
            return;
        }
        else{
            try{
                const signUpData = {
                    username: username,
                    password: password,
                    passwordConfirm: passwordVerify,
                };
                console.log(signUpData);
                const res = await axios.post("http://localhost:3000/signup", signUpData);
                setToken(res.data.token);
                
                navigate("/");
            }catch(err){
                setErr(true);
                setErrMsg(err.response.data.msg)
            }  
        } 
    }

  return <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
            <input
                type="text"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username} 
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
        {err? <div style={
            {color: "red",}
        }>{errMsg}</div> : null}
  </div>;
}

// prop validation
// SignUp.propTypes = {
//     setAuthTokenHandler: PropTypes.func.isRequired,
// }