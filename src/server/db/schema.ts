import { relations } from 'drizzle-orm';
import {
  index,
  int,
  primaryKey,
  singlestoreTableCreator,
  text,
  timestamp,
  varchar
} from 'drizzle-orm/singlestore-core';

export const createTable = singlestoreTableCreator((name) => `produni_${name}`);

export const users = createTable('user', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  emailVerified: timestamp('emailVerified'),
  image: varchar('image', { length: 255 })
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions)
}));

export const accounts = createTable(
  'account',
  {
    id: varchar('id', { length: 255 }).notNull().primaryKey(),
    userId: varchar('userId', { length: 255 }).notNull(),
    type: varchar('type', { length: 255 }).notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: int('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: text('id_token'),
    session_state: varchar('session_state', { length: 255 })
  },
  (account) => ({
    userIdIdx: index('account_userId_idx').on(account.userId)
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] })
}));

export const sessions = createTable(
  'session',
  {
    sessionToken: varchar('sessionToken', { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar('userId', { length: 255 }).notNull(),
    expires: timestamp('expires').notNull()
  },
  (session) => ({
    userIdIdx: index('session_userId_idx').on(session.userId)
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] })
}));

export const verificationTokens = createTable(
  'verificationToken',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires').notNull()
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] })
  })
);
