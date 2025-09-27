import "./App.css";
import { Routes, Route } from "react-router-dom";
import GuestList from "./pages/guestList";
import Tables from "./pages/tables";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route index path="/" element={<GuestList />} />
          <Route path="/tables" element={<Tables />} />
        </Routes>
    </>
  );
}

export default App;
