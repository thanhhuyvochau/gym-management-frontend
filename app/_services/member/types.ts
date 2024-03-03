export type CreateMemberPayload = {
  age: number;
  fullName: string;
  gender: string;
  phoneNumber: string;
  birthday: Date;
  image: string;
};

export interface GetMembersResponse {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  first: boolean;
  last: boolean;
  pageItemSize: number;
  pageSize: number;
  items: Member[];
}

export interface Member {
  id: number;
  age: number;
  fullName: string;
  gender: string;
  phoneNumber: string;
  birthday: Date;
}

export type GetMembersQuery = {
  page: number;
  size: number;
  sort: string[];
  q: string;
};