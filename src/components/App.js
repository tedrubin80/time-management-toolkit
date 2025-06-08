import React, { useState } from 'react';
import CapacityTracker from './components/CapacityTracker';
import SayingNo from './components/SayingNo';
import TimeBlocking from './components/TimeBlocking';
import DecisionMagic from './components/DecisionMagic';
import Emergency from './components/Emergency';
import './App.css';

const tabs = [
  { id: 'capacity', label: 'Capacity', icon: '📊', component: CapacityTracker },
  { id: 'saying-no', label: 'Saying No', icon: '🛡️', component: SayingNo },
  { id: 'time-blocking', label: 'Time Blocking', icon: '📅', component: TimeBlocking },
  { id: 'decision-magic', label: 'Decision Magic', icon: '✨', component: DecisionMagic },
  { id: 'emergency', label: 'Emergency', icon: '⚠️', component: Emergency },
];

function App() {
  const [activeTab, setActiveTab] = useState('capacity');

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-12 text-center">
            <h1 className="text-4xl font-bold mb-4">🎯 Time Management Toolkit</h1>
            <p className="text-xl opacity-90">Master your workload and learn to say no with confidence</p>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {ActiveComponent && <ActiveComponent />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;