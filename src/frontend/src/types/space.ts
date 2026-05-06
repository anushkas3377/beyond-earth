export interface Planet {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  keyFeature: string;
  didYouKnow: string;
  distanceFromSun: string;
  diameter: string;
  moons: number;
  orbitalPeriod: string;
  temperature: string;
  pressure: string;
  survivable: boolean;
  tintColor: string;
  mass: number; // kg × 10^24
  radius: number; // km
  gravity: number; // m/s²
}

export interface Astronaut {
  id: string;
  slug: string;
  name: string;
  nationality: string;
  agency: string;
  role: string;
  achievement: string;
  bio: string;
  missions: string[];
  image: string;
  birthYear: number;
  totalSpaceTime: string;
}

export interface Mission {
  id: string;
  name: string;
  agency: string;
  year: number;
  status: "completed" | "ongoing" | "upcoming";
  destination: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface SpaceAgency {
  id: string;
  name: string;
  shortName: string;
  country: string;
  founded: number;
  description: string;
  website: string;
  logoColor: string;
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  agency: string;
  category: "launch" | "landing" | "discovery" | "milestone";
}
