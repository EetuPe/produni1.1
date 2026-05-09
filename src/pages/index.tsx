import Sidebar from '../components/Sidebar';
import Center from '../components/Center';

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
    </div>
  );
}
