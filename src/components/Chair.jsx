import React from 'react';

const Chair = ({ x, y, isActive, isHovered, chairNumber, onClick, onHover }) => {
  return (
    <g
      onClick={isActive ? () => onClick(chairNumber) : undefined}
      onMouseEnter={() => isActive && onHover(chairNumber)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: isActive ? 'pointer' : 'default' }}
    >
      <circle
        cx={x}
        cy={y}
        r={isHovered ? 35 : 30} // ホバー中は少し大きく
        fill={isActive ? (isHovered ? '#d4af37' : 'linear-gradient(to bottom, #2b2b2b, #121212)') : 'transparent'}
        stroke={isActive ? '#d4af37' : 'transparent'}
        strokeWidth={isHovered ? 4 : 3} // ホバー中は枠線を太く
        style={{
          transition: 'all 0.2s ease-in-out',
        }}
      />
      {isActive && (
        <text
          x={x}
          y={y + 5}
          textAnchor="middle"
          fontSize="16"
          fill={isHovered ? '#121212' : '#f1e9d2'} // ホバー中は背景と文字色を反転
          fontWeight="bold"
          style={{
            pointerEvents: 'none',
            transition: 'all 0.2s ease-in-out',
          }}
        >
          {chairNumber}
        </text>
      )}
    </g>
  );
};

export default Chair;
