export type Bewerb = 'Doppel' | 'Einzel';
export type DoppelGruppe = 'A' | 'B' | 'C';
export type EinzelGruppe = 'A' | 'B' | 'C' | 'D' | 'E';
export type Gruppe = DoppelGruppe | EinzelGruppe;

export interface Match {
  id: string;
  runde: string;
  datum: string;
  spieler: string[];
  gespielt: boolean;
  cancelled: boolean;
  ergebnisse: Record<string, number>;
}

export interface MatchPlan {
  runde: number;
  datum?: string;
  team1: string[];
  team2: string[];
}

export const gruppenStruktur: Record<Bewerb, string[]> = {
  'Doppel': ['A', 'B', 'C'],
  'Einzel': ['A', 'B', 'C', 'D', 'E']
};

export const spielerListen: Record<Bewerb, Record<string, string[]>> = {
  'Doppel': {
    'A': ["Gast", "Franky", "Andreas", "Elmar", "Andy", "Nina", "Pedro", "Günther", "Hannes", "Stefan P.", "Köste", "Peter", "Robi"],
    'B': ["Gast", "Christian", "Simone", "Zippe", "Gabi", "Sandra", "Stefan", "Wolfi", "Dietmar"],
    'C': ["Gast", "Anna B.", "Anna K.", "Sabrina", "Mandy", "Silke", "Michaela", "Bici", "Mister X"]
  },
  'Einzel': {
    'A': ["Gast", "Nina", "Peter", "Pedro", "Franky"],
    'B': ["Gast", "Elmar", "Andreas", "Günther", "Stefan P.", "Robi"],
    'C': ["Gast", "Hannes", "Christian", "Sandra", "Köste", "Stefan T."],
    'D': ["Gast", "Michaela", "Silke", "Zippe", "Sabrina"],
    'E': ["Gast", "Simone", "Bici", "Anna B.", "Anna K."]
  }
};

