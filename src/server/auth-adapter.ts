import { and, eq } from 'drizzle-orm';
import type {
  Adapter,
  AdapterUser,
  AdapterAccount,
  AdapterSession,
  VerificationToken
} from 'next-auth/adapters';
import { db } from '~/server/db';
import {
  accounts,
  sessions,
  users,
  verificationTokens
} from '~/server/db/schema';

export function SingleStoreAdapter(): Adapter {
  return {
    async createUser(data: Omit<AdapterUser, 'id'>) {
      const id = crypto.randomUUID();
      await db.insert(users).values({ ...data, id });
      const user = await db.select().from(users).where(eq(users.id, id));
      return user[0]!;
    },
    async getUser(id: string) {
      const user = await db.select().from(users).where(eq(users.id, id));
      return user[0] ?? null;
    },
    async getUserByEmail(email: string) {
      const user = await db.select().from(users).where(eq(users.email, email));
      return user[0] ?? null;
    },
    async getUserByAccount({
      provider,
      providerAccountId
    }: {
      provider: string;
      providerAccountId: string;
    }) {
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
    async updateUser(data: Partial<AdapterUser> & { id: string }) {
      const { id, ...rest } = data;
      await db.update(users).set(rest).where(eq(users.id, id));
      const user = await db.select().from(users).where(eq(users.id, id));
      return user[0]!;
    },
    async deleteUser(id: string) {
      await db.delete(users).where(eq(users.id, id));
    },
    async linkAccount(data: AdapterAccount) {
      const id = crypto.randomUUID();
      await db.insert(accounts).values({ ...data, id });
    },
    async unlinkAccount({
      provider,
      providerAccountId
    }: {
      provider: string;
      providerAccountId: string;
    }) {
      await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.provider, provider),
            eq(accounts.providerAccountId, providerAccountId)
          )
        );
    },
    async createSession(data: AdapterSession) {
      await db.insert(sessions).values(data);
      const session = await db
        .select()
        .from(sessions)
        .where(eq(sessions.sessionToken, data.sessionToken));
      return session[0]!;
    },
    async getSessionAndUser(sessionToken: string) {
      const result = await db
        .select({ session: sessions, user: users })
        .from(sessions)
        .innerJoin(users, eq(sessions.userId, users.id))
        .where(eq(sessions.sessionToken, sessionToken));
      return result[0] ?? null;
    },
    async updateSession(
      data: Partial<AdapterSession> & { sessionToken: string }
    ) {
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
    async deleteSession(sessionToken: string) {
      await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken));
    },
    async createVerificationToken(data: VerificationToken) {
      await db.insert(verificationTokens).values(data);
      const token = await db
        .select()
        .from(verificationTokens)
        .where(eq(verificationTokens.token, data.token));
      return token[0] ?? null;
    },
    async useVerificationToken({
      identifier,
      token
    }: {
      identifier: string;
      token: string;
    }) {
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
