import React, { useRef } from 'react';
import { database, firebaseConfig, ref, set, get } from '../lib/firebase';
import {
  standardSpiele,
  Bewerb,
  gruppenStruktur,
  spielerListen,
  turnierSpielplaene,
} from '../data/tournamentData';
import { appSourceFiles } from '../data/appCodeArchive';

interface AdminPanelProps {
  bewerb: Bewerb;
  gruppe: string;
  currentUser: string;
  onDataReset: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  bewerb,
  gruppe,
  currentUser,
  onDataReset
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (currentUser !== 'Admin') return null;

  const handleExport = async () => {
    try {
      const snapshot = await get(ref(database, 'turnier'));
      const data = snapshot.val();
      
      if (!data) {
        alert('Es sind online noch keine Spieldaten zum Exportieren vorhanden.');
        return;
      }

      const exportPackage = {
        exportVersion: 2,
        exportedAt: new Date().toISOString(),
        firebase: {
          config: firebaseConfig,
          exportedDatabasePath: 'turnier',
        },
        onlineTournamentData: data,
        tournamentDefinitions: {
          gruppenStruktur,
          spielerListen,
          turnierSpielplaene,
          standardSpiele,
        },
        appCode: {
          format: 'path-to-source-content',
          sourceFiles: appSourceFiles,
        },
      };

      const jsonString = JSON.stringify(exportPackage, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const downloadAnchor = document.createElement('a');
      downloadAnchor.href = url;
      downloadAnchor.download = `sc_steindorf_turnier_full_export_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      document.body.removeChild(downloadAnchor);
      URL.revokeObjectURL(url);
      alert('Export erfolgreich!');
    } catch (error) {
      console.error('Export error:', error);
      alert('Fehler beim Exportieren der Daten: ' + (error as Error).message);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const pin = prompt("Admin-PIN eingeben um Import freizuschalten:");
    if (pin !== "2026") {
      alert("Falscher PIN. Import abgebrochen.");
      event.target.value = '';
      return;
    }

    if (!confirm("ACHTUNG: Das Laden dieser Datei überschreibt alle aktuellen Online-Spielstände unwiderruflich! Fortfahren?")) {
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const importedJson = JSON.parse(e.target?.result as string);
        const importData = importedJson?.onlineTournamentData || importedJson;
        if (typeof importData === 'object' && importData !== null) {
          await set(ref(database, 'turnier'), importData);
          alert("Backup erfolgreich eingespielt und online aktualisiert!");
          onDataReset();
        } else {
          alert("Fehler: Ungültiges Datenformat im Backup.");
        }
      } catch (err) {
        alert("Fehler beim Lesen der JSON-Datei: " + (err as Error).message);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleReset = async () => {
    const pin = prompt("PIN eingeben:");
    if (pin !== "2026") {
      alert("Falscher PIN.");
      return;
    }

    if (!confirm("Diese Gruppe online zurücksetzen?")) return;

    try {
      const standard = JSON.parse(JSON.stringify(standardSpiele[bewerb][gruppe]));
      await set(ref(database, `turnier/${bewerb}_${gruppe}`), standard);
      alert("Online zurückgesetzt.");
      onDataReset();
    } catch (error) {
      console.error('Reset error:', error);
      alert('Fehler beim Zurücksetzen.');
    }
  };

  return (
    <div className="mt-8 p-4 bg-slate-100 rounded-lg border border-slate-200">
      <h3 className="text-lg font-bold text-slate-800 mb-4">🔧 Admin-Bereich</h3>
      
      <div className="space-y-3">
        <button
          onClick={handleExport}
          className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-bold transition-colors"
        >
          📥 Export
        </button>
        
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-md font-bold transition-colors"
          >
            📤 Import
          </button>
        </div>
        
        <button
          onClick={handleReset}
          className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md font-bold transition-colors"
        >
          🗑️ Gruppe zurücksetzen
        </button>
      </div>
    </div>
  );
};
