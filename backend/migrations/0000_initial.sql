-- Migration number: 0000
-- Initial schema for Secret Santa tables

DROP TABLE IF EXISTS ss_members;
CREATE TABLE ss_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pass TEXT,
    email TEXT,
    phone TEXT,
    first_name TEXT,
    last_name TEXT,
    wants TEXT,
    address TEXT
);

DROP TABLE IF EXISTS ss_sessions;
CREATE TABLE ss_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pass TEXT NOT NULL,
    data TEXT
);

DROP TABLE IF EXISTS ss_link;
CREATE TABLE ss_link (
    id INTEGER NOT NULL,
    pass TEXT NOT NULL,
    memberid INTEGER NOT NULL,
    linkid INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    FOREIGN KEY (id) REFERENCES ss_sessions(id),
    FOREIGN KEY (memberid) REFERENCES ss_members(id)
);

DROP TABLE IF EXISTS ss_random;
CREATE TABLE ss_random (
    id INTEGER NOT NULL,
    pass TEXT NOT NULL,
    sessionid INTEGER NOT NULL,
    memberid INTEGER NOT NULL,
    data TEXT NOT NULL,
    randomid INTEGER PRIMARY KEY AUTOINCREMENT,
    FOREIGN KEY (id) REFERENCES ss_members(id),
    FOREIGN KEY (memberid) REFERENCES ss_members(id),
    FOREIGN KEY (sessionid) REFERENCES ss_sessions(id)
);

CREATE INDEX idx_link_id ON ss_link(id);
CREATE INDEX idx_link_memberid ON ss_link(memberid);
CREATE INDEX idx_link_pass ON ss_link(pass);
CREATE INDEX idx_random_id ON ss_random(id);
CREATE INDEX idx_random_memberid ON ss_random(memberid);
CREATE INDEX idx_random_sessionid ON ss_random(sessionid);