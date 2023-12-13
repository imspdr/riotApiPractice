export type playInfo = {
  kill: number;
  death: number;
  assist: number;
  win: number;
  championName: string;
};

export type participant = {
  name: string;
  deal: number;
} & playInfo;

export type game = {
  participants: participant[];
  myPlay: playInfo;
};

export type most = {
  champ: string;
  point: number;
};

export type tierInfo = {
  tier: string;
  rank: string;
  leaguePoints: number;
  queueType: string;
  wins: number;
  losses: number;
};
export type lolUser = {
  puuid: string;
  id: string;
  name: string;
  lastGames: game[];
  mosts: most[];
  tierList: tierInfo[];
};
