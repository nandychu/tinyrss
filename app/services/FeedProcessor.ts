import Article from "../models/Article";

export type RawRSSResponse = {
  title: string;
  description: string;
  link: string;
  image: string;
  category: string;
  items: RawRSSItem[];
};

export type RawRSSItem =
  {
    title: string;
    description: string;
    link: string;
    published: string;
    created: string;
    category: any[];
    enclosures: any[];
    media: object;
    content: string;
    author: string;
  }

export function processFeedResponse(rss: RawRSSResponse) {
  return new Promise((resolve, reject) => {
    let articles: Article[] = []
    for (let item of rss.items) {
      articles.push(new Article(item))
    }
    resolve(articles)
  })
}