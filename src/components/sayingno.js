import React, { useState } from 'react';

const SayingNo = () => {
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [selectedCapacity, setSelectedCapacity] = useState(null);

  const phrases = [
    {
      title: "⏰ The Time Boundary",
      text: "I wish I could help, but I'm at capacity right now. Could we revisit this in [timeframe]?",
      icon: "⏰"
    },
    {
      title: "🎯 The Priority Redirect", 
      text: "This sounds great, but it doesn't align with my current priorities. I need to focus on [your priority] right now.",
      icon: "🎯"
    },
    {
      title: "🤝 The Helpful Alternative",
      text: "I can't take this on, but have you considered [alternative solution/person who might help]?",
      icon: "🤝"
    },
    {
      title: "📅 The Future Opening",
      text: "My plate is full until [date]. If this is still relevant then, I'd be happy to discuss it.",
      icon: "📅"
    }
  ];

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // Could add a toast notification here
      alert('Phrase copied to clipboard!');
    } catch (err) {
      alert('Failed to copy to clipboard');
    }
  };

  const resetDecisionTree = () => {
    setSelectedPriority(null);
    setSelectedCapacity(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">🛡️ The Art of Saying No</h2>
        <p className="text-lg text-gray-600">Ready-to-use phrases and a decision tree to help you decline gracefully.</p>
      </div>

      {/* Decision Tree */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">❓ Should I Say Yes? Decision Tree</h3>
          {(selectedPriority || selectedCapacity) && (
            <button
              onClick={resetDecisionTree}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              🔄 Reset
            </button>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <p className="font-medium text-gray-900 mb-4">Does this align with my top 3 priorities?</p>
            <div className="space-y-3">
              <button
                onClick={() => setSelectedPriority('yes')}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedPriority === 'yes' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                ✅ Yes, it directly supports my goals
              </button>
              <button
                onClick={() => setSelectedPriority('no')}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedPriority === 'no' 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 hover:border-red-300'
                }`}
              >
                ❌ No, it's not related to my priorities
              </button>
              <button
                onClick={() => setSelectedPriority('maybe')}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedPriority === 'maybe' 
                    ? 'border-yellow-500 bg-yellow-50' 
                    : 'border-gray-200 hover:border-yellow-300'
                }`}
              >
                ❓ I'm not sure
              </button>
            </div>
          </div>

          {/* Results */}
          {selectedPriority === 'no' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="font-semibold text-red-800">🚫 Say No!</p>
              <p className="text-red-700">If it doesn't align with your priorities, it's taking time away from what matters most.</p>
            </div>
          )}

          {selectedPriority === 'maybe' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="font-semibold text-yellow-800">⏸️ Pause and clarify your priorities first.</p>
              <p className="text-yellow-700">Take time to define your top 3 goals before committing.</p>
            </div>
          )}

          {selectedPriority === 'yes' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="font-semibold text-green-800 mb-4">Do I have the capacity right now?</p>
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedCapacity('yes')}
                  className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                    selectedCapacity === 'yes' 
                      ? 'border-green-600 bg-green-100' 
                      : 'border-green-300 hover:border-green-400'
                  }`}
                >
                  ✅ Yes, I'm under 70% capacity
                </button>
                <button
                  onClick={() => setSelectedCapacity('no')}
                  className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                    selectedCapacity === 'no' 
                      ? 'border-red-600 bg-red-100' 
                      : 'border-green-300 hover:border-red-400'
                  }`}
                >
                  ❌ No, I'm already overloaded
                </button>
              </div>
            </div>
          )}

          {selectedCapacity === 'yes' && (
            <div className="bg-green-100 border border-green-300 rounded-lg p-4">
              <p className="font-semibold text-green-800">👍 You can consider saying yes!</p>
              <p className="text-green-700">But set clear boundaries and timelines.</p>
            </div>
          )}

          {selectedCapacity === 'no' && (
            <div className="bg-red-100 border border-red-300 rounded-lg p-4">
              <p className="font-semibold text-red-800">🚫 Say No or Negotiate!</p>
              <p className="text-red-700">Offer alternatives: "I can't do this now, but I could help in [timeframe] or [different way]."</p>
            </div>
          )}
        </div>
      </div>

      {/* Ready-to-Use Phrases */}
      <div>
        <h3 className="text-xl font-semibold mb-6">💬 Ready-to-Use "No" Phrases</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {phrases.map((phrase, index) => (
            <div
              key={index}
              onClick={() => copyToClipboard(phrase.text)}
              className="bg-white border-l-4 border-blue-400 rounded-lg p-6 shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-3">{phrase.title}</h4>
              <p className="text-gray-700 leading-relaxed">"{phrase.text}"</p>
              <div className="mt-4 text-sm text-blue-600">Click to copy to clipboard</div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-blue-800 mb-3">💡 Pro Tips for Saying No</h4>
        <ul className="space-y-2 text-blue-700">
          <li>• <strong>Be prompt:</strong> Respond quickly rather than letting it linger</li>
          <li>• <strong>Be honest:</strong> Simple truth works better than elaborate excuses</li>
          <li>• <strong>Offer alternatives:</strong> Suggest other people or timeframes when possible</li>
          <li>• <strong>Stay firm:</strong> Don't let guilt or pressure change your decision</li>
        </ul>
      </div>
    </div>
  );
};

export default SayingNo;