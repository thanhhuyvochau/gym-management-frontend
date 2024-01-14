export interface AccountResponse {
  id: number;
  fullName: string;
  email: string;
  address: string;
  phone: string;
  status: boolean;
  avatar?: string;
  gender: "MALE" | "FEMALE";
}
