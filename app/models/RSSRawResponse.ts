import { RawRSSItem } from "./RSSRawItem";

export type RawRSSResponse = {
  title: string;
  description: string;
  link: string;
  image: string;
  category: string;
  items: RawRSSItem[];
};
