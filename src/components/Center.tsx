import { useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import Image from 'next/image';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500'
];

function Center() {
  const { data: session } = useSession();
  const [color, setColor] = useState('');

  useEffect(() => {
    setColor(shuffle(colors).pop() ?? '');
  }, []);

  return (
    <div className="flex-grow">
      <header className="absolute right-8 top-5">
        <div className="flex cursor-pointer items-center space-x-3 rounded-full bg-blue-300 p-1 pr-2 opacity-90 hover:opacity-80">
          <Image
            className="h-10 w-10 rounded-full"
            src={session?.user?.image ?? '/default-avatar.png'}
            alt={session?.user?.name ?? 'User avatar'}
            width={40}
            height={40}
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-white ${color} padding-8 h-80`}
      >
        <h1>Hello</h1>
      </section>
    </div>
  );
}

export default Center;
