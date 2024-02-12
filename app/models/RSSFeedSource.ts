import Article from "./Article"

export type RSSFeedSource = {
  name: string,
  url: string,
  firstFetch: boolean,
  articles?: Article[]
}