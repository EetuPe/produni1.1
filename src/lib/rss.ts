import Parser from 'rss-parser';
import type { Output } from 'rss-parser';

export const FEEDS = [
  {
    slug: 'hervanta-hertsi',
    title: 'Hertsi',
    url: 'https://www.sodexo.fi/ruokalistat/rss/weekly_rss/111/fi'
  },
  {
    slug: 'hervanta-reaktori',
    title: 'Reaktori',
    url: 'https://www.compass-group.fi/menuapi/feed/rss/current-week?costNumber=0812&language=fi'
  }
];

export type Feed = (typeof FEEDS)[number];

export type CustomItem = {
  title: string;
  contentSnippet?: string | null;
  guid?: string;
};

const parser: Parser<Record<string, never>, CustomItem> = new Parser();

export async function getFeed(feedUrl: string): Promise<Output<CustomItem>> {
  return parser.parseURL(feedUrl);
}
