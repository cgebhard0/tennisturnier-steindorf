import { useState, useEffect, useCallback } from 'react';
import { database, ref, onValue, set } from './lib/firebase';
import { 
  Match, 
  Bewerb, 
  gruppenStruktur, 
  standardSpiele 
} from './data/tournamentData';
import { safeStorage } from './hooks/useLocalStorage';
import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { Tabs, TabType } from './components/Tabs';
import { MatchList } from './components/MatchList';
import { RankingTable } from './components/RankingTable';
import { OverallRanking } from './components/OverallRanking';
import { ScoreModal } from './components/ScoreModal';
import { AdminPanel } from './components/AdminPanel';

function App() {
  // State für Bewerb, Gruppe und User
  const [bewerb, setBewerb] = useState<Bewerb>(() => {
    return (safeStorage.getItem('steindorfer_bewerb') as Bewerb) || 'Doppel';
  });

  const [gruppe, setGruppe] = useState<string>(() => {
    const savedBewerb = (safeStorage.getItem('steindorfer_bewerb') as Bewerb) || 'Doppel';
    return safeStorage.getItem(`steindorfer_group_${savedBewerb}`) || 'A';
  });

  const [currentUser, setCurrentUser] = useState<string>(() => {
    const savedBewerb = (safeStorage.getItem('steindorfer_bewerb') as Bewerb) || 'Doppel';
    const savedGruppe = safeStorage.getItem(`steindorfer_group_${savedBewerb}`) || 'A';
    return safeStorage.getItem(`steindorfer_user_${savedBewerb}${savedGruppe}`) || 'Gast';
  });

  // Spieledaten und UI State
  const [spiele, setSpiele] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('spiele');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  // Firebase Listener
  useEffect(() => {
    setLoading(true);
    const dbRef = ref(database, `turnier/${bewerb}_${gruppe}`);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const matchesWithDefaults = data.map((match: Match) => ({
          ...match,
          ergebnisse: match.ergebnisse || {}
        }));
        setSpiele(matchesWithDefaults);
      } else {
        // Initialize with standard data if none exists
        const standard = JSON.parse(JSON.stringify(standardSpiele[bewerb][gruppe] || []));
        set(dbRef, standard);
        setSpiele(standard);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [bewerb, gruppe]);

  // Bewerb Change Handler
  const handleBewerbChange = useCallback((newBewerb: Bewerb) => {
    setBewerb(newBewerb);
    safeStorage.setItem('steindorfer_bewerb', newBewerb);
    
    // Reset gruppe to first available
    const newGruppe = gruppenStruktur[newBewerb][0];
    setGruppe(newGruppe);
    safeStorage.setItem(`steindorfer_group_${newBewerb}`, newGruppe);
    
    // Load user for new bewerb/gruppe combination
    const savedUser = safeStorage.getItem(`steindorfer_user_${newBewerb}${newGruppe}`) || 'Gast';
    setCurrentUser(savedUser);
  }, []);

  // Gruppe Change Handler
  const handleGruppeChange = useCallback((newGruppe: string) => {
    setGruppe(newGruppe);
    safeStorage.setItem(`steindorfer_group_${bewerb}`, newGruppe);
    
    // Load user for new gruppe
    const savedUser = safeStorage.getItem(`steindorfer_user_${bewerb}${newGruppe}`) || 'Gast';
    setCurrentUser(savedUser);
  }, [bewerb]);

  // User Change Handler
  const handleUserChange = useCallback((newUser: string) => {
    setCurrentUser(newUser);
    safeStorage.setItem(`steindorfer_user_${bewerb}${gruppe}`, newUser);
  }, [bewerb, gruppe]);

  // Open Modal Handler
  const handleOpenModal = useCallback((matchId: string) => {
    const match = spiele.find(s => s.id === matchId);
    if (match && !match.cancelled) {
      setSelectedMatch(match);
    }
  }, [spiele]);

  // Save Score Handler
  const handleSaveScore = useCallback(async (matchId: string, ergebnisse: Record<string, number>) => {
    const matchIndex = spiele.findIndex(s => s.id === matchId);
    if (matchIndex === -1) return;

    const match = spiele[matchIndex];
    
    // Permission check
    const hasPermission = currentUser === 'Admin' || 
      (currentUser !== 'Gast' && match.spieler.includes(currentUser));
    
    if (!hasPermission) {
      alert('Keine Berechtigung! Das Ergebnis wurde nicht gespeichert.');
      return;
    }

    // Update local state
    const updatedSpiele = [...spiele];
    updatedSpiele[matchIndex] = {
      ...match,
      ergebnisse,
      gespielt: true
    };

    // Save to Firebase
    try {
      await set(ref(database, `turnier/${bewerb}_${gruppe}`), updatedSpiele);
    } catch (error) {
      console.error('Error saving score:', error);
      alert('Fehler beim Speichern.');
    }
  }, [spiele, bewerb, gruppe, currentUser]);

  // Data Reset Handler (für AdminPanel)
  const handleDataReset = useCallback(() => {
    // Firebase listener wird automatisch neu laden
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <Header
        bewerb={bewerb}
        gruppe={gruppe}
        currentUser={currentUser}
        onBewerbChange={handleBewerbChange}
        onGruppeChange={handleGruppeChange}
        onUserChange={handleUserChange}
      />

      <div className="max-w-xl mx-auto px-4 py-5">
        <ProgressBar spiele={spiele} loading={loading} />
        
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'spiele' && (
          <>
            <MatchList
              spiele={spiele}
              bewerb={bewerb}
              currentUser={currentUser}
              onOpenModal={handleOpenModal}
            />
            <AdminPanel
              bewerb={bewerb}
              gruppe={gruppe}
              currentUser={currentUser}
              onDataReset={handleDataReset}
            />
          </>
        )}

        {activeTab === 'rangliste' && (
          <RankingTable
            spiele={spiele}
            bewerb={bewerb}
            gruppe={gruppe}
          />
        )}

        {activeTab === 'gesamt' && (
          <OverallRanking />
        )}
      </div>

      {selectedMatch && (
        <ScoreModal
          match={selectedMatch}
          bewerb={bewerb}
          onClose={() => setSelectedMatch(null)}
          onSave={handleSaveScore}
        />
      )}
    </div>
  );
}

export default App;
