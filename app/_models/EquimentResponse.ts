export interface EquimentResponse {
    id: number,
    code: string,
    name: string,
    expectUseFrom: string,
    expectUserTo: string,
    costPer: number,
    status: "DAMAGED" | "UNUSED" | "USING"
    quantity: number
}