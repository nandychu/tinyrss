import Article from "../models/Article";
import { RawRSSResponse } from "../models/RSSRawResponse";

export function processFeedResponse(rss: RawRSSResponse) {
  return new Promise((resolve, reject) => {
    let articles: Article[] = []
    for (let item of rss.items) {
      articles.push(new Article(item))
    }
    resolve(articles)
  })
}