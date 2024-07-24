export type Gender = "Male" | "Female" | "unknown";
export type Status = "Alive" | "Dead" | "unknown";
export type Species =
  | "Human"
  | "Alien"
  | "Mythological Creature"
  | "Humanoid"
  | "Cronenberg"
  | "Animal";

export type Page = string | null;
export interface Info {
  count: number;
  pages: number;
  next: Page;
  prev: Page;
}

export interface Location {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: Status;
  species: Species;
  type?: string;
  gender: Gender;
  origin?: Location;
  location?: Location;
  image: string;
  episode?: string[];
  url?: string;
  created?: string;
}
// id, name, image, gender, species, status
export interface Props {
  results: Character[];
}

export interface SuccessResponse {
  info: Info;
  results: Character[];
}

export interface ErrorResponse {
  error: string;
}

export type Response = SuccessResponse | ErrorResponse;

export function isNotNullable<T>(value: T): value is NonNullable<T> {
  return value != null;
}
