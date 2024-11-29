import React from 'react';
import './ScoreBoard.css';

const ScoreBoard = ({ scores, scoreHistory }) => {
  const maxTurns = 8; // 固定で表示するターン数
  const cellWidth = 50; // 通常のセル幅（px）
  const playerColumnWidth = 80; // Player列の幅（px）

  return (
    <table
      style={{
        margin: '0 auto',
        borderCollapse: 'collapse',
        tableLayout: 'fixed', // 列幅を固定
        width: `${playerColumnWidth + cellWidth * (maxTurns + 1)}px`, // 全体の幅を計算
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              textAlign: 'center',
              border: '1px solid black',
              width: `${playerColumnWidth}px`, // Player列の幅
            }}
          >
            Player
          </th>
          {Array.from({ length: maxTurns }, (_, i) => (
            <th
              key={i}
              style={{
                textAlign: 'center',
                border: '1px solid black',
                width: `${cellWidth}px`, // 通常列の幅
              }}
            >
              {i + 1}
            </th>
          ))}
          <th
            style={{
              textAlign: 'center',
              border: '1px solid black',
              width: `${cellWidth}px`, // 計列の幅
            }}
          >
            計
          </th>
        </tr>
      </thead>
      <tbody>
        {[1, 2].map((player) => (
          <tr key={player}>
            <td
              style={{
                textAlign: 'center',
                border: '1px solid black',
                width: `${playerColumnWidth}px`, // Player列の幅
              }}
            >
              Player {player}
            </td>
            {Array.from({ length: maxTurns }, (_, i) => (
              <td
                key={i}
                style={{
                  textAlign: 'center',
                  border: '1px solid black',
                  width: `${cellWidth}px`, // 通常列の幅
                }}
              >
                {scoreHistory[player][i] !== undefined ? scoreHistory[player][i] : ''}
              </td>
            ))}
            <td
              style={{
                textAlign: 'center',
                border: '1px solid black',
                width: `${cellWidth}px`, // 計列の幅
              }}
            >
              {scores[player]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScoreBoard;
