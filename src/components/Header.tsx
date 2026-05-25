import React from 'react';
import { Bewerb, gruppenStruktur, spielerListen } from '../data/tournamentData';

interface HeaderProps {
  bewerb: Bewerb;
  gruppe: string;
  currentUser: string;
  onBewerbChange: (bewerb: Bewerb) => void;
  onGruppeChange: (gruppe: string) => void;
  onUserChange: (user: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  bewerb,
  gruppe,
  currentUser,
  onBewerbChange,
  onGruppeChange,
  onUserChange
}) => {
  const gruppen = gruppenStruktur[bewerb];
  const spieler = spielerListen[bewerb][gruppe] || [];

  return (
    <header className="bg-slate-800 text-white py-4 px-3 text-center sticky top-0 z-50 shadow-lg">
      <a
        href="https://tennis-steindorf.at"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 px-5 rounded-lg mb-4 transition-colors text-base"
      >
        🎾 Tennisplatz Online-Buchung
      </a>
      
      <h1 className="text-xl font-bold mb-4 text-emerald-400">
        Tennis-Turnierverwaltung SC Steindorf
      </h1>
      
      <div className="flex justify-center gap-3 flex-wrap">
        <div className="bg-white/20 py-2.5 px-4 rounded-lg border border-white/30 flex items-center gap-2">
          <span className="text-sm">Bewerb:</span>
          <select
            value={bewerb}
            onChange={(e) => onBewerbChange(e.target.value as Bewerb)}
            className="bg-transparent text-white font-bold outline-none cursor-pointer appearance-none"
          >
            <option value="Doppel" className="text-black">Doppel</option>
            <option value="Einzel" className="text-black">Einzel</option>
          </select>
        </div>
        
        <div className="bg-white/20 py-2.5 px-4 rounded-lg border border-white/30 flex items-center gap-2">
          <span className="text-sm">Gruppe:</span>
          <select
            value={gruppe}
            onChange={(e) => onGruppeChange(e.target.value)}
            className="bg-transparent text-white font-bold outline-none cursor-pointer appearance-none"
          >
            {gruppen.map(g => (
              <option key={g} value={g} className="text-black">Gruppe {g}</option>
            ))}
          </select>
        </div>
        
        <div className="bg-white/20 py-2.5 px-4 rounded-lg border border-white/30 flex items-center gap-2">
          <span className="text-sm">Profil:</span>
          <select
            value={currentUser}
            onChange={(e) => {
              const newValue = e.target.value;
              if (newValue === 'Admin') {
                const pin = prompt('Admin-PIN eingeben:');
                if (pin === '2026') {
                  onUserChange(newValue);
                } else {
                  alert('Falscher PIN!');
                  e.target.value = currentUser;
                }
              } else {
                onUserChange(newValue);
              }
            }}
            className="bg-transparent text-white font-bold outline-none cursor-pointer appearance-none"
          >
            <option value="Gast" className="text-black">Gast</option>
            <option value="Admin" className="text-black">Admin</option>
            {spieler.filter(s => s !== 'Gast').map(user => (
              <option key={user} value={user} className="text-black">{user}</option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};
