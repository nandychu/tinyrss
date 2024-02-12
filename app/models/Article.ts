export default class Article {
  headerImage: string;
  title: string;
  author: string;
  content: string;
  briefContent: string;
  published: string;

  constructor(raw: any) {
    this.headerImage = ''
    this.title = '';
    this.content = ''
    this.author = ''
    this.briefContent = ''
    this.published = ''
  }
}