export type Plan = {
  id: number;
  name: string;
  description: string;
  timeAmount: number;
  timeUnit: string;
  price: number;
  activate: boolean;
  gymOwnerId: number;
  created: string;
  numberOfRegister: number;
};

export interface CreateGymPlanPayload {
  name: string;
  description: string;
  timeAmount: number;
  timeUnit: string;
  price: number;
  activate: boolean;
}
