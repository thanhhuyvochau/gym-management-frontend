export type UpdateUserPayload = {
  fullName: string;
  phone: string;
  gender: string;
  address: string;
  image?: File;
};

export type UpdatePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};
