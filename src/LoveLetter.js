import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoveLetter.css'; // Vẫn cần file CSS này để tạo giao diện

const LoveLetter = () => {
  const navigate = useNavigate();

  const handleNavigateToConfession = () => {
    navigate('/confession');
  };

  return (
    <div className="initial-view-container">
      <div className="initial-view-content">
        <div className="hearts">
          <span>❤️</span><span>❤️</span><span>❤️</span><span>❤️</span><span>❤️</span>
        </div>
        <div className="envelope-icon">
          <img src="/envelope.png" alt="Envelope" style={{ width: '200px' }} />
        </div>
        <p className="CỐC CỐC CÓ AI HONG">CỐC CỐC CÓ AI HONG!</p>
        <p className="Cậu Có Thư Nè">Cậu Có Thư Nè</p>
        <button className="open-button" onClick={handleNavigateToConfession}>
          💌 Nhấn Để Mở Thư Nhó
        </button>
      </div>
    </div>
  );
};

export default LoveLetter;