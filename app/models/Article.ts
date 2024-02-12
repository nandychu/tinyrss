import * as cheerio from "cheerio";
import { RawRSSItem, RawRSSResponse } from "../services/FeedProcessor";

export default class Article {
  headerImage: string;
  title: string;
  author: string;
  content: string;
  briefContent: string;
  index: number;
  published: string;

  constructor(raw: RawRSSItem) {
    this.headerImage = this.parseHeaderImage(raw)
    this.title = raw.title;
    this.content = this.parseContent(raw);
    this.author = raw.author;
    this.briefContent = this.parseBriefContent(raw)
    this.published = this.dateFormatter(raw.published)
  }

  private parseHeaderImage(raw: RawRSSItem) {
    const regex = /<img.*?src="(.*?)".*?>/;
    const matchDescription = raw.description.match(regex);
    let foundUrl = null;
    if (matchDescription && matchDescription.length > 1) {
      const url = matchDescription[1];
      foundUrl = url
    }
    if (!foundUrl) {
      const matchContent = raw.content.match(regex);
      if (matchContent && matchContent.length > 1) {
        const url = matchContent[1];
        foundUrl = url
      }
    }
    return foundUrl
  }

  private parseContent(raw: RawRSSItem) {
    const regex = /<img.*?src="(.*?)".*?>/;
    if (raw.content) {
      return raw.content.replace(regex, "");
    } else {
      return raw.description.replace(regex, "")
    }
  }

  private parseBriefContent(raw) {
    let briefContent;

    let $
    if (raw.content) {
      $ = cheerio.load(raw.content);
    } else {
      $ = cheerio.load(raw.description)
    }

    let firstFilledElement = "";

    $("p").each((index, element) => {
      const text = $(element).text().trim();
      if (text !== "") {
        firstFilledElement = text;
        briefContent = text;
        return false;
      }
    });
    return firstFilledElement;
  }

  private dateFormatter(timestamp) {
    const date = new Date(timestamp)
    const min = date.getMinutes();
    const hours = date.getHours();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year} ${hours}:${min} `;
  }
}