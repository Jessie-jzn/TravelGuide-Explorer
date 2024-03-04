// // 处理博客文章的相关信息，比如获取文件夹、排序文章、获取文章的 slug、根据 slug 获取文章信息等
// import matter, { GrayMatterFile } from 'gray-matter';
// import fs from 'fs';

// // 定义文章前置信息的接口
// interface Frontmatter {
//   title: string;
//   date: string;
//   description?: string
// }

// // 定义文章信息的接口
// export interface PostInfo {
//   slug: string;
//   frontmatter: Frontmatter;
//   excerpt: string;
//   content: string;
// }

// /**
//  * 获取文章文件夹信息
//  * @returns 返回包含文件夹名称和文件名的对象数组
//  */
// export function getPostsFolders(): { directory: string; filename: string }[] {
//   const postsFolders = fs
//     .readdirSync(`${process.cwd()}/content/posts`)
//     .map((folderName) => ({
//       directory: folderName,
//       filename: `${folderName}.md`,
//     }));

//   return postsFolders;
// }
// /**
//  * 格式化日期
//  * @param date 日期对象
//  * @returns 返回格式化后的日期字符串，例如 "January 1, 2023"
//  */
// function getFormattedDate(date: Date): string {
//   const options: Intl.DateTimeFormatOptions = {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   };
//   const formattedDate = date.toLocaleDateString('en-US', options);

//   return formattedDate;
// }

// /**
//  * 获取已排序的文章信息列表
//  * @returns 返回包含文章信息的数组
//  */
// export function getSortedPosts(): PostInfo[] {
//   const postFolders = getPostsFolders();

//   const posts: PostInfo[] = postFolders
//     .map(({ filename, directory }) => {
//       // 从文件中获取原始内容
//       const markdownWithMetadata = fs
//         .readFileSync(`content/posts/${directory}/${filename}`)
//         .toString();

//       // 解析 Markdown，获取 frontmatter 数据、摘要和内容。
//       const { data, excerpt, content }: GrayMatterFile<string> =
//         matter(markdownWithMetadata);

//       const frontmatter: Frontmatter = {
//         ...data,
//         date: getFormattedDate(new Date(data.date)),
//       };

//       // 从文章名中去掉 .md 文件扩展名
//       const slug = filename.replace('.md', '');

//       return {
//         slug,
//         frontmatter,
//         excerpt,
//         content,
//       };
//     })
//     .sort(
//       (a, b) =>
//         new Date(b.frontmatter.date).getTime() -
//         new Date(a.frontmatter.date).getTime()
//     );

//   return posts;
// }
// /**
//  * 获取文章 slug 列表
//  * @returns 返回包含 slug 参数的对象数组
//  */
// export function getPostsSlugs(): { params: { slug: string } }[] {
//   const postFolders = getPostsFolders();

//   const paths = postFolders.map(({ filename }) => ({
//     params: {
//       slug: filename.replace('.md', ''),
//     },
//   }));

//   return paths;
// }

// /**
//  * 根据 slug 获取文章信息
//  * @param slug 文章 slug
//  * @returns 返回包含文章信息的对象，包括前一篇和后一篇文章的信息
//  */
// interface PostBySlugResult {
//   frontmatter: Frontmatter;
//   post: { content: string; excerpt: string };
//   previousPost?: PostInfo;
//   nextPost?: PostInfo;
// }

// export function getPostBySlug(slug: string): PostBySlugResult | undefined {
//   const posts = getSortedPosts();

//   const postIndex = posts.findIndex(({ slug: postSlug }) => postSlug === slug);

//   if (postIndex === -1) {
//     return undefined;
//   }

//   const { frontmatter, content, excerpt } = posts[postIndex];

//   const previousPost = posts[postIndex + 1];
//   const nextPost = posts[postIndex - 1];

//   return { frontmatter, post: { content, excerpt }, previousPost, nextPost };
// }

// import path from 'path';
// import remark from 'remark';
// import html from 'remark-html';

// const postsDirectory = path.join(process.cwd(), 'posts');

// export function getSortedPostsData() {
//   // 获取 /posts 目录下的文件名
//   const fileNames = fs.readdirSync(postsDirectory);
//   const allPostsData = fileNames.map(fileName => {
//     // 去掉文件名的扩展名获取 id
//     const id = fileName.replace(/\.md$/, '');

//     // 读取 markdown 文件内容
//     const fullPath = path.join(postsDirectory, fileName);
//     const fileContents = fs.readFileSync(fullPath, 'utf8');

//     // 使用 gray-matter 解析 metadata
//     const matterResult = matter(fileContents);

//     // 合并 id 和 metadata
//     return {
//       id,
//       ...matterResult.data
//     };
//   });
//   // 根据日期排序
//   return allPostsData.sort((a, b) => {
//     if (a.date < b.date) {
//       return 1;
//     } else {
//       return -1;
//     }
//   });
// }
// export function getAllPostIds() {
//   const fileNames = fs.readdirSync(postsDirectory);

//   // 返回一个包含 { params: { id } } 的数组
//   return fileNames.map(fileName => {
//     return {
//       params: {
//         id: fileName.replace(/\.md$/, '')
//       }
//     };
//   });
// }


// export async function getPostData(id) {
//   const fullPath = path.join(postsDirectory, `${id}.md`);
//   const fileContents = fs.readFileSync(fullPath, 'utf8');

//   // 使用 gray-matter 解析 metadata
//   const matterResult = matter(fileContents);

//   // 使用 remark 将 markdown 转换为 HTML 字符串
//   const processedContent = await remark()
//     .use(html)
//     .process(matterResult.content);
//   const contentHtml = processedContent.toString();

//   // 合并 id、metadata 和 contentHtml
//   return {
//     id,
//     contentHtml,
//     ...matterResult.data
//   };
// }