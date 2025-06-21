export interface Request {
    table: string
    query: Record<string, any>
    randids?: number[]
}