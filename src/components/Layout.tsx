import Sidebar from './Sidebar';
import Center from './Center';
import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      <main className="flex h-full">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-y-auto">
          <Center />
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;
