export interface LiveMatchItem {
  id: string;
  tournament: string;
  minute: string;
  status: "LIVE" | "HT" | "FT";
  homeClub: {
    name: string;
    shortName: string;
    logo: string;
    color?: string;
  };
  awayClub: {
    name: string;
    shortName: string;
    logo: string;
    color?: string;
  };
  homeScore: number;
  awayScore: number;
}

export interface TournamentItem {
  id: string;
  name: string;
  subtitle: string;
  type: string;
  image?: string;
  season?: string;
  playedMatches?: number;
  totalMatches?: number;
  progressPercent?: number;
  clubsCount?: number;
  groupsCount?: number;
  status: string;
  featured?: boolean;
  badgeType?: string;
}

export interface ActivityItem {
  id: string;
  type: "MATCH" | "SIGNING" | "AWARD" | "REGISTRATION" | "TRANSFER";
  text: string;
  highlight: string;
  time: string;
  avatar: string;
}

export interface WeeklyStarItem {
  id: string;
  category: string;
  iconType?: string;
  playerName: string;
  clubName: string;
  clubShort: string;
  avatar: string;
  statValue: string;
  statUnit?: string;
}

export interface TopScorerItem {
  rank: number;
  playerName: string;
  clubShort: string;
  avatar: string;
  goals: number;
  matches: number;
}

export interface ClubRankingItem {
  rank: number;
  clubName: string;
  shortName: string;
  logo: string;
  played: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
}

export interface TransferPlayerItem {
  id: string;
  name: string;
  country: string;
  flag: string;
  avatar: string;
  status: "FREE AGENT" | "TRANSFER LISTED" | "UNDER TERMINATION";
  marketValue: string;
  formerClub: string;
  position: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  readTime: string;
}

export interface EventItem {
  id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  prizePool: string;
  status: string;
}

export interface PartnerItem {
  name: string;
  category: string;
  logo: string;
}