export const turnierSpielplaene: Record<string, MatchPlan[]> = {
  "Doppel A": [
    { runde: 1, datum: "22.5.-31.5.", team1: ["Nina*", "Günther"], team2: ["Stefan P.", "Köste"] },
    { runde: 1, datum: "22.5.-31.5.", team1: ["Robi*", "Franky"], team2: ["Andreas", "Hannes"] },
    { runde: 1, datum: "22.5.-31.5.", team1: ["Elmar*", "Pedro"], team2: ["Andy", "Peter"] },
    { runde: 2, datum: "29.5.-7.6.", team1: ["Robi*", "Andy"], team2: ["Nina", "Peter"] },
    { runde: 2, datum: "29.5.-7.6.", team1: ["Pedro*", "Stefan P."], team2: ["Günther", "Elmar"] },
    { runde: 2, datum: "29.5.-7.6.", team1: ["Hannes*", "Köste"], team2: ["Franky", "Andreas"] },
    { runde: 3, datum: "5.6.-14.6.", team1: ["Stefan P.*", "Franky"], team2: ["Köste", "Pedro"] },
    { runde: 3, datum: "5.6.-14.6.", team1: ["Peter*", "Andreas"], team2: ["Andy", "Nina"] },
    { runde: 3, datum: "5.6.-14.6.", team1: ["Robi*", "Günther"], team2: ["Hannes", "Elmar"] },
    { runde: 4, datum: "12.6.-21.6.", team1: ["Elmar*", "Nina"], team2: ["Günther", "Hannes"] },
    { runde: 4, datum: "12.6.-21.6.", team1: ["Robi*", "Köste"], team2: ["Peter", "Pedro"] },
    { runde: 4, datum: "12.6.-21.6.", team1: ["Franky*", "Andy"], team2: ["Andreas", "Stefan P."] },
    { runde: 5, datum: "19.6.-28.6.", team1: ["Robi*", "Andreas"], team2: ["Elmar", "Stefan P."] },
    { runde: 5, datum: "19.6.-28.6.", team1: ["Andy*", "Günther"], team2: ["Nina", "Franky"] },
    { runde: 5, datum: "19.6.-28.6.", team1: ["Pedro*", "Hannes"], team2: ["Köste", "Peter"] },
    { runde: 6, datum: "26.6.-5.7.", team1: ["Günther*", "Köste"], team2: ["Hannes", "Andy"] },
    { runde: 6, datum: "26.6.-5.7.", team1: ["Stefan P.*", "Peter"], team2: ["Andreas", "Elmar"] },
    { runde: 6, datum: "26.6.-5.7.", team1: ["Robi*", "Nina"], team2: ["Pedro", "Franky"] },
    { runde: 7, datum: "3.7.-12.7.", team1: ["Franky*", "Elmar"], team2: ["Nina", "Pedro"] },
    { runde: 7, datum: "3.7.-12.7.", team1: ["Robi*", "Hannes"], team2: ["Stefan P.", "Andy"] },
    { runde: 7, datum: "3.7.-12.7.", team1: ["Köste*", "Andreas"], team2: ["Peter", "Günther"] },
    { runde: 8, datum: "10.7.-19.7.", team1: ["Robi*", "Peter"], team2: ["Franky", "Günther"] },
    { runde: 8, datum: "10.7.-19.7.", team1: ["Andreas*", "Nina"], team2: ["Elmar", "Köste"] },
    { runde: 8, datum: "10.7.-19.7.", team1: ["Andy*", "Pedro"], team2: ["Hannes", "Stefan P."] },
    { runde: 9, datum: "17.7.-26.7.", team1: ["Nina*", "Hannes"], team2: ["Pedro", "Andreas"] },
    { runde: 9, datum: "17.7.-26.7.", team1: ["Günther*", "Stefan P."], team2: ["Peter", "Franky"] },
    { runde: 9, datum: "17.7.-26.7.", team1: ["Robi*", "Elmar"], team2: ["Andy", "Köste"] },
    { runde: 10, datum: "24.7.-2.8.", team1: ["Köste*", "Franky"], team2: ["Elmar", "Andy"] },
    { runde: 10, datum: "24.7.-2.8.", team1: ["Robi*", "Pedro"], team2: ["Günther", "Andreas"] },
    { runde: 10, datum: "24.7.-2.8.", team1: ["Hannes*", "Peter"], team2: ["Stefan P.", "Nina"] },
    { runde: 11, datum: "31.7.-9.8.", team1: ["Robi*", "Stefan P."], team2: ["Köste", "Nina"] },
    { runde: 11, datum: "31.7.-9.8.", team1: ["Peter*", "Elmar"], team2: ["Franky", "Hannes"] },
    { runde: 11, datum: "31.7.-9.8.", team1: ["Andreas*", "Andy"], team2: ["Pedro", "Günther"] }
  ],
  "Doppel B": [
    { runde: 1, datum: "22.5.-7.6.", team1: ["Christian*", "Simone"], team2: ["Zippe", "Gabi"] },
    { runde: 1, datum: "22.5.-7.6.", team1: ["Sandra*", "Stefan"], team2: ["Wolfi", "Dietmar"] },
    { runde: 2, datum: "5.6.-21.6.", team1: ["Simone*", "Wolfi"], team2: ["Christian", "Dietmar"] },
    { runde: 2, datum: "5.6.-21.6.", team1: ["Gabi*", "Sandra"], team2: ["Zippe", "Stefan"] },
    { runde: 3, datum: "19.6.-5.7.", team1: ["Christian*", "Gabi"], team2: ["Dietmar", "Sandra"] },
    { runde: 3, datum: "19.6.-5.7.", team1: ["Wolfi*", "Stefan"], team2: ["Simone", "Zippe"] },
    { runde: 4, datum: "3.7.-19.7.", team1: ["Dietmar*", "Simone"], team2: ["Sandra", "Zippe"] },
    { runde: 4, datum: "3.7.-19.7.", team1: ["Stefan*", "Gabi"], team2: ["Wolfi", "Christian"] },
    { runde: 5, datum: "17.7.-2.8.", team1: ["Stefan*", "Dietmar"], team2: ["Gabi", "Simone"] },
    { runde: 5, datum: "17.7.-2.8.", team1: ["Zippe*", "Christian"], team2: ["Sandra", "Wolfi"] },
    { runde: 6, datum: "31.7.-16.8.", team1: ["Gabi*", "Wolfi"], team2: ["Simone", "Sandra"] },
    { runde: 6, datum: "31.7.-16.8.", team1: ["Dietmar*", "Zippe"], team2: ["Christian", "Stefan"] },
    { runde: 7, datum: "14.8.-30.8.", team1: ["Wolfi*", "Zippe"], team2: ["Dietmar", "Gabi"] },
    { runde: 7, datum: "14.8.-30.8.", team1: ["Sandra*", "Christian"], team2: ["Stefan", "Simone"] }
  ],
  "Doppel C": [
    { runde: 1, datum: "22.5.-7.6.", team1: ["Mister X*", "Bici"], team2: ["Michaela", "Sabrina"] },
    { runde: 1, datum: "22.5.-7.6.", team1: ["Anna K.*", "Anna B."], team2: ["Mandy", "Silke"] },
    { runde: 2, datum: "5.6.-21.6.", team1: ["Bici*", "Mandy"], team2: ["Mister X", "Silke"] },
    { runde: 2, datum: "5.6.-21.6.", team1: ["Sabrina*", "Anna K."], team2: ["Michaela", "Anna B."] },
    { runde: 3, datum: "19.6.-5.7.", team1: ["Mister X*", "Sabrina"], team2: ["Silke", "Anna K."] },
    { runde: 3, datum: "19.6.-5.7.", team1: ["Mandy*", "Anna B."], team2: ["Bici", "Michaela"] },
    { runde: 4, datum: "3.7.-19.7.", team1: ["Silke*", "Bici"], team2: ["Anna K.", "Michaela"] },
    { runde: 4, datum: "3.7.-19.7.", team1: ["Anna B.*", "Sabrina"], team2: ["Mandy", "Mister X"] },
    { runde: 5, datum: "17.7.-2.8.", team1: ["Anna B.*", "Silke"], team2: ["Sabrina", "Bici"] },
    { runde: 5, datum: "17.7.-2.8.", team1: ["Michaela*", "Mister X"], team2: ["Anna K.", "Mandy"] },
    { runde: 6, datum: "31.7.-16.8.", team1: ["Sabrina*", "Mandy"], team2: ["Bici", "Anna K."] },
    { runde: 6, datum: "31.7.-16.8.", team1: ["Silke*", "Michaela"], team2: ["Mister X", "Anna B."] },
    { runde: 7, datum: "14.8.-30.8.", team1: ["Mandy*", "Michaela"], team2: ["Silke", "Sabrina"] },
    { runde: 7, datum: "14.8.-30.8.", team1: ["Anna K.*", "Mister X"], team2: ["Anna B.", "Bici"] }
  ],
  "Einzel A": [
    { runde: 1, team1: ["Nina"], team2: ["Peter"] },
    { runde: 1, team1: ["Pedro"], team2: ["Franky"] },
    { runde: 2, team1: ["Nina"], team2: ["Pedro"] },
    { runde: 2, team1: ["Peter"], team2: ["Franky"] },
    { runde: 3, team1: ["Nina"], team2: ["Franky"] },
    { runde: 3, team1: ["Peter"], team2: ["Pedro"] }
  ],
  "Einzel B": [
    { runde: 1, team1: ["Elmar"], team2: ["Andreas"] },
    { runde: 1, team1: ["Günther"], team2: ["Stefan P."] },
    { runde: 2, team1: ["Robi"], team2: ["Elmar"] },
    { runde: 2, team1: ["Andreas"], team2: ["Günther"] },
    { runde: 3, team1: ["Stefan P."], team2: ["Robi"] },
    { runde: 3, team1: ["Elmar"], team2: ["Günther"] },
    { runde: 4, team1: ["Andreas"], team2: ["Stefan P."] },
    { runde: 4, team1: ["Günther"], team2: ["Robi"] },
    { runde: 5, team1: ["Elmar"], team2: ["Stefan P."] },
    { runde: 5, team1: ["Andreas"], team2: ["Robi"] }
  ],
  "Einzel C": [
    { runde: 1, team1: ["Hannes"], team2: ["Christian"] },
    { runde: 1, team1: ["Sandra"], team2: ["Köste"] },
    { runde: 2, team1: ["Stefan T."], team2: ["Hannes"] },
    { runde: 2, team1: ["Christian"], team2: ["Sandra"] },
    { runde: 3, team1: ["Köste"], team2: ["Stefan T."] },
    { runde: 3, team1: ["Hannes"], team2: ["Sandra"] },
    { runde: 4, team1: ["Christian"], team2: ["Köste"] },
    { runde: 4, team1: ["Sandra"], team2: ["Stefan T."] },
    { runde: 5, team1: ["Hannes"], team2: ["Köste"] },
    { runde: 5, team1: ["Christian"], team2: ["Stefan T."] }
  ],
  "Einzel D": [
    { runde: 1, team1: ["Michaela"], team2: ["Silke"] },
    { runde: 1, team1: ["Zippe"], team2: ["Sabrina"] },
    { runde: 2, team1: ["Michaela"], team2: ["Zippe"] },
    { runde: 2, team1: ["Silke"], team2: ["Sabrina"] },
    { runde: 3, team1: ["Michaela"], team2: ["Sabrina"] },
    { runde: 3, team1: ["Silke"], team2: ["Zippe"] }
  ],
  "Einzel E": [
    { runde: 1, team1: ["Simone"], team2: ["Bici"] },
    { runde: 1, team1: ["Anna B."], team2: ["Anna K."] },
    { runde: 2, team1: ["Simone"], team2: ["Anna B."] },
    { runde: 2, team1: ["Bici"], team2: ["Anna K."] },
    { runde: 3, team1: ["Simone"], team2: ["Anna K."] },
    { runde: 3, team1: ["Bici"], team2: ["Anna B."] }
  ]
};

