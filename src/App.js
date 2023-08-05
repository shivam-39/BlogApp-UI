import './App.css';
import About from './pages/About';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Services from './pages/Services';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './components/PrivateRoute';
import UserDashboard from './pages/user-routes/UserDashboard';
import Profile from './pages/user-routes/Profile';

function App() {
    return (
        <div className="custom-background">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/signup' element={<Signup />}></Route>
                    <Route path='/about' element={<About />}></Route>
                    <Route path='/services' element={<Services />}></Route>
                    <Route path='/user' element={<PrivateRoute />}>
                        <Route path='dashboard' element={<UserDashboard />}></Route>
                        <Route path='profile' element={<Profile />}></Route>
                    </Route>
                </Routes>
                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </BrowserRouter>
        </div>
    );
}

export default App;