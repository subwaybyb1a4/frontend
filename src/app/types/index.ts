export interface Station {
  id: string;
  name: string;
  line: string;
}

export interface RouteSegment {
  from: Station;
  to: Station;
  line: string;
  duration: number; // minutes
  congestion: 'low' | 'medium' | 'high';
  distance: number; // km
}

export interface Transfer {
  station: Station;
  transferTime: number; // minutes
  walkingDistance: number; // meters
  hasEscalator: boolean;
  congestion: 'low' | 'medium' | 'high';
}

export interface Route {
  id: string;
  segments: RouteSegment[];
  transfers: Transfer[];
  totalTime: number;
  totalDistance: number;
  fare: number;
  comfortScore: number;
  comfortFactors: {
    congestionScore: number;
    transferScore: number;
    walkingScore: number;
    seatProbability: number;
  };
}

export interface CarRecommendation {
  carNumber: string;
  position: string;
  congestionLevel: 'low' | 'medium' | 'high';
  reason: string;
}

export interface UserPreferences {
  congestionWeight: number; // 0-100
  transferWeight: number; // 0-100
  walkingWeight: number; // 0-100
}

export interface FavoriteRoute {
  id: string;
  name: string;
  from: Station;
  to: Station;
  currentCongestion: 'low' | 'medium' | 'high';
}
