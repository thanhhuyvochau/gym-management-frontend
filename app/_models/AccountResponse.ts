export interface AccountResponse {
    id: number;
    fullName: string;
    email: string;
    address: string;
    phone: string;
    status: boolean;
    gender: "MALE" | "FEMALE" | "OTHER";
  }
  