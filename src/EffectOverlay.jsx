import React, { useEffect, useState } from 'react';
import './EffectOverlay.css';

const EffectOverlay = ({ message, persistent, showButton, onRestart }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (persistent) return;

    const timer = setTimeout(() => {
      setVisible(false);
    }, 1500); // 1.5秒表示

    return () => clearTimeout(timer);
  }, [persistent]);

  if (!visible && !persistent) return null;

  return (
    <div className="effect-overlay">
      <div className={`effect-message ${persistent ? 'persistent' : ''}`}>
        {message}
      </div>
      {showButton && (
        <button className="effect-button" onClick={onRestart}>
          リスタート
        </button>
      )}
    </div>
  );
};

export default EffectOverlay;
