import {
  getProviders,
  signIn,
  type ClientSafeProvider,
  type LiteralUnion
} from 'next-auth/react';
import type { BuiltInProviderType } from 'next-auth/providers/index';

type Props = {
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>;
};

function Login({ providers }: Props) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="rounded-full bg-[#18D860] p-5 text-white"
            onClick={() => void signIn(provider.id, { callbackUrl: '/' })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers
    }
  };
}
