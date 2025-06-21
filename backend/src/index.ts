import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { D1Database } from '@cloudflare/workers-types'
import { Request } from './request.model'
import { getMemberData, hasDuplicate, mysqlEscape } from "./helper";

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/*', cors({
  origin: ['https://apps.arxalex.com', 'https://apps2.arxalex.com'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.post('/create', async (c) => {
  const data = await c.req.json<Request>()

  if (!data.table) {
    return c.json({ error: 'Table not specified' }, 404)
  }

  const ignore: Record<string, string[]> = {
    'ss_link': ['pass', 'linkid', 'name'],
    'ss_members': ['id'],
    'ss_sessions': [],
    'ss_random': ['randomid', 'data', 'pass']
  }

  if (data.table === 'ss_random' && data.randids) {
    const members = data.randids
    let pairs: number[][] = []

    do {
      const available = [...members]
      pairs = members.map(id => {
        const possibleMatches = available.filter(x => x !== id)
        const idx = Math.floor(Math.random() * possibleMatches.length)
        const match = possibleMatches[idx]
        available.splice(available.indexOf(match), 1)
        return [id, match]
      })
    } while (pairs.some(([a, b]) => a === b))


    for (const [giver, receiver] of pairs) {
      const memberData = await getMemberData(receiver, c.env.DB)
      if (!memberData) continue

      await c.env.DB.prepare(`
        INSERT INTO ss_random (id, sessionid, memberid, data) 
        VALUES (?, ?, ?, ?)
      `).bind(
        giver,
        data.query.sessionid,
        receiver,
        JSON.stringify(memberData)
      ).run()
    }

    return c.json({ success: true })
  }

  const isDuplicate = await hasDuplicate(data, ignore[data.table] || [], c.env.DB)
  if (isDuplicate) {
    return c.json({ response: false })
  }

  const fields = Object.keys(data.query).map(k => mysqlEscape(k)).join(', ')
  const placeholders = Object.keys(data.query).map(() => '?').join(', ')
  const values = Object.values(data.query)

  const result = await c.env.DB.prepare(`
    INSERT INTO ${mysqlEscape(data.table)} (${fields}) 
    VALUES (${placeholders})
  `).bind(...values).run()

  return c.json({
    id: result.meta.lastRowId,
    pass: data.query.pass,
    response: true
  })
})


app.post('/update', async (c) => {
  const data = await c.req.json<Request>()

  if (!data.table) {
    return c.json({ error: 'Table not specified' }, 404)
  }

  if (!data.query) {
    return c.json({ error: 'Query not specified' }, 404)
  }

  const updates = Object.entries(data.query)
      .filter(([key]) => key !== 'id' && key !== 'pass')
      .map(([key]) => `${mysqlEscape(key)} = ?`)
      .join(', ')

  const values = [
    ...Object.entries(data.query)
        .filter(([key]) => key !== 'id' && key !== 'pass')
        .map(([_, value]) => value),
    data.query.id,
    data.query.pass
  ]

  const query = `
    UPDATE ${mysqlEscape(data.table)}
    SET ${updates}
    WHERE id = ? AND pass = ?
  `

  const result = await c.env.DB.prepare(query).bind(...values).run()

  return c.json({
    response: result.success
  })
})

app.post('/get', async (c) => {
  const data = await c.req.json<Request>()

  if (!data.table) {
    return c.json({ error: 'Table not specified' }, 404)
  }

  if (!data.query) {
    return c.json({ error: 'Query not specified' }, 404)
  }

  const baseConditions = [`id = ?`, `pass = ?`]
  const additionalConditions = Object.entries(data.query)
    .filter(([key]) => key !== 'id' && key !== 'pass')
    .map(([key]) => `${mysqlEscape(key)} = ?`)

  const conditions = [...baseConditions, ...additionalConditions].join(' AND ')

  const values = [
    data.query.id,
    data.query.pass,
    ...Object.entries(data.query)
      .filter(([key]) => key !== 'id' && key !== 'pass')
      .map(([_, value]) => value)
  ]

  const query = `
    SELECT * FROM ${mysqlEscape(data.table)}
    WHERE ${conditions}
    ORDER BY id DESC
  `

  const result = await c.env.DB.prepare(query).bind(...values).all()
  return c.json(result.results)
})

app.post('/delete', async (c) => {
  const data = await c.req.json<Request>()

  if (!data.table) {
    return c.json({ error: 'Table not specified' }, 404)
  }

  if (!data.query) {
    return c.json({ error: 'Query not specified' }, 404)
  }

  const baseConditions = [`id = ?`, `pass = ?`]
  const additionalConditions = Object.entries(data.query)
    .filter(([key]) => key !== 'id' && key !== 'pass')
    .map(([key]) => `${mysqlEscape(key)} = ?`)

  const conditions = [...baseConditions, ...additionalConditions].join(' AND ')

  const values = [
    data.query.id,
    data.query.pass,
    ...Object.entries(data.query)
      .filter(([key]) => key !== 'id' && key !== 'pass')
      .map(([_, value]) => value)
  ]

  const query = `
    DELETE FROM ${mysqlEscape(data.table)}
    WHERE ${conditions}
  `

  const result = await c.env.DB.prepare(query).bind(...values).run()

  return c.json({
    response: result.success
  })
})

export default app