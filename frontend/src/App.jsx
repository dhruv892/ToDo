import './App.css'

import {Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { SignIn } from './pages/SignIn.jsx';
import { SignUp } from './pages/SignUp.jsx';
// import { set } from 'mongoose';

function App() {
  
  return (
    <Routes>
      <Route path="/" element= {<Home />} />
      <Route path="/sign-in" element= {<SignIn />} />
      <Route path="/sign-up" element= {<SignUp />} />
    </Routes>
  )
}

export default App