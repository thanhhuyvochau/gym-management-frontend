import { ApiResponse } from "./api-response";

export interface UserProfileResponse {
    id: number;
    fullName: string;
    email: string;
    birthday: string;
    address: string;
    phone: string;
    status: boolean;
    gender: "MALE" | "FEMALE" | "OTHER";
    roleDto: {
        id: number;
        name: string;
        code: string;
    };
}