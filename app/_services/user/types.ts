export type UpdateUserPayload = {
  fullName: string;
  phone: string;
  gender: string;
  address: string;
};

export type UpdatePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};
