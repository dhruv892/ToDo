import "./App.css";

import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { SignIn } from "./pages/SignIn.jsx";
import { SignUp } from "./pages/SignUp.jsx";
import { RecoilRoot } from "recoil";

function App() {
    return (
        <RecoilRoot>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </RecoilRoot>
    );
}

export default App;
