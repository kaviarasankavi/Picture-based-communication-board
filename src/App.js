import React, { useState, useEffect } from 'react';

const CommunicationApp = () => {
  const [categories, setCategories] = useState([]);
  const [sentence, setSentence] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newItem, setNewItem] = useState({ text: '', emoji: '' });
  const [newCategory, setNewCategory] = useState({ name: '', color: 'bg-blue-100' });
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // Initialize with default data (simulating API call)
  useEffect(() => {
    const defaultCategories = [
      {
        id: 1,
        name: "I want",
        color: "bg-blue-100",
        items: [
          { id: 1, text: "I want", emoji: "👋", prefix: true },
        ]
      },
      {
        id: 2,
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
        id: 3,
        name: "Activities",
        color: "bg-purple-100",
        items: [
          { id: 8, text: "play", emoji: "⚽" },
          { id: 9, text: "read", emoji: "📖" },
          { id: 10, text: "draw", emoji: "🎨" },
          { id: 11, text: "music", emoji: "🎵" },
        ]
      },
      {
        id: 4,
        name: "Feelings",
        color: "bg-yellow-100",
        items: [
          { id: 14, text: "I feel", emoji: "💭", prefix: true },
          { id: 15, text: "happy", emoji: "😊" },
          { id: 16, text: "sad", emoji: "😢" },
          { id: 17, text: "tired", emoji: "😴" },
        ]
      }
    ];
    setCategories(defaultCategories);
  }, []);

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

  const handleAddItem = () => {
    if (!newItem.text || !newItem.emoji || !selectedCategory) return;
    
    const updatedCategories = categories.map(cat => {
      if (cat.id === selectedCategory.id) {
        return {
          ...cat,
          items: [...cat.items, { 
            id: Date.now(), 
            text: newItem.text, 
            emoji: newItem.emoji 
          }]
        };
      }
      return cat;
    });
    
    setCategories(updatedCategories);
    setNewItem({ text: '', emoji: '' });
    setShowAddModal(false);
    setSelectedCategory(null);
  };

  const handleDeleteItem = (categoryId, itemId) => {
    const updatedCategories = categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          items: cat.items.filter(item => item.id !== itemId)
        };
      }
      return cat;
    });
    setCategories(updatedCategories);
  };

  const handleAddCategory = () => {
    if (!newCategory.name) return;
    
    const newCat = {
      id: Date.now(),
      name: newCategory.name,
      color: newCategory.color,
      items: []
    };
    
    setCategories([...categories, newCat]);
    setNewCategory({ name: '', color: 'bg-blue-100' });
    setShowCategoryModal(false);
  };

  const colorOptions = [
    { value: 'bg-blue-100', label: 'Blue' },
    { value: 'bg-green-100', label: 'Green' },
    { value: 'bg-purple-100', label: 'Purple' },
    { value: 'bg-yellow-100', label: 'Yellow' },
    { value: 'bg-pink-100', label: 'Pink' },
    { value: 'bg-red-100', label: 'Red' },
    { value: 'bg-orange-100', label: 'Orange' },
    { value: 'bg-indigo-100', label: 'Indigo' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-purple-600">
              My Communication Board
            </h1>
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                isAdmin 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-purple-500 text-white hover:bg-purple-600'
              }`}
            >
              {isAdmin ? '👤 Exit Admin' : '🔐 Admin Mode'}
            </button>
          </div>
          <p className="text-gray-600 text-lg">Tap pictures to tell us what you want</p>
        </div>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">⚙️ Admin Controls</h2>
            <button
              onClick={() => setShowCategoryModal(true)}
              className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-all"
            >
              ➕ Add New Category
            </button>
          </div>
        )}

        {/* Sentence Display */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-8 min-h-32">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-700">Your Message:</h2>
            <div className="flex gap-2">
              <button
                onClick={clearSentence}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all transform hover:scale-105"
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
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-700">{category.name}</h3>
                {isAdmin && (
                  <button
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowAddModal(true);
                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
                  >
                    ➕ Add Item
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {category.items.map((item) => (
                  <div key={item.id} className="relative">
                    <button
                      onClick={() => addToSentence(item)}
                      className={`w-full ${category.color} rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 border-4 border-transparent hover:border-purple-300`}
                    >
                      <span className="text-6xl">{item.emoji}</span>
                      <span className="font-bold text-gray-700 text-lg text-center">
                        {item.text}
                      </span>
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteItem(category.id, item.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-all"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Add Item Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold mb-4">Add New Item to {selectedCategory?.name}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Text:</label>
                  <input
                    type="text"
                    value={newItem.text}
                    onChange={(e) => setNewItem({...newItem, text: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 outline-none"
                    placeholder="e.g., juice"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Emoji:</label>
                  <input
                    type="text"
                    value={newItem.emoji}
                    onChange={(e) => setNewItem({...newItem, emoji: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 outline-none text-4xl"
                    placeholder="🧃"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Copy emoji from: <a href="https://emojipedia.org" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Emojipedia</a>
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleAddItem}
                    className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all"
                  >
                    Add Item
                  </button>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setNewItem({ text: '', emoji: '' });
                      setSelectedCategory(null);
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Category Modal */}
        {showCategoryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold mb-4">Add New Category</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Category Name:</label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 outline-none"
                    placeholder="e.g., Toys"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Color:</label>
                  <select
                    value={newCategory.color}
                    onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 outline-none"
                  >
                    {colorOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleAddCategory}
                    className="flex-1 bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-all"
                  >
                    Add Category
                  </button>
                  <button
                    onClick={() => {
                      setShowCategoryModal(false);
                      setNewCategory({ name: '', color: 'bg-blue-100' });
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="text-lg">💙 Made with love for special kids 💙</p>
        </div>
      </div>
    </div>
  );
};

export default CommunicationApp;
