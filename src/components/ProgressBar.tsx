import React from 'react';
import { Match } from '../data/tournamentData';

interface ProgressBarProps {
  spiele: Match[];
  loading?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ spiele, loading }) => {
  const gesamtSpiele = spiele.filter(match => !match.cancelled).length;
  const gespielteSpiele = spiele.filter(match => match.gespielt && !match.cancelled).length;
  const prozent = gesamtSpiele > 0 ? Math.round((gespielteSpiele / gesamtSpiele) * 100) : 0;

  return (
    <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm mb-5">
      <div className="flex justify-between text-sm font-bold text-slate-800 mb-1.5">
        <span>Fortschritt</span>
        <span>
          {loading ? 'Synchronisiere...' : `${gespielteSpiele} / ${gesamtSpiele} Spiele (${prozent}%)`}
        </span>
      </div>
      <div className="bg-gray-200 w-full h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-emerald-500 h-full rounded-full transition-all duration-400 ease-out"
          style={{ width: `${prozent}%` }}
        />
      </div>
    </div>
  );
};
