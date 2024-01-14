export interface MemberResponse {
    id: number;
    fullName: string;
    gender: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    streetAddress: string;
    city: string;
    stateProvince: string;
    membershipType: string;
    membershipStartDate: string;
    membershipEndDate?: string;
    membershipStatus: boolean;
}