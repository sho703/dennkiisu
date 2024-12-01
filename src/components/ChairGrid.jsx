import React, { useState } from 'react';
import '../css/ChairGrid.css';

const ChairGrid = ({ onChairClick, remainingChairs }) => {
  const chairs = Array.from({ length: 12 }, (_, i) => i + 1);
  const [hoveredChair, setHoveredChair] = useState(null);

  return (
    <div className="chair-grid-container">
      <svg
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid meet"
        className="chair-grid"
        onTouchEnd={() => setHoveredChair(null)} // タッチ終了時にホバー解除
      >
        {chairs.map((chairNumber, index) => {
          const angle = -Math.PI / 2 + (index / chairs.length) * 2 * Math.PI;
          const x = 500 + 300 * Math.cos(angle); // 拡大版の中心と半径
          const y = 400 + 300 * Math.sin(angle);

          const isActive = remainingChairs[chairNumber - 1];
          const isHovered = hoveredChair === chairNumber;

          return (
            <g
              key={chairNumber}
              onClick={isActive ? () => onChairClick(chairNumber) : undefined}
              onMouseEnter={() => isActive && setHoveredChair(chairNumber)}
              onMouseLeave={() => setHoveredChair(null)}
            >
              <circle
                cx={x}
                cy={y}
                r={isHovered ? 50 : 45} // 椅子のサイズを拡大
                fill={isActive ? (isHovered ? '#d4af37' : '#121212') : 'transparent'}
                stroke={isActive ? '#d4af37' : 'transparent'}
                strokeWidth={isHovered ? 5 : 4}
              />
              {isActive && (
                <text
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  fontSize="18" // フォントサイズも拡大
                  fill={isHovered ? '#121212' : '#f1e9d2'}
                  fontWeight="bold"
                >
                  {chairNumber}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default ChairGrid;
