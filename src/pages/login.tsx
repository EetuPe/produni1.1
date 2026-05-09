import { type NextPage } from 'next';
import Head from 'next/head';
import { signIn, useSession } from 'next-auth/react';

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Produni - Login</title>
        <meta name="description" content="Sign in to Produni" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#91C788]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Prod<span className="text-[#DDFFBC]">U</span>ni
          </h1>
          <div className="flex flex-col items-center gap-2">
            <SignInButton />
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;

const SignInButton: React.FC = () => {
  return (
    <button
      className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      onClick={() => void signIn()}
    >
      Sign in
    </button>
  );
};
