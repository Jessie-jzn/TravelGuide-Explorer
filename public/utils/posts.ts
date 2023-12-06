// 处理博客文章的相关信息，比如获取文件夹、排序文章、获取文章的 slug、根据 slug 获取文章信息等
import matter, { GrayMatterFile } from 'gray-matter';
import fs from 'fs';

// 定义文章前置信息的接口
interface Frontmatter {
  title: string;
  date: string;
  description?: string
}

// 定义文章信息的接口
export interface PostInfo {
  slug: string;
  frontmatter: Frontmatter;
  excerpt: string;
  content: string;
}

/**
 * 获取文章文件夹信息
 * @returns 返回包含文件夹名称和文件名的对象数组
 */
export function getPostsFolders(): { directory: string; filename: string }[] {
  const postsFolders = fs
    .readdirSync(`${process.cwd()}/content/posts`)
    .map((folderName) => ({
      directory: folderName,
      filename: `${folderName}.md`,
    }));

  return postsFolders;
}
/**
 * 格式化日期
 * @param date 日期对象
 * @returns 返回格式化后的日期字符串，例如 "January 1, 2023"
 */
function getFormattedDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return formattedDate;
}

/**
 * 获取已排序的文章信息列表
 * @returns 返回包含文章信息的数组
 */
export function getSortedPosts(): PostInfo[] {
  const postFolders = getPostsFolders();

  const posts: PostInfo[] = postFolders
    .map(({ filename, directory }) => {
      // 从文件中获取原始内容
      const markdownWithMetadata = fs
        .readFileSync(`content/posts/${directory}/${filename}`)
        .toString();

      // 解析 Markdown，获取 frontmatter 数据、摘要和内容。
      const { data, excerpt, content }: GrayMatterFile<string> =
        matter(markdownWithMetadata);

      const frontmatter: Frontmatter = {
        ...data,
        date: getFormattedDate(new Date(data.date)),
      };

      // 从文章名中去掉 .md 文件扩展名
      const slug = filename.replace('.md', '');

      return {
        slug,
        frontmatter,
        excerpt,
        content,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );

  return posts;
}
/**
 * 获取文章 slug 列表
 * @returns 返回包含 slug 参数的对象数组
 */
export function getPostsSlugs(): { params: { slug: string } }[] {
  const postFolders = getPostsFolders();

  const paths = postFolders.map(({ filename }) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return paths;
}

/**
 * 根据 slug 获取文章信息
 * @param slug 文章 slug
 * @returns 返回包含文章信息的对象，包括前一篇和后一篇文章的信息
 */
interface PostBySlugResult {
  frontmatter: Frontmatter;
  post: { content: string; excerpt: string };
  previousPost?: PostInfo;
  nextPost?: PostInfo;
}

export function getPostBySlug(slug: string): PostBySlugResult | undefined {
  const posts = getSortedPosts();

  const postIndex = posts.findIndex(({ slug: postSlug }) => postSlug === slug);

  if (postIndex === -1) {
    return undefined;
  }

  const { frontmatter, content, excerpt } = posts[postIndex];

  const previousPost = posts[postIndex + 1];
  const nextPost = posts[postIndex - 1];

  return { frontmatter, post: { content, excerpt }, previousPost, nextPost };
}
