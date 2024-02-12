import parse from "rss-to-json";
import { RSSFeedSource } from "../models/RSSFeedSource";
import { RawRSSResponse, processFeedResponse } from "./FeedProcessor";

export function fetchFeed(rssFeed: RSSFeedSource) {
  return new Promise(async (resolve, reject) => {
    let rss: Partial<RawRSSResponse> = await parse(rssFeed.url);
    rss = {
      ...rss,
      items: rss.items ? [...rss.items] : [],
    };
    let articles = await processFeedResponse(rss as RawRSSResponse);
    resolve(articles);
  });
}
