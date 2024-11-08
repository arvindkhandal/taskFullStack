import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SignUpPage from './signUpPage';
import Login from './login';
import { useEffect, useState } from 'react';

const Home = () => {
  const [userlogin, setUserLogin] = useState(localStorage.getItem("user") === "true");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    setUserLogin(false); 
    navigate('/signUp');
  };

  useEffect(() => {
    if (!userlogin) {
      navigate('/signUp');
    }
  }, [userlogin, navigate]);  

  return (
    <>
      <div>Welcome to Home</div>
      <button onClick={logout}>Logout</button>
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUpPage />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
