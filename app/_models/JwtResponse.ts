export interface JwtResponse {
  token: string;
  id: number;
  email: string;
  roles: string[];
}