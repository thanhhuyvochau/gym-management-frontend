import { TUser } from '../_services/auth/types';

export interface JwtResponse {
  token: string;
  id: number;
  email: string;
  roles: string[];
  data: TUser;
}
