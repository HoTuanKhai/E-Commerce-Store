import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";

function App(){
  return (
    <div>

      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/signup' element={<SignUpPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
      </Routes>
    </div>
  )
}

export default App;