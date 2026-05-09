import {
  HomeIcon,
  AcademicCapIcon,
  BookOpenIcon,
  CalendarIcon,
  IdentificationIcon,
  RssIcon,
  EnvelopeIcon,
  MegaphoneIcon,
  AdjustmentsHorizontalIcon,
  UserMinusIcon,
  ClipboardDocumentListIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';

function Sidebar() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="h-screen overflow-y-scroll border-r border-gray-200 p-5 text-sm text-gray-500 scrollbar-hide">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <p>PRODUNI</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <EnvelopeIcon className="h-5 w-5" />
          <p>Messages</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <MegaphoneIcon className="h-5 w-5" />
          <p>Notifications</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <AdjustmentsHorizontalIcon className="h-5 w-5" />
          <p>Settings</p>
        </button>
        <button
          className="flex items-center space-x-2 hover:text-white"
          onClick={() => void signOut()}
        >
          <UserMinusIcon className="h-5 w-5" />
          <p>Logout</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <Squares2X2Icon className="h-5 w-5" />
          <p>Dashboard</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <AcademicCapIcon className="h-5 w-5" />
          <p>Academic</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <BookOpenIcon className="h-5 w-5" />
          <p>Subject</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <IdentificationIcon className="h-5 w-5" />
          <p>Class Routine</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <CalendarIcon className="h-5 w-5" />
          <p>Academic Calendar</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <ClipboardDocumentListIcon className="h-5 w-5" />
          <p>Exam</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Lunch</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
      </div>
    </div>
  );
}

export default Sidebar;
