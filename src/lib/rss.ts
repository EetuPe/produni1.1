export type Feed = {
  slug: string;
  title: string;
  url: string;
};

export const FEEDS: Feed[] = [
  {
    slug: 'ravintola-reaktori',
    title: 'Ravintola Reaktori',
    url: 'https://example.com/feed1.rss'
  },
  {
    slug: 'juvenes',
    title: 'Juvenes',
    url: 'https://example.com/feed2.rss'
  }
  // add more feeds here
];
