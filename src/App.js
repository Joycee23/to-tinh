import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoveHeart from './LoveHeart';
import LoveLetter from './LoveLetter';
import ConfessionPage from './ConfessionPage';
import Login from "./Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Đường dẫn gốc '/', hiển thị LoveHeart.js đầu tiên */}
        <Route path="/loveheart" element={<LoveHeart />} />

        {/* Đường dẫn '/letter', hiển thị LoveLetter.js */}
        <Route path="/letter" element={<LoveLetter />} />
        
        {/* Đường dẫn '/confession', hiển thị ConfessionPage.js */}
        <Route path="/confession" element={<ConfessionPage />} />
      </Routes>
    </div>
  );
}

export default App;