// Generate standard matches from tournament plans
export function generateStandardSpiele(): Record<Bewerb, Record<string, Match[]>> {
  const standardSpiele: Record<Bewerb, Record<string, Match[]>> = {
    'Doppel': { 'A': [], 'B': [], 'C': [] },
    'Einzel': { 'A': [], 'B': [], 'C': [], 'D': [], 'E': [] }
  };

  Object.keys(turnierSpielplaene).forEach(key => {
    const parts = key.split(" ");
    const bewerb = parts[0] as Bewerb;
    const gruppe = parts[1];
    let matchIndex = 1;

    turnierSpielplaene[key].forEach(spiel => {
      const rawSpieler = [...spiel.team1, ...spiel.team2];
      const cleanSpieler = rawSpieler.map(name => name.replace('*', ''));

      standardSpiele[bewerb][gruppe].push({
        id: `${bewerb.charAt(0).toLowerCase()}_${gruppe}_${matchIndex}`,
        runde: `Runde ${spiel.runde}`,
        datum: spiel.datum || "TBA",
        spieler: cleanSpieler,
        gespielt: false,
        cancelled: false,
        ergebnisse: {}
      });
      matchIndex++;
    });
  });

  return standardSpiele;
}

export const standardSpiele = generateStandardSpiele();
