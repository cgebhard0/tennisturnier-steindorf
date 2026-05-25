import React, { useState, useEffect } from 'react';
import { Match, Bewerb } from '../data/tournamentData';

interface ScoreModalProps {
  match: Match | null;
  bewerb: Bewerb;
  onClose: () => void;
  onSave: (matchId: string, ergebnisse: Record<string, number>) => void;
}

export const ScoreModal: React.FC<ScoreModalProps> = ({
  match,
  bewerb,
  onClose,
  onSave
}) => {
  const [scores, setScores] = useState<Record<string, number>>({});

  useEffect(() => {
    if (match) {
      const initialScores: Record<string, number> = {};
      match.spieler.forEach(spieler => {
        initialScores[spieler] = match.ergebnisse?.[spieler] ?? 0;
      });
      setScores(initialScores);
    }
  }, [match]);

  if (!match) return null;

  const isEinzel = bewerb === 'Einzel';

  const handleScoreChange = (spieler: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setScores(prev => ({ ...prev, [spieler]: numValue }));
  };

  const handleSave = () => {
    if (isEinzel) {
      const values = Object.values(scores);
      const hasWinner = values.some(v => v === 2);
      const bothWin = values.every(v => v === 2);

      if (!hasWinner) {
        alert('Fehler: Ein Spieler muss exakt 2 Gewinnsätze haben!');
        return;
      }
      if (bothWin) {
        alert('Fehler: Es können nicht beide Spieler 2 Sätze gewinnen!');
        return;
      }
    }

    onSave(match.id, scores);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          {isEinzel ? 'Sätze eintragen' : 'Games eintragen'}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          {isEinzel
            ? 'Auf 2 Gewinnsätze (0, 1 oder 2 eintragen).'
            : 'Gewonnene Games aller Sätze zusammenzählen.'}
        </p>

        <div className="space-y-4 mb-6">
          {match.spieler.map(spieler => (
            <div key={spieler} className="flex items-center gap-4">
              <label className="flex-1 font-medium text-gray-700">{spieler}</label>
              <input
                type="number"
                min={0}
                max={isEinzel ? 2 : undefined}
                value={scores[spieler] ?? 0}
                onChange={(e) => handleScoreChange(spieler, e.target.value)}
                className="w-24 p-2 border border-gray-300 rounded-md text-center text-lg font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                inputMode="numeric"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-300 rounded-md font-bold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 px-4 bg-emerald-500 text-white rounded-md font-bold hover:bg-emerald-600 transition-colors"
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
};
