import parse from "rss-to-json";
import { RSSFeedSource } from "../models/RSSFeedSource";
import { processFeedResponse } from "./FeedProcessor";
import { RawRSSResponse } from "../models/RSSRawResponse";

export function fetchFeed(rssFeed: RSSFeedSource) {
  return new Promise(async (resolve, reject) => {
    let rss: Partial<RawRSSResponse> = await parse(rssFeed.url);
    console.log(rssFeed)

    rss = {
      ...rss,
      items: rss.items ? [...rss.items] : [],
    };
    let articles = await processFeedResponse(rss as RawRSSResponse);
    resolve(articles);
  });
}
