import React, { useState } from 'react';

const CommunicationTool = () => {
  const [sentence, setSentence] = useState([]);

  const categories = [
    {
      name: "I want",
      color: "bg-blue-100",
      items: [
        { id: 1, text: "I want", emoji: "👋", prefix: true },
      ]
    },
    {
      name: "Food",
      color: "bg-green-100",
      items: [
        { id: 2, text: "apple", emoji: "🍎" },
        { id: 3, text: "banana", emoji: "🍌" },
        { id: 4, text: "water", emoji: "💧" },
        { id: 5, text: "milk", emoji: "🥛" },
        { id: 6, text: "cookie", emoji: "🍪" },
        { id: 7, text: "pizza", emoji: "🍕" },
      ]
    },
    {
      name: "Activities",
      color: "bg-purple-100",
      items: [
        { id: 8, text: "play", emoji: "⚽" },
        { id: 9, text: "read", emoji: "📖" },
        { id: 10, text: "draw", emoji: "🎨" },
        { id: 11, text: "music", emoji: "🎵" },
        { id: 12, text: "sleep", emoji: "😴" },
        { id: 13, text: "outside", emoji: "🌳" },
      ]
    },
    {
      name: "Feelings",
      color: "bg-yellow-100",
      items: [
        { id: 14, text: "I feel", emoji: "💭", prefix: true },
        { id: 15, text: "happy", emoji: "😊" },
        { id: 16, text: "sad", emoji: "😢" },
        { id: 17, text: "tired", emoji: "😴" },
        { id: 18, text: "angry", emoji: "😠" },
        { id: 19, text: "scared", emoji: "😨" },
      ]
    },
    {
      name: "People",
      color: "bg-pink-100",
      items: [
        { id: 20, text: "mom", emoji: "👩" },
        { id: 21, text: "dad", emoji: "👨" },
        { id: 22, text: "teacher", emoji: "👨‍🏫" },
        { id: 23, text: "friend", emoji: "👦" },
      ]
    },
    {
      name: "Help",
      color: "bg-red-100",
      items: [
        { id: 24, text: "help me", emoji: "🆘" },
        { id: 25, text: "bathroom", emoji: "🚽" },
        { id: 26, text: "break", emoji: "⏸️" },
        { id: 27, text: "quiet", emoji: "🤫" },
      ]
    }
  ];

  const addToSentence = (item) => {
    setSentence([...sentence, item]);
  };

  const removeFromSentence = (index) => {
    setSentence(sentence.filter((_, i) => i !== index));
  };

  const clearSentence = () => {
    setSentence([]);
  };

  const speakSentence = () => {
    if (sentence.length === 0) return;
    
    const text = sentence.map(item => item.text).join(' ');
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-600 mb-2">
            My Communication Board
          </h1>
          <p className="text-gray-600 text-lg">Tap pictures to tell us what you want</p>
        </div>

        {/* Sentence Display */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-8 min-h-32">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-700">Your Message:</h2>
            <div className="flex gap-2">
              <button
                onClick={clearSentence}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all transform hover:scale-105"
                aria-label="Clear message"
              >
                <span className="text-xl">🔄</span>
                Clear
              </button>
              <button
                onClick={speakSentence}
                disabled={sentence.length === 0}
                className={`px-6 py-2 rounded-xl flex items-center gap-2 transition-all transform hover:scale-105 ${
                  sentence.length === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
                aria-label="Speak message"
              >
                <span className="text-2xl">🔊</span>
                Speak
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 min-h-20">
            {sentence.length === 0 ? (
              <p className="text-gray-400 text-xl italic">Select pictures below...</p>
            ) : (
              sentence.map((item, index) => (
                <div
                  key={index}
                  className="bg-blue-100 rounded-2xl px-4 py-3 flex items-center gap-3 text-xl shadow-md"
                >
                  <span className="text-4xl">{item.emoji}</span>
                  <span className="font-semibold text-gray-700">{item.text}</span>
                  <button
                    onClick={() => removeFromSentence(index)}
                    className="text-red-500 hover:text-red-700 ml-2 text-2xl font-bold"
                    aria-label={`Remove ${item.text}`}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-6">
          {categories.map((category, catIndex) => (
            <div key={catIndex} className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-700 mb-4">{category.name}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {category.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => addToSentence(item)}
                    className={`${category.color} rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 border-4 border-transparent hover:border-purple-300`}
                    aria-label={`Add ${item.text} to message`}
                  >
                    <span className="text-6xl">{item.emoji}</span>
                    <span className="font-bold text-gray-700 text-lg text-center">
                      {item.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="text-lg">💙 Made with love for special kids 💙</p>
        </div>
      </div>
    </div>
  );
};

export default CommunicationTool;