
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GuestList from './pages/guestList';
import Tables from './pages/tables';

function App() {

  return (
    <>
     <Router>
      <nav className="p-4 bg-gray-200 flex gap-4">
        <Link to="/">Invités</Link>
        <Link to="/tables">Tables</Link>
      </nav>

      <Routes>
        <Route path="/" element={<GuestList />} />
        <Route path="/tables" element={<Tables />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
