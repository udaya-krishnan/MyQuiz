import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/User/auth/Login';
import Register from './components/User/auth/Register';
import Otp from './components/User/auth/Otp';
import ForgotPassword from './components/User/auth/ForgotPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth" element={<Register />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/forgot" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
