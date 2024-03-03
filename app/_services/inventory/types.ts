export interface Inventory {
  created: Date;
  lastModified: Date;
  createdBy: string;
  lastModifiedBy: string;
  code: string;
  name: string;
  expectedDateFrom: Date;
  expectedDateTo: Date;
  costPer: number;
  quantity: number;
  id: number;
}

export interface InventoryResponse {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  first: boolean;
  last: boolean;
  pageItemSize: number;
  pageSize: number;
  items: Inventory[];
}

export type CreateInventoryPayload = {
  code: string;
  name: string;
  expectedDateFrom: Date;
  expectedDateTo: Date;
  costPer: number;
  quantity: number;
};
