import React from 'react';

export type TabType = 'spiele' | 'rangliste' | 'gesamt';

interface TabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'spiele', label: 'Spiele' },
    { id: 'rangliste', label: 'Rangliste' },
    { id: 'gesamt', label: 'Gesamt' }
  ];

  return (
    <div className="flex mb-4 bg-gray-200 p-1 rounded-lg">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-3 px-2 font-bold rounded-md transition-colors text-sm ${
            activeTab === tab.id
              ? 'bg-emerald-500 text-white'
              : 'bg-transparent text-gray-600 hover:bg-gray-300'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
