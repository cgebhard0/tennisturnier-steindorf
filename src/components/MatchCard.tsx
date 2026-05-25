import React from 'react';
import { Match, Bewerb } from '../data/tournamentData';

interface MatchCardProps {
  match: Match;
  bewerb: Bewerb;
  hasPermission: boolean;
  onOpenModal: (matchId: string) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  match,
  bewerb,
  hasPermission,
  onOpenModal
}) => {
  const isDoppel = bewerb === 'Doppel';

  const getStatusStyles = () => {
    if (match.cancelled) return 'bg-red-100 text-red-600';
    if (match.gespielt) return 'bg-emerald-100 text-emerald-700';
    return 'bg-amber-100 text-amber-700';
  };

  const getStatusText = () => {
    if (match.cancelled) return 'Abgesagt';
    if (match.gespielt) return 'Abgeschlossen';
    return 'Offen';
  };

  const renderSpieler = () => {
    if (isDoppel) {
      return (
        <div className="text-sm text-gray-700 mb-2">
          <strong>Pool:</strong>{' '}
          {match.spieler.map((s, idx) => (
            <span key={s}>
              {idx === 0 ? (
                <span className="text-emerald-600 font-semibold">{s}</span>
              ) : (
                s
              )}
              {idx < match.spieler.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      );
    }

    return (
      <div className="text-lg text-center font-bold my-3">
        {match.spieler[0]}{' '}
        <span className="text-gray-400">vs.</span>{' '}
        {match.spieler[1]}
      </div>
    );
  };

  const renderErgebnis = () => {
    if (match.cancelled) {
      return (
        <div className="text-center text-red-500 py-2">
          Spiel annulliert ❌
        </div>
      );
    }

    if (!match.gespielt) return null;

    const suffix = isDoppel ? ' Games' : ' Sätze';
    const trenner = isDoppel ? ' | ' : ' • ';

    return (
      <div className="bg-gray-50 rounded p-2 text-sm text-center mb-2">
        {match.spieler.map((s, idx) => (
          <span key={s}>
            <strong>{s}:</strong> {match.ergebnisse[s] ?? 0}{suffix}
            {idx < match.spieler.length - 1 ? trenner : ''}
          </span>
        ))}
      </div>
    );
  };

  const renderButton = () => {
    if (match.cancelled) {
      return (
        <button
          disabled
          className="w-full bg-gray-400 text-white py-3 px-4 rounded-md font-bold cursor-not-allowed opacity-70"
        >
          Kein Spiel möglich 🔒
        </button>
      );
    }

    if (match.gespielt) {
      if (hasPermission) {
        return (
          <button
            onClick={() => onOpenModal(match.id)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md font-bold transition-colors"
          >
            Bearbeiten
          </button>
        );
      }
      return (
        <button
          onClick={() => alert('Nur der Admin oder die beteiligten Spieler dürfen dieses Ergebnis bearbeiten.')}
          className="w-full bg-gray-400 text-white py-3 px-4 rounded-md font-bold cursor-not-allowed"
        >
          Gesperrt 🔒
        </button>
      );
    }

    if (hasPermission) {
      return (
        <button
          onClick={() => onOpenModal(match.id)}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-md font-bold transition-colors"
        >
          Eintragen
        </button>
      );
    }

    return (
      <button
        onClick={() => alert('Nur der Admin oder die beteiligten Spieler dürfen dieses Ergebnis eintragen.')}
        className="w-full bg-gray-400 text-white py-3 px-4 rounded-md font-bold cursor-not-allowed"
      >
        Eintragen 🔒
      </button>
    );
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200 shadow-sm">
      <div className={`inline-block px-2 py-1 rounded text-xs font-bold mb-2 ${getStatusStyles()}`}>
        {getStatusText()}
      </div>
      {renderSpieler()}
      {renderErgebnis()}
      {renderButton()}
    </div>
  );
};
