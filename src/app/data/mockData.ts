import { Station, Route, FavoriteRoute, CarRecommendation } from '@/app/types';

export const stations: Station[] = [
  { id: '1', name: '강남역', line: '2호선' },
  { id: '2', name: '역삼역', line: '2호선' },
  { id: '3', name: '삼성역', line: '2호선' },
  { id: '4', name: '선릉역', line: '2호선, 분당선' },
  { id: '5', name: '홍대입구역', line: '2호선, 경의중앙선, 공항철도' },
  { id: '6', name: '신촌역', line: '2호선' },
  { id: '7', name: '이대역', line: '2호선' },
  { id: '8', name: '시청역', line: '1호선, 2호선' },
  { id: '9', name: '을지로입구역', line: '2호선' },
  { id: '10', name: '종각역', line: '1호선' },
  { id: '11', name: '광화문역', line: '5호선' },
  { id: '12', name: '교대역', line: '2호선, 3호선' },
  { id: '13', name: '서초역', line: '2호선' },
  { id: '14', name: '잠실역', line: '2호선, 8호선' },
];

export const sampleRoutes: Route[] = [
  {
    id: 'r1',
    segments: [
      {
        from: stations[0],
        to: stations[3],
        line: '2호선',
        duration: 12,
        congestion: 'high',
        distance: 4.2,
      },
    ],
    transfers: [],
    totalTime: 12,
    totalDistance: 4.2,
    fare: 1400,
    comfortScore: 65,
    comfortFactors: {
      congestionScore: 40,
      transferScore: 100,
      walkingScore: 100,
      seatProbability: 25,
    },
  },
  {
    id: 'r2',
    segments: [
      {
        from: stations[0],
        to: stations[11],
        line: '2호선',
        duration: 8,
        congestion: 'medium',
        distance: 2.8,
      },
      {
        from: stations[11],
        to: stations[3],
        line: '3호선',
        duration: 10,
        congestion: 'low',
        distance: 3.5,
      },
    ],
    transfers: [
      {
        station: stations[11],
        transferTime: 5,
        walkingDistance: 150,
        hasEscalator: true,
        congestion: 'medium',
      },
    ],
    totalTime: 23,
    totalDistance: 6.3,
    fare: 1400,
    comfortScore: 82,
    comfortFactors: {
      congestionScore: 75,
      transferScore: 85,
      walkingScore: 90,
      seatProbability: 65,
    },
  },
  {
    id: 'r3',
    segments: [
      {
        from: stations[0],
        to: stations[1],
        line: '2호선',
        duration: 3,
        congestion: 'high',
        distance: 1.5,
      },
      {
        from: stations[1],
        to: stations[3],
        line: '2호선',
        duration: 6,
        congestion: 'medium',
        distance: 2.7,
      },
    ],
    transfers: [],
    totalTime: 9,
    totalDistance: 4.2,
    fare: 1400,
    comfortScore: 58,
    comfortFactors: {
      congestionScore: 55,
      transferScore: 100,
      walkingScore: 100,
      seatProbability: 20,
    },
  },
];

export const favoriteRoutes: FavoriteRoute[] = [
  {
    id: 'f1',
    name: '집으로',
    from: stations[0],
    to: stations[13],
    currentCongestion: 'medium',
  },
  {
    id: 'f2',
    name: '회사로',
    from: stations[4],
    to: stations[0],
    currentCongestion: 'high',
  },
];

export const carRecommendations: CarRecommendation[] = [
  {
    carNumber: '4-1',
    position: '승강장 앞쪽',
    congestionLevel: 'low',
    reason: '환승 동선에서 멀어 여유로움',
  },
  {
    carNumber: '7-3',
    position: '승강장 중간',
    congestionLevel: 'low',
    reason: '출구와 적당한 거리로 공간 여유',
  },
  {
    carNumber: '5-2',
    position: '승강장 중간',
    congestionLevel: 'medium',
    reason: '주요 출구 근처',
  },
];