export const homepageData = {
  hero: {
    eyebrow: "THE HOME OF eFOOTBALL",
    headingLine1: "UNITED BY PASSION",
    headingLine2: "POWERED BY",
    highlightWord: "PLAYERS",
    supportingText: "Compete. Represent. Grow. Be part of something bigger.",
    ctaPrimary: "Join Community",
    ctaSecondary: "Explore Tournaments",
    stats: [
      { value: "12K+", label: "Players" },
      { value: "350+", label: "Clubs" },
      { value: "95+", label: "Tournaments" },
      { value: "1M+", label: "Matches Played" },
    ],
  },
  liveMatches: [
    {
      id: "live-1",
      tournament: "Pro League 2025",
      minute: "45'",
      status: "LIVE" as const,
      homeClub: {
        name: "NEXA FC",
        shortName: "NEX",
        logo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&auto=format&fit=crop&q=80",
      },
      awayClub: {
        name: "RISING BD",
        shortName: "RBD",
        logo: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=100&auto=format&fit=crop&q=80",
      },
      homeScore: 2,
      awayScore: 1,
    },
    {
      id: "live-2",
      tournament: "Community Series",
      minute: "23'",
      status: "LIVE" as const,
      homeClub: {
        name: "LEGION",
        shortName: "LGN",
        logo: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&auto=format&fit=crop&q=80",
      },
      awayClub: {
        name: "TITANS",
        shortName: "TTN",
        logo: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=100&auto=format&fit=crop&q=80",
      },
      homeScore: 0,
      awayScore: 0,
    },
    {
      id: "live-3",
      tournament: "National Cup",
      minute: "78'",
      status: "LIVE" as const,
      homeClub: {
        name: "DHAKA XI",
        shortName: "DHK",
        logo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&auto=format&fit=crop&q=80",
      },
      awayClub: {
        name: "CHITTAGONG",
        shortName: "CTG",
        logo: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=100&auto=format&fit=crop&q=80",
      },
      homeScore: 1,
      awayScore: 2,
    },
  ],
  featuredTournament: {
    id: "tourn-nexa-pro",
    name: "Nexa Pro League 2025",
    season: "Season 1",
    subtitle: "Championship Tier · 24 National Franchises",
    image: "/images/trophy-gold.jpg",
    playedMatches: 115,
    totalMatches: 168,
    progressPercent: 68,
    clubsCount: 24,
    groupsCount: 6,
    championPill: "1 Champion",
  },
  tournamentsList: [
    {
      id: "tourn-nat-cup",
      name: "National Cup 2025",
      subtitle: "Knockout • 32 Teams",
      type: "Knockout",
      status: "Quarter-Finals",
      badgeType: "shield-green",
    },
    {
      id: "tourn-comm-series",
      name: "Community Series",
      subtitle: "Open • All Players",
      type: "Open",
      status: "Registration Open",
      badgeType: "circle-teal",
    },
    {
      id: "tourn-univ-league",
      name: "University League",
      subtitle: "Inter-University",
      type: "Collegiate",
      status: "Group Stage",
      badgeType: "trophy-slate",
    },
    {
      id: "tourn-club-battle",
      name: "Club Battle 2025",
      subtitle: "Top Clubs",
      type: "Invitational",
      status: "Starting Soon",
      badgeType: "shield-purple",
    },
  ],
  activities: [
    {
      id: "act-1",
      type: "MATCH" as const,
      text: "Rahat Khan won a match against Farhan",
      highlight: "Rahat Khan (3 - 1)",
      time: "2 minutes ago",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    },
    {
      id: "act-2",
      type: "SIGNING" as const,
      text: "NEXA FC signed a new player",
      highlight: "Tanvir Ahmed (@tanvir_pro)",
      time: "15 minutes ago",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
    },
    {
      id: "act-3",
      type: "AWARD" as const,
      text: "Prasen Jit was awarded Man of the Match",
      highlight: "MOTM Award · 2 Goals, 1 Assist",
      time: "1 hour ago",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=80",
    },
    {
      id: "act-4",
      type: "REGISTRATION" as const,
      text: "DHAKA XI registered for National Cup",
      highlight: "National Cup 2025 Entry",
      time: "3 hours ago",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
    },
    {
      id: "act-5",
      type: "TRANSFER" as const,
      text: "Transfer: Saif Ahmed joined LEGION",
      highlight: "Undisclosed Fee · 2-Year Deal",
      time: "5 hours ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    },
  ],
  weeklyStars: [
    {
      id: "star-1",
      category: "Player of the Week",
      iconType: "crown-gold",
      playerName: "Rahat Khan",
      clubName: "NEXA FC",
      clubShort: "NEX",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      statValue: "12.4",
    },
    {
      id: "star-2",
      category: "Top Scorer",
      iconType: "diamond-blue",
      playerName: "Prasen Jit",
      clubName: "TITANS",
      clubShort: "TTN",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
      statValue: "18",
      statUnit: "Goals",
    },
    {
      id: "star-3",
      category: "Most Wins",
      iconType: "trophy-green",
      playerName: "Saif Ahmed",
      clubName: "RISING BD",
      clubShort: "RBD",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
      statValue: "12",
      statUnit: "Wins",
    },
    {
      id: "star-4",
      category: "Best Win Rate",
      iconType: "shield-blue",
      playerName: "Mahim Haider",
      clubName: "LEGION",
      clubShort: "LGN",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
      statValue: "85%",
    },
    {
      id: "star-5",
      category: "Man of the Match",
      iconType: "crown-motm",
      playerName: "Fahim Islam",
      clubName: "DHAKA XI",
      clubShort: "DHK",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
      statValue: "7",
      statUnit: "Awards",
    },
    {
      id: "star-6",
      category: "Rising Star",
      iconType: "star-orange",
      playerName: "Tanzim Rafi",
      clubName: "CHITTAGONG",
      clubShort: "CTG",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80",
      statValue: "8.9",
      statUnit: "Rating",
    },
  ],
  topScorers: [
    { rank: 1, playerName: "Mahim Haider", clubShort: "DDE", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100", goals: 64, matches: 28 },
    { rank: 2, playerName: "Tanvir Ahmed", clubShort: "NEX", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", goals: 58, matches: 26 },
    { rank: 3, playerName: "Prasen Jit", clubShort: "CCK", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100", goals: 51, matches: 25 },
    { rank: 4, playerName: "Arafat Hossain", clubShort: "SYS", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100", goals: 46, matches: 24 },
    { rank: 5, playerName: "Saif Ahmed", clubShort: "LGN", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", goals: 42, matches: 22 },
  ],
  clubRankings: [
    { rank: 1, clubName: "Dhaka Dynamos", shortName: "DDE", logo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100", played: 14, won: 12, draw: 1, lost: 1, points: 37 },
    { rank: 2, clubName: "Chittagong Kings", shortName: "CCK", logo: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=100", played: 14, won: 11, draw: 2, lost: 1, points: 35 },
    { rank: 3, clubName: "NEXA FC", shortName: "NEX", logo: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100", played: 14, won: 10, draw: 1, lost: 3, points: 31 },
    { rank: 4, clubName: "Sylhet Strikers", shortName: "SYS", logo: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=100", played: 14, won: 8, draw: 3, lost: 3, points: 27 },
    { rank: 5, clubName: "LEGION Esports", shortName: "LGN", logo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100", played: 14, won: 7, draw: 2, lost: 5, points: 23 },
  ],
  transferPlayers: [
    {
      id: "tr-1",
      name: "Mahim Haider",
      country: "Bangladesh",
      flag: "🇧🇩",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200",
      status: "FREE AGENT" as const,
      marketValue: "$200M",
      formerClub: "Dhaka Dynamos",
      position: "CF · Center Forward",
    },
    {
      id: "tr-2",
      name: "Tanvir Ahmed",
      country: "Bangladesh",
      flag: "🇧🇩",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
      status: "TRANSFER LISTED" as const,
      marketValue: "$150M",
      formerClub: "NEXA FC",
      position: "SS · Second Striker",
    },
    {
      id: "tr-3",
      name: "Prasen Jit",
      country: "Bangladesh",
      flag: "🇧🇩",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200",
      status: "TRANSFER LISTED" as const,
      marketValue: "$120M",
      formerClub: "Chittagong Kings",
      position: "AMF · Attacking Mid",
    },
    {
      id: "tr-4",
      name: "Arafat Hossain",
      country: "Bangladesh",
      flag: "🇧🇩",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200",
      status: "UNDER TERMINATION" as const,
      marketValue: "$110M",
      formerClub: "Sylhet Strikers",
      position: "CMF · Center Mid",
    },
    {
      id: "tr-5",
      name: "Siam Chowdhury",
      country: "Bangladesh",
      flag: "🇧🇩",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
      status: "TRANSFER LISTED" as const,
      marketValue: "$90M",
      formerClub: "Rajshahi Royals",
      position: "RWF · Right Wing",
    },
  ],
  news: [
    {
      id: "news-1",
      title: "Nexa Pro League 2025 Kickoff Date Announced",
      category: "TOURNAMENT",
      date: "Apr 12, 2025",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "news-2",
      title: "Top 10 Players to Watch This Season",
      category: "SCOUTING",
      date: "Apr 10, 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "news-3",
      title: "Interview with NEXA FC Manager on Season Tactics",
      category: "INTERVIEW",
      date: "Apr 08, 2025",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&auto=format&fit=crop&q=80",
    },
  ],
  events: [
    {
      id: "ev-1",
      title: "Online Qualifiers",
      type: "Online Knockout",
      date: "Apr 20, 2025",
      location: "Konami BD-01 Server",
      prizePool: "50,000 BDT",
      status: "OPEN",
    },
    {
      id: "ev-2",
      title: "Grand Final - Nexa Pro League",
      type: "LAN Esports Stage",
      date: "May 15, 2025",
      location: "BICC Hall, Dhaka",
      prizePool: "250,000 BDT",
      status: "SELLING FAST",
    },
    {
      id: "ev-3",
      title: "Community Meetup & Exhibition",
      type: "Community Event",
      date: "Jun 10, 2025",
      location: "Dhanmondi Club, Dhaka",
      prizePool: "Exhibition Trophies",
      status: "UPCOMING",
    },
  ],
  partners: [
    { name: "NEXA Gaming Network", category: "Title Partner", logo: "NEXA" },
    { name: "Konami Esports BD", category: "Official Platform", logo: "KONAMI" },
    { name: "Aegis Tech Solutions", category: "Infrastructure", logo: "AEGIS" },
    { name: "ProGamer BD Gear", category: "Hardware Partner", logo: "PROGAMER" },
    { name: "RedBull BD Esports", category: "Energy Partner", logo: "REDBULL" },
    { name: "Dhaka Esports Arena", category: "Venue Partner", logo: "DHAKA ARENA" },
  ],
};
