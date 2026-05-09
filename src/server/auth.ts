import { type GetServerSidePropsContext } from 'next';
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession
} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import TodoistProvider from 'next-auth/providers/todoist';
import { SingleStoreAdapter } from '~/server/auth-adapter';
import { env } from '~/env.mjs';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    }
  },
  adapter: SingleStoreAdapter(),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    }),
    TodoistProvider({
      clientId: env.TODOIST_CLIENT_ID,
      clientSecret: env.TODOIST_CLIENT_SECRET
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET
    })
  ],
  secret: env.NEXTAUTH_SECRET
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
