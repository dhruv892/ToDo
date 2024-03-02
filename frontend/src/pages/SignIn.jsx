import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import PropTypes from 'prop-types';
import { useSetRecoilState } from "recoil";
import { tokenAtom } from "../components/store/atoms.jsx";

export function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();
    const setToken = useSetRecoilState(tokenAtom);

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (username === "" || password === "") {
            setErrMsg("Please fill all the fields");
            return;
        } else {
            try {
                const signInData = {
                    username: username,
                    password: password,
                };
                console.log(signInData);
                const res = await axios.post(
                    "http://localhost:3000/login",
                    signInData
                );
                setToken(res.data.token);
                console.log(res.data.token);
                navigate("/");
            } catch (err) {
                setErr(true);
                console.log(err);
                setErrMsg(err.response.data.msg);
            }
        }
    };

    return (
        <div className="mt-8">
            <h1 className="text-2xl text-white"> Sign In </h1>
            <input
                id="username"
                type="text"
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="pl-4 mt-2 bg-slate-700 rounded-md border-0 text-stone-200"
            />
            <br />
            <input
                id="password"
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="pl-4 mt-2 bg-slate-700 rounded-md border-0 text-stone-200"
            />
            <br />
            <button
                onClick={handleSignIn}
                className="pl-4 pr-4 mt-2 rounded-lg border-0 bg-cyan-700"
            >
                {" "}
                Sign In{" "}
            </button>
            <br />
            {err ? <div style={{ color: "red" }}> {errMsg} </div> : null}
        </div>
    );
}

// prop validation
// SignIn.propTypes = {
//     setAuthTokenHandler: PropTypes.func.isRequired,
// }
