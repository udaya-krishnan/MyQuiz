import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './User/auth/Login';
import Register from './User/auth/Register';
import Otp from './User/auth/Otp';
import ForgotPassword from './User/auth/ForgotPassword';

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
