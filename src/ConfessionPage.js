import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import './ConfessionPage.css'; // Đảm bảo bạn có file CSS này

// --- NỘI DUNG TÙY CHỈNH ---
const OPENING_LINES = [
  "Chào cậu...",
  "Hôm nay là một ngày đặc biệt.",
  "Và tớ có điều này muốn nói với cậu...",
];

const WISHES = [
  "Nhân ngày 20/10,",
  "Tớ chúc cậu luôn là bông hoa xinh đẹp nhất, rạng rỡ nhất.",
  "Vì nay là tháng 10 nên nụ cười của cậu đẹp như Thủ Đô ngày giải phóng vậy.",
  "Vì nụ cười của cậu làm bừng sáng cả thế giới của tớ.",
];

const GRATITUDE_LINES = [
    "Cảm ơn cậu đã xuất hiện trong cuộc đời của tớ,",
    "Cảm ơn cậu đã đến và cho tớ những niềm vui.",
];

const LEAD_IN_LINES = [
    "Và chừng đấy thời gian không quá ngắn và cũng không quá dài,",
    "Để cho tớ cảm thấy tớ rất cần cậu trong cuộc sống này.",
];

const CONFESSION_TEXT = "Điều quan trọng nhất mà tớ muốn nói là...";
const FINAL_QUESTION = "Làm người yêu của tớ nhé?";
// --- KẾT THÚC ---

const ConfessionPage = () => {
  const [step, setStep] = useState(1);
  const [lineIndex, setLineIndex] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const buttonGroupRef = useRef(null);
  const noButtonRef = useRef(null);
  
  // Ref cho container chứa mưa trái tim
  const heartRainContainerRef = useRef(null);

  // useEffect để tạo mưa trái tim một lần duy nhất khi component được tải
  useEffect(() => {
    if (heartRainContainerRef.current) {
      const numHearts = 30; // Số lượng trái tim
      const container = heartRainContainerRef.current;
      container.innerHTML = ''; 

      for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        
        heart.style.left = `${Math.random() * 100}%`;
        const size = Math.random() * 10 + 10;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heart.style.animationDuration = `${Math.random() * 5 + 5}s`;

        container.appendChild(heart);
      }
    }
  }, []); // Mảng rỗng đảm bảo hiệu ứng chỉ tạo 1 lần

  const handleNext = () => {
    let currentStepLines;
    switch(step) {
        case 1: currentStepLines = OPENING_LINES; break;
        case 2: currentStepLines = WISHES; break;
        case 3: currentStepLines = GRATITUDE_LINES; break;
        case 5: currentStepLines = LEAD_IN_LINES; break;
        default: currentStepLines = [];
    }

    if (step === 4) {
        setStep(5);
        setLineIndex(0);
        return;
    }

    if (lineIndex < currentStepLines.length - 1) {
      setLineIndex(lineIndex + 1);
    } else {
      setStep(step + 1);
      setLineIndex(0);
    }
  };

  const handleNoClick = () => {
    setYesButtonSize(prevSize => prevSize + 0.2);
    if (buttonGroupRef.current && noButtonRef.current) {
      const buttonGroupRect = buttonGroupRef.current.getBoundingClientRect();
      const noButtonRect = noButtonRef.current.getBoundingClientRect();
      let newX = Math.random() * (buttonGroupRect.width - noButtonRect.width);
      let newY = Math.random() * (buttonGroupRect.height - noButtonRect.height);
      setNoButtonStyle({
        position: 'absolute',
        left: `${newX}px`,
        top: `${newY}px`,
        transition: 'all 0.3s ease',
      });
    }
  };

  const handleYesClick = () => setAgreed(true);

  const toggleMute = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const renderContent = () => {
    if (agreed) {
      return (
        <div className="container agreed-view">
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <h1 className="fade-in">YAY! Tớ cũng yêu cậu nhiều lắm! ❤️</h1>
          <img src="/em1.jpg" alt="Kỷ niệm đẹp" className="memory-image fade-in" />
        </div>
      );
    }

    // Các case giữ nguyên
    switch (step) {
      case 1:
        return (
          <div className="card fade-in">
            <p className="story-text">{OPENING_LINES[lineIndex]}</p>
            <button className="next-button" onClick={handleNext}>Tiếp tục...</button>
          </div>
        );
      case 2:
        return (
          <div className="card fade-in">
            <p className="story-text">{WISHES[lineIndex]}</p>
            <button className="next-button" onClick={handleNext}>Tiếp tục...</button>
          </div>
        );
      case 3:
        return (
          <div className="card fade-in">
            <p className="story-text">{GRATITUDE_LINES[lineIndex]}</p>
            <button className="next-button" onClick={handleNext}>
                {lineIndex === GRATITUDE_LINES.length - 1 ? "Và..." : "Tiếp tục..."}
            </button>
          </div>
        );
      case 4:
        return (
          <div className="card fade-in">
            <p className="story-text">Và những khoảnh khắc tuyệt vời này...</p>
            <div className="video-container">
              <video
                ref={videoRef}
                className="memory-video"
                src="/kiniem1.mp4"
                autoPlay
                muted
                loop
                playsInline
              >
                Trình duyệt của bạn không hỗ trợ video này.
              </video>
              <button onClick={toggleMute} className="mute-button">
                {isMuted ? '🔈 Bật tiếng' : '🔊 Tắt tiếng'}
              </button>
            </div>
            <button className="next-button" onClick={handleNext}>❤️</button>
          </div>
        );
      case 5:
        return (
            <div className="card fade-in">
              <p className="story-text">{LEAD_IN_LINES[lineIndex]}</p>
              <button className="next-button" onClick={handleNext}>
                {lineIndex === LEAD_IN_LINES.length - 1 ? "Nên là..." : "Tiếp tục..."}
              </button>
            </div>
          );
      case 6:
        return (
          <div className="card fade-in">
            <h1>{CONFESSION_TEXT}</h1>
            <h2>{FINAL_QUESTION}</h2>
            <div className="button-group" ref={buttonGroupRef}>
              <button
                className="yes-button"
                style={{ transform: `scale(${yesButtonSize})` }}
                onClick={handleYesClick}
              >
                Đồng ý 🥰
              </button>
              <button
                ref={noButtonRef}
                className="no-button"
                style={noButtonStyle}
                onMouseEnter={handleNoClick}
                onClick={handleNoClick}
              >
                Không nha 😜
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    // Thêm container của mưa trái tim vào đây
    <div className="container">
      {renderContent()}
      <div ref={heartRainContainerRef} className="heart-rain-container"></div>
    </div>
  );
};

export default ConfessionPage;