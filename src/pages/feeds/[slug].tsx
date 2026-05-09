import { FEEDS, getFeed, type CustomItem } from '~/lib/rss';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  feed: (typeof FEEDS)[number];
  items: CustomItem[];
}

export default function Feed({ feed, items }: Props) {
  return (
    <div className="px-6 py-12 max-w-xl mx-auto">
      <h1 className="font-bold text-5xl mb-12">{feed.title}</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.guid}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            {item.contentSnippet && (
              <CardContent>
                <p className="whitespace-pre-line text-sm text-muted-foreground">
                  {item.contentSnippet}
                </p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: FEEDS.map((feed) => ({ params: { slug: feed.slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const feed = FEEDS.find((feed) => feed.slug === params.slug);
  if (!feed) return { notFound: true };

  const detailedFeed = await getFeed(feed.url);
  const items = (detailedFeed.items ?? []).map((item) => ({
    ...item,
    contentSnippet: item.contentSnippet ?? null
  }));

  return {
    props: {
      feed,
      items
    },
    revalidate: 1
  };
}
