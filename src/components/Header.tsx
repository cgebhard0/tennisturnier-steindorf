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
    <header className="relative bg-slate-900 text-white px-3 pb-4 pt-10 text-center sticky top-0 z-50 shadow-lg overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-400" />
      <a
        href="https://tennis-steindorf.at"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-2 top-2 rounded-md bg-amber-500 px-2.5 py-1.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-amber-600 sm:right-3 sm:px-3"
      >
        Tennisplatz Online-Buchung
      </a>
      
      <div className="mb-5 flex justify-center">
        <h1 className="relative inline-block px-2 text-2xl font-black leading-tight tracking-tight sm:text-3xl">
          <span className="bg-gradient-to-r from-emerald-300 via-white to-amber-200 bg-clip-text text-transparent drop-shadow-sm">
            Tennis-Turnierverwaltung SC Steindorf
          </span>
          <span className="absolute -bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.75)]" />
        </h1>
      </div>
      
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
