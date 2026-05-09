import { signOut, useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
    <div className="grow">
      <header className="absolute right-8 top-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex cursor-pointer items-center space-x-3 rounded-full bg-muted p-1 pr-2 opacity-90 hover:opacity-80">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={session?.user?.image ?? ''}
                  alt={session?.user?.name ?? 'User'}
                />
                <AvatarFallback>
                  {session?.user?.name?.[0] ?? 'U'}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-sm font-medium">{session?.user?.name}</h2>
              <ChevronDownIcon className="h-5 w-5" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{session?.user?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => void signOut()}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <section
        className={`flex items-end space-x-7 bg-linear-to-b to-white ${color} p-8 h-80`}
      >
        <h1 className="text-2xl font-bold">Hello, {session?.user?.name}</h1>
      </section>
    </div>
  );
}

export default Center;
