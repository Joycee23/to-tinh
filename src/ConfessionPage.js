import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import './ConfessionPage.css'; // Đảm bảo bạn có file CSS này

// --- NỘI DUNG TÙY CHỈNH ---
const OPENING_LINES = [
  "Chào Cậu, cô bé của tớ...",
  "Hôm nay là một ngày đặc biệt Và Tớ có điều này muốn nói với Cậu...."
];

// Dùng template literal (dấu `) để dễ xuống dòng cho thư
const WISHES = [
  `Những lời này đáng lẽ 20/10 tớ mới nói với cậu cơ nhưng mà hôm bữa vì nghe theo con tim nên Tớ đã nói cho Cậu nghe rồi >.< , Tớ biết là Cậu hôm đấy sẽ rất là khó xử và bất ngờ đúng không nhỉ 😁 nhưng chắc hẳn nhiều nhất vẫn là chưa chấp nhận nổi đúng không.
  
  Nhưng mà Tớ vẫn muốn trải lòng mình ra để Cậu có thể hiểu được tình cảm của Tớ dành cho Cậu.
  
  Thúy nè, trong khoảng thời gian mình quen nhau tớ cảm thấy rất vui và hạnh phúc vì lâu lắm rồi tớ mới thấy mình yêu 1 ai nhiều đến như vậy, đặc biệt người đó lại là Cậu. Mỗi lần được gặp Cậu là Tớ vui lắm, tớ cảm nhận như mình đã tìm được 1 nửa tình yêu còn lại của mình rồi ý.
  
  Tớ vẫn hay nói là: Tớ không biết cảm xúc của Cậu đối với tớ như thế nào, nhưng hiện tại Tớ rất Yêu Cậu. Gặp được Cậu như 1 giấc mơ đối với Tớ vậy hẹ hẹ.
  
  Nhiều khi Tớ nghĩ mình may mắn lắm mới gặp được cậu luôn ý. Hơi dài dòng quá Tuấn ê, nên là Tớ Chỉ muốn nói rằng Tớ Yêu Cậu rất nhiều, Yêu mọi thứ về Cậu!!`,
  
  "Tớ chúc cậu luôn là bông hoa xinh đẹp nhất, rạng rỡ nhất.Vì nay là tháng 10 nên nụ cười của cậu đẹp như Thủ Đô ngày giải phóng vậy, vì nụ cười của cậu làm bừng sáng cả thế giới của tớ.",
];

const GRATITUDE_LINES = [
    "Cảm ơn cậu đã xuất hiện trong cuộc đời của tớ,",
    "Cảm ơn cậu đã đến và cho tớ những niềm vui.",
];

const LEAD_IN_LINES = [
    "Và chừng đấy thời gian không quá ngắn và cũng không quá dài,Để cho tớ cảm nhận được tình cảm mà Tớ dành cho Cậu và Tớ cũng cảm thấy tớ rất cần cậu trong cuộc sống này ",
];

const CONFESSION_TEXT = "Điều quan trọng nhất mà tớ muốn nói là...";
const FINAL_QUESTION = "Làm người yêu của tớ nhé? Cho tớ 1 cơ hội để có thể yêu thương, che chở, quan tâm và chăm sóc cậu nhé ?";
// --- KẾT THÚC ---

const ConfessionPage = () => {
  const [step, setStep] = useState(1);
  const [lineIndex, setLineIndex] = useState(0);
  // Sử dụng state mới để quản lý 3 trạng thái: null, 'agreed', 'waiting'
  const [responseState, setResponseState] = useState(null); 
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const buttonGroupRef = useRef(null);
  const noButtonRef = useRef(null);
  const heartRainContainerRef = useRef(null);

  useEffect(() => {
    if (heartRainContainerRef.current) {
      const numHearts = 30;
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
  }, []);

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

  const handleYesClick = () => setResponseState('agreed');
  const handleWaitingClick = () => setResponseState('waiting'); // Hàm mới

  const toggleMute = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const renderContent = () => {
    if (responseState === 'agreed') {
      return (
        <div className="container agreed-view">
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <h1 className="fade-in">YAY! Tớ cũng yêu cậu nhiều lắm! ❤️</h1>
          <img src="/em1.jpg" alt="Kỷ niệm đẹp" className="memory-image fade-in" />
        </div>
      );
    }
    
    // Màn hình mới khi bấm "Chưa sẵn sàng"
    if (responseState === 'waiting') {
      return (
        <div className="container waiting-view">
          <h1 className="fade-in">Không sao đâu... 괜찮아</h1>
          <h2 className="fade-in">Tớ sẽ đợi cậu đến khi nào cậu sẵn sàng.</h2>
        </div>
      );
    }

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
              <video ref={videoRef} className="memory-video" src="/kiniem1.mp4" autoPlay muted loop playsInline>
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
              {/* Nút mới được thêm vào */}
              <button
                className="waiting-button"
                onClick={handleWaitingClick}
              >
                Tớ chưa sẵn sàng...
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
    <div className="container">
      {renderContent()}
      <div ref={heartRainContainerRef} className="heart-rain-container"></div>
    </div>
  );
};

export default ConfessionPage;