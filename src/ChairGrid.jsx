import React, { useState } from 'react';
import Chair from './Chair';

const ChairGrid = ({ onChairClick, remainingChairs }) => {
  const centerX = 400;
  const centerY = 300;
  const radius = 200;
  const chairs = Array.from({ length: 12 }, (_, i) => i + 1);

  const [hoveredChair, setHoveredChair] = useState(null); // ホバー中の椅子を管理

  const handleChairClick = (chairNumber) => {
    if (remainingChairs[chairNumber - 1]) {
      onChairClick(chairNumber);
      setHoveredChair(null); // ホバー状態を解除
    }
  };

  return (
    <svg
      width="800"
      height="600"
      style={{ backgroundColor: '#121212', borderRadius: '10px' }}
      onTouchEnd={() => setHoveredChair(null)} // タッチ終了時にホバーを解除
    >
      {chairs.map((chairNumber, index) => {
        const angle = -Math.PI / 2 + (index / chairs.length) * 2 * Math.PI; // 時計配置
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const isActive = remainingChairs[index];
        const isHovered = hoveredChair === chairNumber;

        return (
          <Chair
            key={chairNumber}
            x={x}
            y={y}
            isActive={isActive}
            isHovered={isHovered}
            chairNumber={chairNumber}
            onClick={handleChairClick}
            onHover={setHoveredChair}
          />
        );
      })}
    </svg>
  );
};

export default ChairGrid;
