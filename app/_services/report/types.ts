export type Report = {
  memberName: string;
  gender: Gender;
  planName: string;
  paidDate: Date;
  amount: number;
};
export interface Gender {
  code: string;
  name: string;
}
