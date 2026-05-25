import React from 'react';
import { Match, Bewerb } from '../data/tournamentData';
import { MatchCard } from './MatchCard';

interface MatchListProps {
  spiele: Match[];
  bewerb: Bewerb;
  currentUser: string;
  onOpenModal: (matchId: string) => void;
}

export const MatchList: React.FC<MatchListProps> = ({
  spiele,
  bewerb,
  currentUser,
  onOpenModal
}) => {
  const darfErgebnisEintragen = (match: Match): boolean => {
    if (currentUser === 'Admin') return true;
    if (!currentUser || currentUser === 'Gast') return false;
    return match.spieler.includes(currentUser);
  };

  let aktuelleRunde = '';

  return (
    <div>
      {spiele.map(match => {
        const isNewRunde = match.runde !== aktuelleRunde;
        if (isNewRunde) {
          aktuelleRunde = match.runde;
        }

        return (
          <React.Fragment key={match.id}>
            {isNewRunde && (
              <div className="mt-6 mb-3 text-lg font-semibold text-slate-800 border-l-4 border-emerald-500 pl-2">
                {match.runde}{' '}
                <span className="text-gray-500 text-sm font-normal">({match.datum})</span>
              </div>
            )}
            <MatchCard
              match={match}
              bewerb={bewerb}
              hasPermission={darfErgebnisEintragen(match)}
              onOpenModal={onOpenModal}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};
