import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AddItem from './Components/AddItem';
import SignIn from './Components/SignIn';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route to the SignIn component */}
        <Route path="/" element={<SignIn />} />
        {/* Route to the AddItem component */}
        <Route path="/add-item" element={<AddItem />} />
      </Routes>
    </Router>
  );
}

export default App;
