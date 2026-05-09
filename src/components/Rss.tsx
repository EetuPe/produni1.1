import { FEEDS } from '~/lib/rss';
import Link from 'next/link';

function Rss() {
  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <h1 className="mb-12 text-5xl font-bold">Hervanta</h1>
      <div className="grid grid-cols-2 gap-4">
        {FEEDS.map((feed) => (
          <Link
            key={feed.slug}
            href={`/feeds/${feed.slug}`}
            className="rounded-lg border border-gray-200 p-4 hover:border-gray-500"
          >
            {feed.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Rss;
