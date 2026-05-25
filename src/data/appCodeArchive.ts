import indexHtml from '../../index.html?raw';
import packageJson from '../../package.json?raw';
import viteConfig from '../../vite.config.ts?raw';
import appTsx from '../App.tsx?raw';
import mainTsx from '../main.tsx?raw';
import indexCss from '../index.css?raw';
import adminPanelTsx from '../components/AdminPanel.tsx?raw';
import headerTsx from '../components/Header.tsx?raw';
import matchCardTsx from '../components/MatchCard.tsx?raw';
import matchListTsx from '../components/MatchList.tsx?raw';
import overallRankingTsx from '../components/OverallRanking.tsx?raw';
import progressBarTsx from '../components/ProgressBar.tsx?raw';
import rankingTableTsx from '../components/RankingTable.tsx?raw';
import scoreModalTsx from '../components/ScoreModal.tsx?raw';
import tabsTsx from '../components/Tabs.tsx?raw';
import tournamentDataTs from './tournamentData.ts?raw';
import useLocalStorageTs from '../hooks/useLocalStorage.ts?raw';
import firebaseTs from '../lib/firebase.ts?raw';
import cnTs from '../utils/cn.ts?raw';

export const appSourceFiles: Record<string, string> = {
  'index.html': indexHtml,
  'package.json': packageJson,
  'vite.config.ts': viteConfig,
  'src/App.tsx': appTsx,
  'src/main.tsx': mainTsx,
  'src/index.css': indexCss,
  'src/components/AdminPanel.tsx': adminPanelTsx,
  'src/components/Header.tsx': headerTsx,
  'src/components/MatchCard.tsx': matchCardTsx,
  'src/components/MatchList.tsx': matchListTsx,
  'src/components/OverallRanking.tsx': overallRankingTsx,
  'src/components/ProgressBar.tsx': progressBarTsx,
  'src/components/RankingTable.tsx': rankingTableTsx,
  'src/components/ScoreModal.tsx': scoreModalTsx,
  'src/components/Tabs.tsx': tabsTsx,
  'src/data/tournamentData.ts': tournamentDataTs,
  'src/hooks/useLocalStorage.ts': useLocalStorageTs,
  'src/lib/firebase.ts': firebaseTs,
  'src/utils/cn.ts': cnTs,
};
