import React, { useState, useEffect } from 'react';
import ChairGrid from './ChairGrid';
import ScoreBoard from './ScoreBoard';
import EffectOverlay from './EffectOverlay';
import './App.css'

const App = () => {
  const initialState = {
    turn: 1,
    scores: { 1: 0, 2: 0 },
    scoreHistory: { 1: [], 2: [] },
    electricChair: null,
    message: 'Player 1のターン: 電流を仕掛ける椅子を選んでください',
    isChoosingElectricChair: true,
    remainingChairs: Array.from({ length: 12 }, () => true),
    electricHits: { 1: 0, 2: 0 },
    gameOver: false,
    winner: null,
  };

  const [state, setState] = useState(initialState);
  const [effectQueue, setEffectQueue] = useState([]); // エフェクトキュー
  const [currentEffect, setCurrentEffect] = useState(null); // 現在表示中のエフェクト

  useEffect(() => {
    if (currentEffect || effectQueue.length === 0) return;

    const [nextEffect, ...remainingEffects] = effectQueue;
    setCurrentEffect(nextEffect);
    setEffectQueue(remainingEffects);

    if (!nextEffect.persistent) {
      setTimeout(() => {
        setCurrentEffect(null);
      }, 1000); // 1秒後に次のエフェクトへ
    }
  }, [currentEffect, effectQueue]);

  const addEffectToQueue = (message, style = {}, persistent = false, showButton = false) => {
    setEffectQueue((prevQueue) => [
      ...prevQueue,
      { message, style, persistent, showButton },
    ]);
  };

  const handleChairClick = (chairIndex) => {
    if (state.gameOver || !state.remainingChairs[chairIndex - 1]) return;

    if (state.isChoosingElectricChair) {
      setState((prevState) => ({
        ...prevState,
        electricChair: chairIndex,
        message: `Player ${state.turn}が電流を仕掛けました。Player ${state.turn === 1 ? 2 : 1}は座る椅子を選んでください。`,
        isChoosingElectricChair: false,
      }));
    } else {
      const isElectric = state.electricChair === chairIndex;
      const currentPlayer = state.turn === 1 ? 2 : 1;
      const newScores = { ...state.scores };
      const newScoreHistory = { ...state.scoreHistory };
      const newElectricHits = { ...state.electricHits };
      const newRemainingChairs = state.remainingChairs.map((chair, index) =>
        index === chairIndex - 1 ? false : chair
      );

      if (isElectric) {
        addEffectToQueue('⚡ 電流を受けました ⚡');
        newScores[currentPlayer] = 0;
        newScoreHistory[currentPlayer].push('⚡');
        newElectricHits[currentPlayer] += 1;

        if (newElectricHits[currentPlayer] >= 3) {
          const otherPlayer = state.turn === 1 ? 1 : 2;
          setState((prevState) => ({
            ...prevState,
            scores: newScores,
            scoreHistory: newScoreHistory,
            electricHits: newElectricHits,
            message: `Player ${currentPlayer}が電流を3回受けて敗北しました！`,
            winner: otherPlayer,
            gameOver: true,
          }));
          addEffectToQueue(
            `Player ${otherPlayer}の勝利！`,
            {},
            true,
            true
          );
          return;
        }

        setState((prevState) => ({
          ...prevState,
          scores: newScores,
          scoreHistory: newScoreHistory,
          electricHits: newElectricHits,
        }));
      } else {
        const points = chairIndex;
        addEffectToQueue(`+${points} 点！`);

        newScores[currentPlayer] += points;
        newScoreHistory[currentPlayer].push(points);

        if (newScores[currentPlayer] > 40) {
          setState((prevState) => ({
            ...prevState,
            scores: newScores,
            scoreHistory: newScoreHistory,
            message: `Player ${currentPlayer}が40点を超えて勝利しました！`,
            winner: currentPlayer,
            gameOver: true,
          }));
          addEffectToQueue(
            `Player ${currentPlayer}の勝利！`,
            {},
            true,
            true
          );
          return;
        }

        setState((prevState) => ({
          ...prevState,
          scores: newScores,
          scoreHistory: newScoreHistory,
          remainingChairs: newRemainingChairs,
        }));
      }

      const nextTurn = state.turn === 1 ? 2 : 1;
      setState((prevState) => ({
        ...prevState,
        message: `Player ${nextTurn}のターン: 電流を仕掛ける椅子を選んでください`,
        turn: nextTurn,
        electricChair: null,
        isChoosingElectricChair: true,
      }));
    }
  };

  const restartGame = () => {
    setState(initialState); // ゲームの状態を初期化
    setEffectQueue([]); // エフェクトキューをクリア
    setCurrentEffect(null); // 表示中のエフェクトをクリア
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>電気椅子ゲーム</h1>
      <p>{state.message}</p>
      {currentEffect && (
        <EffectOverlay
          message={currentEffect.message}
          persistent={currentEffect.persistent}
          showButton={currentEffect.showButton}
          onRestart={restartGame}
        />
      )}
      <ChairGrid onChairClick={handleChairClick} remainingChairs={state.remainingChairs} />
      <div style={{ marginTop: '20px' }}>
        <h2>スコアボード</h2>
        <ScoreBoard scores={state.scores} scoreHistory={state.scoreHistory} />
      </div>
    </div>
  );
};

export default App;
