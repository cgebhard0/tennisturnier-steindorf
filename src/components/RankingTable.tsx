import React from 'react';
import { Match, Bewerb, spielerListen } from '../data/tournamentData';

interface RankingTableProps {
  spiele: Match[];
  bewerb: Bewerb;
  gruppe: string;
}

interface PlayerStats {
  name: string;
  games: number;
  siege: number;
  saetze: number;
}

export const RankingTable: React.FC<RankingTableProps> = ({
  spiele,
  bewerb,
  gruppe
}) => {
  const isEinzel = bewerb === 'Einzel';
  const spielerList = spielerListen[bewerb][gruppe] || [];

  // Calculate stats
  const stats: Record<string, PlayerStats> = {};
  spielerList.filter(s => s !== 'Gast').forEach(s => {
    stats[s] = { name: s, games: 0, siege: 0, saetze: 0 };
  });

  spiele.forEach(match => {
    if (match.gespielt && !match.cancelled) {
      if (isEinzel) {
        const p1 = match.spieler[0];
        const p2 = match.spieler[1];
        const s1 = match.ergebnisse[p1] || 0;
        const s2 = match.ergebnisse[p2] || 0;

        if (stats[p1]) {
          stats[p1].saetze += s1;
          if (s1 > s2) stats[p1].siege += 1;
        }
        if (stats[p2]) {
          stats[p2].saetze += s2;
          if (s2 > s1) stats[p2].siege += 1;
        }
      } else {
        match.spieler.forEach(spieler => {
          if (stats[spieler]) {
            stats[spieler].games += (match.ergebnisse[spieler] || 0);
          }
        });
      }
    }
  });

  // Sort
  let sortiert = Object.values(stats);
  if (isEinzel) {
    sortiert.sort((a, b) => (b.siege !== a.siege) ? (b.siege - a.siege) : (b.saetze - a.saetze));
  } else {
    sortiert.sort((a, b) => b.games - a.games);
  }

  const getPlatzDisplay = (index: number) => {
    if (index === 0) return <span className="text-amber-500 font-bold">1🥇</span>;
    if (index === 1) return <span>2🥈</span>;
    if (index === 2) return <span>3🥉</span>;
    return index + 1;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-lg overflow-hidden text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-3 text-left w-16">Platz</th>
            <th className="py-3 px-3 text-left">Spieler</th>
            {isEinzel ? (
              <>
                <th className="py-3 px-3 text-right">Siege</th>
                <th className="py-3 px-3 text-right">Sätze</th>
              </>
            ) : (
              <th className="py-3 px-3 text-right">Games</th>
            )}
          </tr>
        </thead>
        <tbody>
          {sortiert.map((spieler, index) => (
            <tr key={spieler.name} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-3">{getPlatzDisplay(index)}</td>
              <td className="py-3 px-3 font-bold">{spieler.name}</td>
              {isEinzel ? (
                <>
                  <td className="py-3 px-3 text-right font-bold text-emerald-600">{spieler.siege}</td>
                  <td className="py-3 px-3 text-right">{spieler.saetze}</td>
                </>
              ) : (
                <td className="py-3 px-3 text-right font-bold text-emerald-600">{spieler.games}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
