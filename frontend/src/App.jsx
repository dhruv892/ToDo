import './App.css'

import {Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { SignIn } from './pages/SignIn.jsx';
import { SignUp } from './pages/SignUp.jsx';
import { AuthContext } from './components/context/AuthContext.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import {AuthContext} from './components/context/AuthContext.jsx';
// import { set } from 'mongoose';

function App() {
  const [token, setToken] = useState("");
  // const setAuthTokenHandler = (newToken) => {
  //   setToken(newToken);
  // }

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if(!token || token === "" || token === undefined || token === null) {
  //     navigate("/sign-in");
  //   }
  // }, [navigate, token])
  return (
    <>
      <AuthContext.Provider value={{token, setToken }}>
        <Routes>
          <Route path="/sign-in" element= {<SignIn />} />
          <Route path="/" element= {<Home />} />
          <Route path="/sign-up" element= {<SignUp />} />
        </Routes>
      </AuthContext.Provider>
      {/* <Routes>
        <Route path="/sign-in" element= {<SignIn />} />
        <Route path="/" element= {<Home />} />
        <Route path="/sign-up" element= {<SignUp />} />
      </Routes> */}
    </>
    
  )
}

export default App