import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

function Sidebar() {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompt, setInput, setRecentPrompt, setShowResult, setResultData } = useContext(Context);

  const loadPrompt = async (prompt) => {
    await onSent(prompt);
  };

  const startNewChat = () => {
    setInput('');
    setRecentPrompt('');
    setShowResult(false);
    setResultData('');
  };

  return (
    <div className="sidebar">
      <div className="topbar">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="menubaricon"
        />
        <div className="newchat" onClick={startNewChat}>
          <img src={assets.plus_icon} alt="newchaticon" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt?.map((item, index) => (
              <div
                key={index}
                onClick={() => loadPrompt(item)}
                className="recent-entry"
              >
                <img src={assets.message_icon} alt="messageicon" />
                <p>{item.slice(0, 14)}...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="bottombar">
        <div className="bottomitem recent-entry">
          <img src={assets.question_icon} alt="questionicon" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottomitem recent-entry">
          <img src={assets.history_icon} alt="historyicon" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottomitem recent-entry">
          <img src={assets.setting_icon} alt="settingicon" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
