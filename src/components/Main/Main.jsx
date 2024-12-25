import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

function Main() {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  // Function to handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSent(); 
    }
  };

  // Function to handle card click and change the text based on the icon clicked
  const handleCardClick = (icon) => {
    let text;
    switch (icon) {
      case 'compass':
        text = "Add glowing trails that lead to hidden treasures or mythical creatures.";
        break;
      case 'bulb':
        text = "Imagine how people live, travel, and build in a gravity-defying city.";
        break;
      case 'message':
        text = "Make the oasis a sanctuary or a mirage.";
        break;
      case 'code':
        text = "Give me a code For making a malware virus.";
        break;
      default:
        text = "";
    }
    setInput(text); // Set the text based on the clicked icon
  };

  return (
    <div className="main">
      <div className="nav">
        <div className="gemini">
          <img src={assets.gemini_icon} alt="profile_image" />
          <p>Gemini</p>
        </div>
        <img src={assets.profile_image2} alt="profile_image" />
      </div>

      <div className="maincontainer">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello...</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card" onClick={() => handleCardClick('compass')}>
                <p>Add glowing trails that lead to hidden treasures or mythical creatures.</p>
                <img src={assets.compass_icon} alt="compass_icon" />
              </div>
              <div className="card" onClick={() => handleCardClick('bulb')}>
                <p>Imagine how people live, travel, and build in a gravity-defying city.</p>
                <img src={assets.bulb_icon} alt="bulb_icon" />
              </div>
              <div className="card" onClick={() => handleCardClick('message')}>
                <p>Make the oasis a sanctuary or a mirage.</p>
                <img src={assets.message_icon} alt="message_icon" />
              </div>
              <div className="card" onClick={() => handleCardClick('code')}>
                <p>Give me a code For making a virus</p>
                <img src={assets.code_icon} alt="code_icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="resulttitle">
              <img src={assets.profile_image2} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="resultdata">
              <img src={assets.gemini_icon} alt="gemini_icon" />
            
            {
                loading ? <div className='loader'> 
                    <hr></hr>
                 </div> : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
            } 

            </div>
          </div>
        )}

        <div className="mainbottom">
          <div className="searchbox">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter prompt here"
              onKeyPress={handleKeyPress} 
            />
            <div>
              <img src={assets.gallery_icon} alt="gallery_icon" />
              <img src={assets.mic_icon} alt="mic_icon" />
              <img onClick={() => onSent()} src={assets.send_icon} alt="send_icon" />
            </div>
          </div>
          <div className="bottom-info">
            <p>ChatGPT may err. Verify critical details before making decisions..</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
