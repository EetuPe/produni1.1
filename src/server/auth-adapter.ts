import { and, eq } from 'drizzle-orm';
import type { Adapter } from 'next-auth/adapters';
import { db } from '~/server/db';
import {
  accounts,
  sessions,
  users,
  verificationTokens
} from '~/server/db/schema';

export function SingleStoreAdapter(): Adapter {
  return {
    async createUser(data) {
      const id = crypto.randomUUID();
      await db.insert(users).values({ ...data, id });
      const user = await db.select().from(users).where(eq(users.id, id));
      return user[0]!;
    },
    async getUser(id) {
      const user = await db.select().from(users).where(eq(users.id, id));
      return user[0] ?? null;
    },
    async getUserByEmail(email) {
      const user = await db.select().from(users).where(eq(users.email, email));
      return user[0] ?? null;
    },
    async getUserByAccount({ provider, providerAccountId }) {
      const result = await db
        .select({ user: users })
        .from(accounts)
        .innerJoin(users, eq(accounts.userId, users.id))
        .where(
          and(
            eq(accounts.provider, provider),
            eq(accounts.providerAccountId, providerAccountId)
          )
        );
      return result[0]?.user ?? null;
    },
    async updateUser(data) {
      const { id, ...rest } = data;
      await db.update(users).set(rest).where(eq(users.id, id));
      const user = await db.select().from(users).where(eq(users.id, id));
      return user[0]!;
    },
    async deleteUser(id) {
      await db.delete(users).where(eq(users.id, id));
    },
    async linkAccount(data) {
      const id = crypto.randomUUID();
      await db.insert(accounts).values({ ...data, id });
    },
    async unlinkAccount({ provider, providerAccountId }) {
      await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.provider, provider),
            eq(accounts.providerAccountId, providerAccountId)
          )
        );
    },
    async createSession(data) {
      await db.insert(sessions).values(data);
      const session = await db
        .select()
        .from(sessions)
        .where(eq(sessions.sessionToken, data.sessionToken));
      return session[0]!;
    },
    async getSessionAndUser(sessionToken) {
      const result = await db
        .select({ session: sessions, user: users })
        .from(sessions)
        .innerJoin(users, eq(sessions.userId, users.id))
        .where(eq(sessions.sessionToken, sessionToken));
      return result[0] ?? null;
    },
    async updateSession(data) {
      await db
        .update(sessions)
        .set(data)
        .where(eq(sessions.sessionToken, data.sessionToken));
      const session = await db
        .select()
        .from(sessions)
        .where(eq(sessions.sessionToken, data.sessionToken));
      return session[0] ?? null;
    },
    async deleteSession(sessionToken) {
      await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken));
    },
    async createVerificationToken(data) {
      await db.insert(verificationTokens).values(data);
      const token = await db
        .select()
        .from(verificationTokens)
        .where(eq(verificationTokens.token, data.token));
      return token[0] ?? null;
    },
    async useVerificationToken({ identifier, token }) {
      const result = await db
        .select()
        .from(verificationTokens)
        .where(
          and(
            eq(verificationTokens.identifier, identifier),
            eq(verificationTokens.token, token)
          )
        );
      if (!result[0]) return null;
      await db
        .delete(verificationTokens)
        .where(
          and(
            eq(verificationTokens.identifier, identifier),
            eq(verificationTokens.token, token)
          )
        );
      return result[0];
    }
  };
}
