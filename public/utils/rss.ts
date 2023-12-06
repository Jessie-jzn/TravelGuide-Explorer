// 引入 Node.js 中的文件系统模块
import fs from 'fs';
// 引入用于创建 feed 的包
import { Feed } from 'feed';
import { getSortedPosts } from './posts';
import { SiteMetaData } from './config';

/**
 * 生成 RSS 订阅源的函数
 */
export function generateRssPostsFeed() {
  // 从站点元数据中获取标题、站点链接、语言和作者等信息
  const { title, siteUrl, language, author } = SiteMetaData;

  // 获取已排序的博客文章列表
  const posts = getSortedPosts();

  // 创建一个新的 Feed 实例
  const feed = new Feed({
    title, // 标题
    id: siteUrl, // ID，通常是站点的链接
    link: siteUrl, // 链接
    language, // 语言
    copyright: 'Copyright © ' + new Date().getFullYear() + ' ' + author.name,
    author: {
      name: author.name,
      link: author?.link,
    },
    feedLinks: {
      rss2: `${siteUrl}rss.xml`, // RSS feed 的链接
    },
  });

  // 遍历博客文章列表，为每篇文章创建一个 feed item
  posts.forEach(
    ({ frontmatter: { title, description, date }, content, slug }) => {
      feed.addItem({
        title, // 文章标题
        description, // 文章描述
        date: new Date(date), // 文章日期
        id: slug, // 文章 ID，通常是文章的 slug
        link: `${siteUrl}posts/${slug}`, // 文章链接
        content: content, // 文章内容
      });
    }
  );

  // 将生成的 RSS 输出写入公共文件，使其可以通过 siteUrl/rss.xml 访问
  fs.writeFileSync('public/rss.xml', feed.rss2());
}
