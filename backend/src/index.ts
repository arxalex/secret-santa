import {Hono} from 'hono'
import {cors} from 'hono/cors'
import {D1Database} from '@cloudflare/workers-types'
import {Session} from "./session.model";
import {Member} from "./member.model";
import {Link} from "./link.model";
import {RandomRequest} from "./random-request.model";

type Bindings = {
    DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

const tables = {
    sessions: 'ss_sessions',
    members: 'ss_members',
    links: 'ss_link',
    random: 'ss_random'
}

app.use('/*', cors({
    origin: ['https://apps.arxalex.com'],
    allowMethods: ['GET', 'POST']
}))

app.get('/session', async (c) => {
    const idPass = c.req.query('idpass');
    if (!idPass || idPass.length <= 6) {
        return c.json({error: 'Query not specified'}, 404)
    }
    const id = idPass.slice(0, -6);
    const pass = idPass.slice(-6);

    const query = `select *
                   from ${tables.sessions}
                   where id = ?
                     and pass = ?`;
    const result = await c.env.DB.prepare(query).bind(id, pass).run();
    return c.json(result.results[0])
})
app.get('/member', async (c) => {
    const idPass = c.req.query('idpass');
    if (!idPass || idPass.length <= 6) {
        return c.json({error: 'Query not specified'}, 404)
    }
    const id = idPass.slice(0, -6);
    const pass = idPass.slice(-6);

    const query = `select *
                   from ${tables.members}
                   where id = ?
                     and pass = ?`;
    const result = await c.env.DB.prepare(query).bind(id, pass).run();
    return c.json(result.results[0])
})
app.get('/links', async (c) => {
    const idPass = c.req.query('idpass');
    if (!idPass || idPass.length <= 6) {
        return c.json({error: 'Query not specified'}, 404)
    }
    const id = idPass.slice(0, -6);
    const pass = idPass.slice(-6);

    const query = `select *
                   from ${tables.links}
                   where id = ?
                     and pass = ?`;
    const result = await c.env.DB.prepare(query).bind(id, pass).run();
    return c.json(result.results)
})
app.get('/random', async (c) => {
    const idPass = c.req.query('idpass');
    const sessionId = c.req.query('sessionId');
    if (!idPass || idPass.length <= 6 || !sessionId) {
        return c.json({error: 'Query not specified'}, 404)
    }
    const id = idPass.slice(0, -6);
    const pass = idPass.slice(-6);

    const query = `select *
                   from ${tables.random}
                   where id = ?
                     and pass = ?
                     and sessionid = ?`;
    const result = await c.env.DB.prepare(query).bind(id, pass, sessionId).run();
    return c.json(result.results[0])
})
app.post('/session', async (c) => {
    const data = await c.req.json<Session>();
    if (!data || !data.pass || data.pass.length !== 6) {
        return c.json({error: 'Query not specified'}, 404)
    }

    const query = `insert into ${tables.sessions} (pass, data) values (?, ?) RETURNING id`;
    const result = await c.env.DB.prepare(query).bind(data.pass, data.data).run();
    return c.json({
        id: result.results[0].id,
        pass: data.pass,
        response: result.success
    })
})
app.post('/member', async (c) => {
    const data = await c.req.json<Member>();
    if (!data || !data.pass || data.pass.length !== 6) {
        return c.json({error: 'Query not specified'}, 404)
    }

    const query = `insert into ${tables.members} (pass, email, phone, first_name, last_name, address, wants) values (?, ?, ?, ?, ?, ?, ?) RETURNING id`;
    const result = await c.env.DB.prepare(query).bind(data.pass, data.email ?? null, data.phone ?? null, data.first_name ?? null, data.last_name ?? null, data.address ?? null, data.wants ?? null).run();
    return c.json({
        id: result.results[0].id,
        pass: data.pass,
        response: result.success
    })
})
app.post('/link', async (c) => {
    const data = await c.req.json<Link>();
    if (!data || !data.pass || data.pass.length !== 6) {
        return c.json({error: 'Query not specified'}, 404)
    }

    const query = `insert into ${tables.links} (id, pass, memberid, name) values (?, ?, ?, ?) RETURNING linkid`;
    const result = await c.env.DB.prepare(query).bind(data.id, data.pass, data.memberid, data.name ?? null).run();
    return c.json({
        id: result.results[0].linkid,
        pass: data.pass,
        response: result.success
    })
})
app.post('/random', async (c) => {
    const data = await c.req.json<RandomRequest>();
    if (!data.sessionid && !data.randids) {
        return c.json({error: 'Query not specified'}, 404)
    }
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

    const ids = data.randids.map(id => '?').join(',')
    const query = `select * from ${tables.members} where id in (${ids})`
    const membersResult = await c.env.DB.prepare(query).bind(...data.randids).run();
    if (!membersResult.success) {
        return c.json({error: 'Query not specified'}, 404)
    }
    const membersData = membersResult.results;
    if (!pairs || !pairs.length) {
        return c.json({error: 'Query not specified'}, 404)
    }
    let query2 = `insert into ${tables.random} (id, pass, sessionid, memberid, data) values  `;
    let params = [];
    for (const [giver, receiver] of pairs) {
        const memberData = membersData.find(d => d.id === receiver);
        const giverMember = membersData.find(d => d.id === giver);
        if (!memberData || !giverMember || !giverMember.pass) continue;
        const cleanMemberData = { ...memberData };
        delete cleanMemberData.pass;
        params.push(giver, giverMember.pass, data.sessionid, receiver, JSON.stringify(cleanMemberData)).toString()
        query2 += `(?, ?, ?, ?, ?), `
    }
    query2 = query2.slice(0, -2);

    const result = await c.env.DB.prepare(query2).bind(...params).run();

    return c.json({success: result.success})
})
app.post('/session/update', async (c) => {
    const data = await c.req.json<Session>();
    if (!data || !data.id || data.id <= 0 || !data.pass || data.pass.length !== 6) {
        return c.json({error: 'Query not specified'}, 404)
    }

    const query = `update ${tables.sessions} set data = ? where id = ? and pass = ?`;
    const result = await c.env.DB.prepare(query).bind(data.data, data.id, data.pass).run();
    return c.json({
        response: result.success
    })
})
app.post('/member/update', async (c) => {
    const data = await c.req.json<Member>();
    if (!data || !data.id || data.id <= 0 || !data.pass || data.pass.length !== 6) {
        return c.json({error: 'Query not specified'}, 404)
    }

    const query = `update ${tables.members} set email = ?, phone = ?, first_name = ?, last_name = ?, address = ?, wants = ? where id = ? and pass = ?`;
    const result = await c.env.DB.prepare(query).bind(data.email ?? null, data.phone ?? null, data.first_name ?? null, data.last_name ?? null, data.address ?? null, data.wants ?? null, data.id, data.pass).run();
    return c.json({
        response: result.success
    })
})
app.post('/link/delete', async (c) => {
    const data = await c.req.json<Link>();
    if (!data || !data.pass || data.pass.length !== 6) {
        return c.json({error: 'Query not specified'}, 404)
    }

    const query = `delete from ${tables.links} where id = ? and pass = ? and linkid = ?`;
    const result = await c.env.DB.prepare(query).bind(data.id, data.pass, data.linkid).run();
    return c.json({
        id: result.meta.lastRowId,
        pass: data.pass,
        response: result.success
    })
})

export default app