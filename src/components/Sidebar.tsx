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
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

function Sidebar() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="h-screen overflow-y-scroll border-r border-gray-200 p-5 text-sm text-gray-500 scrollbar-hide">
      <div className="flex flex-col space-y-1">
        <Button variant="ghost" className="w-full justify-start">
          <p>PRODUNI</p>
        </Button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <Button variant="ghost" className="w-full justify-start">
          <EnvelopeIcon className="h-5 w-5" />
          <p>Messages</p>
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <MegaphoneIcon className="h-5 w-5" />
          <p>Notifications</p>
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <AdjustmentsHorizontalIcon className="h-5 w-5" />
          <p>Settings</p>
        </Button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <Button variant="ghost" className="w-full justify-start">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Squares2X2Icon className="h-5 w-5" />
          <p>Dashboard</p>
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <AcademicCapIcon className="h-5 w-5" />
          <p>Academic</p>
        </Button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <Button variant="ghost" className="w-full justify-start">
          <BookOpenIcon className="h-5 w-5" />
          <p>Subject</p>
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <IdentificationIcon className="h-5 w-5" />
          <p>Class Routine</p>
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <CalendarIcon className="h-5 w-5" />
          <p>Academic Calendar</p>
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <ClipboardDocumentListIcon className="h-5 w-5" />
          <p>Exam</p>
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <RssIcon className="h-5 w-5" />
          <p>Lunch</p>
        </Button>
        <hr className="border-t-[0.1px] border-gray-900" />
      </div>
    </div>
  );
}

export default Sidebar;
