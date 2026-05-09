import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { api } from '~/utils/api';
import '~/styles/globals.css';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  const router = useRouter();
  const noLayout = ['/login'];
  const hasLayout = !noLayout.includes(router.pathname);

  return (
    <SessionProvider session={session}>
      {hasLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
