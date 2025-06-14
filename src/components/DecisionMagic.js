import React, { useState } from 'react';
import { downloadFile } from '../utils/fileUtils';

const DecisionMagic = () => {
  const [magicQuestion, setMagicQuestion] = useState('');
  const [ballAnswer, setBallAnswer] = useState('Ask a question...');
  const [isShaking, setIsShaking] = useState(false);
  
  const [rouletteTasks, setRouletteTasks] = useState([]);
  const [rouletteInput, setRouletteInput] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [rouletteResult, setRouletteResult] = useState('');
  const [wheelRotation, setWheelRotation] = useState(0);
  
  const [coinResult, setCoinResult] = useState('Click for yes/no decisions!');
  const [diceResult, setDiceResult] = useState('Roll 1-6 for options!');
  const [mantraResult, setMantraResult] = useState('Get motivated!');

  const magicResponses = [
    "✅ Definitely start with that!", "🎯 Focus on it now", "⏰ Perfect timing for this task",
    "🚀 Go for it immediately", "💪 You've got this - do it!", "❌ Maybe tackle something else first",
    "⏳ Wait for a better moment", "🤔 Consider your energy level first", "📱 Check your priorities again",
    "🔄 Come back to this later", "⚖️ Weigh your options more", "🎲 Try asking again in 5 minutes",
    "🌟 Your instincts are right", "📋 Break it into smaller steps first", "☕ Take a break, then decide"
  ];

  const focusMantras = [
    "🧘 I am focused and in control of my time", "⚡ I choose progress over perfection",
    "🎯 This task deserves my full attention", "💪 I have the skills to complete this well",
    "🌊 I flow with my work, not against it", "🔥 I am energized and ready to create",
    "🎪 I make work enjoyable and rewarding", "🚀 I am building momentum with every action",
    "💎 I value my time and use it wisely", "🌟 I trust my ability to make good decisions"
  ];

  const shakeBall = () => {
    if (magicQuestion.trim() === '') {
      alert('Please enter a question first!');
      return;
    }

    setIsShaking(true);
    
    setTimeout(() => {
      const randomResponse = magicResponses[Math.floor(Math.random() * magicResponses.length)];
      setBallAnswer(randomResponse);
      setIsShaking(false);
    }, 600);
  };

  const addRouletteTask = () => {
    if (rouletteInput.trim() === '') return;
    
    setRouletteTasks([...rouletteTasks, rouletteInput.trim()]);
    setRouletteInput('');
    setRouletteResult('');
  };

  const removeRouletteTask = (index) => {
    setRouletteTasks(rouletteTasks.filter((_, i) => i !== index));
    setRouletteResult('');
  };

  const spinWheel = () => {
    if (rouletteTasks.length < 2) {
      alert('Add at least 2 tasks to spin!');
      return;
    }

    setIsSpinning(true);
    setRouletteResult('');

    // Generate random spin
    const spins = Math.floor(Math.random() * 5) + 5; // 5-10 full rotations
    const finalAngle = Math.random() * 360;
    const totalRotation = spins * 360 + finalAngle;
    
    setWheelRotation(totalRotation);

    // Calculate winner after spin completes
    setTimeout(() => {
      const normalizedAngle = (360 - (finalAngle % 360)) % 360;
      const sectionAngle = 360 / rouletteTasks.length;
      const winnerIndex = Math.floor(normalizedAngle / sectionAngle);
      
      setRouletteResult(`🎯 Winner: ${rouletteTasks[winnerIndex]}`);
      setIsSpinning(false);
    }, 3000);
  };

  const coinFlip = () => {
    const result = Math.random() < 0.5 ? '🪙 Heads - YES!' : '🪙 Tails - NO!';
    setCoinResult(result);
  };

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceResult(`🎲 Rolled: ${roll}`);
  };

  const getMantra = () => {
    const randomMantra = focusMantras[Math.floor(Math.random() * focusMantras.length)];
    setMantraResult(randomMantra);
  };

  const saveDecisionData = () => {
    const content = `DECISION MAGIC RESULTS
Generated: ${new Date().toLocaleDateString()}

MAGIC 8-BALL:
Question: "${magicQuestion}"
Answer: "${ballAnswer}"

ROULETTE TASKS:
${rouletteTasks.length > 0 ? rouletteTasks.map((task, index) => `${index + 1}. ${task}`).join('\n') : 'No tasks added'}
${rouletteResult ? `Result: ${rouletteResult}` : ''}

QUICK DECISION RESULTS:
- Coin Flip: ${coinResult}
- Dice Roll: ${diceResult}  
- Focus Mantra: ${mantraResult}

Generated by Time Management Toolkit`;

    downloadFile('decision-magic-results.txt', content);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">✨ Decision Magic</h2>
        <p className="text-lg text-gray-600">When you're stuck choosing between tasks, let these fun tools help!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Magic 8-Ball */}
        <div className="bg-gray-50 rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold mb-4">🎱 Magic 8-Ball</h3>
          <input
            type="text"
            value={magicQuestion}
            onChange={(e) => setMagicQuestion(e.target.value)}
            placeholder="Should I work on the report or answer emails first?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-blue-500"
          />

          <div 
            onClick={shakeBall}
            className={`w-56 h-56 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-600 to-black cursor-pointer flex items-center justify-center transition-transform duration-300 hover:scale-105 ${
              isShaking ? 'animate-bounce' : ''
            }`}
          >
            <div className="w-44 h-44 bg-gray-900 rounded-full flex items-center justify-center">
              <div className="w-24 h-24 bg-blue-900 rounded-full flex items-center justify-center border-4 border-gray-700">
                <div className="text-white text-xs text-center px-2 font-bold">
                  {ballAnswer}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={shakeBall}
            className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            🎲 Shake the Ball!
          </button>
        </div>

        {/* Task Roulette */}
        <div className="bg-gray-50 rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold mb-4">🎯 Task Roulette</h3>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={rouletteInput}
              onChange={(e) => setRouletteInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addRouletteTask()}
              placeholder="Enter a task..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addRouletteTask}
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-medium"
            >
              Add
            </button>
          </div>

          <div className="mb-6 min-h-16">
            {rouletteTasks.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700">
                Add 2-5 tasks to spin!
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 justify-center">
                {rouletteTasks.map((task, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {task}
                    <button
                      onClick={() => removeRouletteTask(index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {rouletteTasks.length >= 2 && (
            <>
              <div className="relative mb-6">
                <div className="w-64 h-64 mx-auto border-8 border-gray-800 rounded-full overflow-hidden relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 text-3xl z-10">
                    👆
                  </div>
                  <div 
                    className={`w-full h-full transition-transform duration-3000 ease-out ${isSpinning ? '' : ''}`}
                    style={{ transform: `rotate(${wheelRotation}deg)` }}
                  >
                    {rouletteTasks.map((task, index) => {
                      const rotation = (index * 360) / rouletteTasks.length;
                      const hue = (index * 360) / rouletteTasks.length;
                      return (
                        <div
                          key={index}
                          className="absolute w-1/2 h-1/2 origin-bottom-right flex items-center justify-center text-xs font-bold text-white p-4 text-center"
                          style={{
                            transform: `rotate(${rotation}deg)`,
                            background: `hsl(${hue}, 70%, 60%)`,
                          }}
                        >
                          <span className="transform -rotate-45">{task}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <button
                onClick={spinWheel}
                disabled={isSpinning}
                className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isSpinning ? '🌀 Spinning...' : '🔄 Spin!'}
              </button>

              {rouletteResult && (
                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 font-semibold">
                  {rouletteResult}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Quick Decision Tools */}
      <div>
        <h3 className="text-xl font-semibold mb-6">⚡ Quick Decision Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={coinFlip}
            className="bg-white border-l-4 border-yellow-400 rounded-lg p-6 shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <h4 className="text-lg font-semibold text-gray-900 mb-3">🪙 Coin Flip</h4>
            <p className="text-gray-700">{coinResult}</p>
          </div>

          <div
            onClick={rollDice}
            className="bg-white border-l-4 border-green-400 rounded-lg p-6 shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <h4 className="text-lg font-semibold text-gray-900 mb-3">🎲 Dice Roll</h4>
            <p className="text-gray-700">{diceResult}</p>
          </div>

          <div
            onClick={getMantra}
            className="bg-white border-l-4 border-purple-400 rounded-lg p-6 shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <h4 className="text-lg font-semibold text-gray-900 mb-3">🕉️ Focus Mantra</h4>
            <p className="text-gray-700">{mantraResult}</p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={saveDecisionData}
            className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg font-medium hover:bg-blue-50 transition-all"
          >
            💾 Save Decision Results
          </button>
        </div>
      </div>

      {/* Fun Fact */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-indigo-800 mb-3">🎯 Decision-Making Tip</h4>
        <p className="text-indigo-700">
          Sometimes the best decision is the one you make quickly! These tools help bypass analysis paralysis 
          when you're stuck between equally good options. Trust your gut and move forward! 🚀
        </p>
      </div>
    </div>
  );
};

export default DecisionMagic;