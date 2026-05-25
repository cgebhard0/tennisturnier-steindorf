import React, { useState, useEffect } from 'react';
import { database, ref, get } from '../lib/firebase';
import { spielerListen, Match } from '../data/tournamentData';

interface PlayerStats {
  name: string;
  gruppe: string;
  games: number;
  siege: number;
  saetze: number;
}

export const OverallRanking: React.FC = () => {
  const [doppelStats, setDoppelStats] = useState<PlayerStats[]>([]);
  const [einzelStats, setEinzelStats] = useState<PlayerStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const snapshot = await get(ref(database, 'turnier'));
        const allData = snapshot.val() || {};

        // Initialize stats
        const doppel: Record<string, PlayerStats> = {};
        const einzel: Record<string, PlayerStats> = {};

        // Build initial structure from player lists
        (Object.keys(spielerListen) as Array<'Doppel' | 'Einzel'>).forEach(bewerb => {
          Object.keys(spielerListen[bewerb]).forEach(gruppe => {
            spielerListen[bewerb][gruppe].forEach((spieler: string) => {
              if (spieler !== 'Gast') {
                const key = `${spieler} (${gruppe})`;
                if (bewerb === 'Doppel') {
                  doppel[key] = { name: spieler, gruppe, games: 0, siege: 0, saetze: 0 };
                } else {
                  einzel[key] = { name: spieler, gruppe, games: 0, siege: 0, saetze: 0 };
                }
              }
            });
          });
        });

        // Process match data
        Object.keys(allData).forEach(groupKey => {
          const parts = groupKey.split('_');
          const bewerb = parts[0];
          const gruppe = parts[1];
          const matches: Match[] = allData[groupKey] || [];

          matches.forEach(match => {
            if (match.gespielt && !match.cancelled) {
              if (bewerb === 'Einzel') {
                const p1 = match.spieler[0];
                const p2 = match.spieler[1];
                const s1 = (match.ergebnisse?.[p1]) || 0;
                const s2 = (match.ergebnisse?.[p2]) || 0;
                const k1 = `${p1} (${gruppe})`;
                const k2 = `${p2} (${gruppe})`;

                if (einzel[k1]) {
                  einzel[k1].saetze += s1;
                  if (s1 > s2) einzel[k1].siege += 1;
                }
                if (einzel[k2]) {
                  einzel[k2].saetze += s2;
                  if (s2 > s1) einzel[k2].siege += 1;
                }
              } else if (bewerb === 'Doppel') {
                match.spieler.forEach(spieler => {
                  const key = `${spieler} (${gruppe})`;
                  if (doppel[key]) {
                    doppel[key].games += (match.ergebnisse?.[spieler]) || 0;
                  }
                });
              }
            }
          });
        });

        // Sort and set state
        const sortedDoppel = Object.values(doppel).sort((a, b) => b.games - a.games);
        const sortedEinzel = Object.values(einzel).sort((a, b) => 
          (b.siege !== a.siege) ? (b.siege - a.siege) : (b.saetze - a.saetze)
        );

        setDoppelStats(sortedDoppel);
        setEinzelStats(sortedEinzel);
      } catch (error) {
        console.error('Error fetching overall data:', error);
      }
      setLoading(false);
    };

    fetchAllData();
  }, []);

  const getPlatzDisplay = (index: number) => {
    if (index === 0) return <span className="text-amber-500 font-bold">1🥇</span>;
    if (index === 1) return <span>2🥈</span>;
    if (index === 2) return <span>3🥉</span>;
    return index + 1;
  };

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500">
        Lade globale Daten...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Doppel Gesamt */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-3 border-l-4 border-emerald-500 pl-2">
          🏆 Doppel Gesamtrangliste
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-3 text-left w-16">Platz</th>
                <th className="py-3 px-3 text-left">Spieler</th>
                <th className="py-3 px-3 text-right">Games</th>
              </tr>
            </thead>
            <tbody>
              {doppelStats.map((spieler, index) => (
                <tr key={`${spieler.name}-${spieler.gruppe}`} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-3">{getPlatzDisplay(index)}</td>
                  <td className="py-3 px-3">
                    <strong>{spieler.name}</strong>{' '}
                    <span className="text-gray-500 text-xs">(Gruppe {spieler.gruppe})</span>
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-emerald-600">{spieler.games}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Einzel Gesamt */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-3 border-l-4 border-emerald-500 pl-2">
          🏆 Einzel Gesamtrangliste
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-3 text-left w-16">Platz</th>
                <th className="py-3 px-3 text-left">Spieler</th>
                <th className="py-3 px-3 text-right">Siege</th>
                <th className="py-3 px-3 text-right">Sätze</th>
              </tr>
            </thead>
            <tbody>
              {einzelStats.map((spieler, index) => (
                <tr key={`${spieler.name}-${spieler.gruppe}`} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-3">{getPlatzDisplay(index)}</td>
                  <td className="py-3 px-3">
                    <strong>{spieler.name}</strong>{' '}
                    <span className="text-gray-500 text-xs">(Gruppe {spieler.gruppe})</span>
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-emerald-600">{spieler.siege}</td>
                  <td className="py-3 px-3 text-right">{spieler.saetze}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
