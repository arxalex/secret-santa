import { D1Database } from "@cloudflare/workers-types";
import { Request } from "./request.model";
import { MemberData } from "./member-data.model";

export const mysqlEscape = (inp: string): string => {
    if (!inp) return inp
    return inp.replace(/[\0\n\r\b'"\x1a\\]/g, s => {
        switch (s) {
            case '\0': return '\\0'
            case '\n': return '\\n'
            case '\r': return '\\r'
            case '\b': return '\\b'
            case "'": return "\\'"
            case '"': return '\\"'
            case '\x1a': return '\\Z'
            default: return '\\' + s
        }
    })
}

export async function hasDuplicate(data: Request, ignore: string[], db: D1Database): Promise<boolean> {
    const conditions = Object.entries(data.query)
        .filter(([key]) => !ignore.includes(key))
        .map(([key, _]) => `${mysqlEscape(key)} = ?`)
        .join(' AND ')

    const query = `SELECT * FROM ${mysqlEscape(data.table)} WHERE ${conditions}`
    const values = Object.entries(data.query)
        .filter(([key]) => !ignore.includes(key))
        .map(([_, value]) => value)

    const result = await db.prepare(query).bind(...values).all()
    return result.results.length > 0
}

export async function getMemberData(id: number, db: D1Database): Promise<MemberData | null> {
    const query = `SELECT * FROM ss_members WHERE id = ? LIMIT 1`
    const result = await db.prepare(query).bind(id).first()

    if (!result) return null

    // Type guard to verify the shape of the result
    const isMemberData = (data: unknown): data is MemberData => {
        const d = data as Record<string, unknown>
        return typeof d?.id === 'number' &&
            (d?.pass === undefined || typeof d.pass === 'string') &&
            typeof d?.email === 'string' &&
            typeof d?.phone === 'string' &&
            typeof d?.first_name === 'string' &&
            typeof d?.last_name === 'string' &&
            typeof d?.wants === 'string' &&
            typeof d?.address === 'string'
    }

    return isMemberData(result) ? result : null
}