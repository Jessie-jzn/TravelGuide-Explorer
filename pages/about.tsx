// import Image from 'next/image';
import Head from 'next/head';
// import ContactIcon from '@/components/ContactIcon';
import { GetStaticProps } from 'next';
// import * as API from '@/lib/api/guide';
import NotionService from '@/lib/notion/NotionServer';
// import { NotionRenderer } from 'react-notion-x';
// import { idToUuid } from 'notion-utils';
// import Link from 'next/link';
import { NOTION_ABOUT_ID } from '@/lib/constants';
import NotionPage from '@/components/NotionPage';
const notionService = new NotionService();
export const getStaticProps: GetStaticProps = async () => {
  // 提取包含指南的国家列表
  const post = await notionService.getPage(NOTION_ABOUT_ID);
  console.log('post', post);

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
};
const About = ({ post }: any) => {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Jessie',
              description:
                'A passionate travel blogger who shares travel tips and stories.',
              url: 'https://next-notion-blog-gamma.vercel.app/about',
            }),
          }}
        />
      </Head>

      <NotionPage recordMap={post} />
      {/* <NotionRenderer
        recordMap={post}
        fullPage={true}
        darkMode={false}
        components={{
          nextImage: Image,
          nextLink: Link,
        }}
      /> */}

      {/* <div className="flex-auto mx-auto w-full px-4 sm:px-8 lg:px-8  max-w-3xl xl:max-w-7xl">
        <div className="items-start space-y-2 grid grid-cols-2 sm:grid-cols-1 gap-x-8">
          <div className="flex flex-col items-center space-x-1 pt-8 sm:pt-28">
            <Image
              src="https://avatars.githubusercontent.com/u/18711470?v=4"
              alt="avatar"
              width={192}
              height={192}
              className="h-48 w-48 rounded-full"
            />

            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">
              Jessie
            </h3>
            <div className="text-gray-500 dark:text-gray-400 mb-8">
              旅游博主
            </div>

            <ContactIcon />
          </div>

          <div className="prose max-w-none pb-8 dark:prose-dark xl:col-span-2">
            <div className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              👋 Hi, I’m Jessie.
            </div>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p className="font-medium">一个热爱旅行的旅行博主。</p>
              <p>我很高兴有机会与你分享我的旅行经历和见闻。</p>
              <p>
                我曾旅行过中国的每一个省份，感受了这个古老而多彩的国家的文化和风景。
                从北方的冰雪世界到南方的热带天堂，我一路穿越，留下了无数珍贵的回忆。
                除了中国，我还曾踏足日本、泰国、马来西亚、菲律宾、哈萨克斯坦、乌兹别克斯坦和土耳其等国家。
              </p>
              <p>
                每一次旅行都是一次新的冒险，我喜欢探索不同国家的文化、历史和美食，与当地人交流，感受他们的生活方式。
                作为一名旅行博主，我专注于分享旅行攻略和经验。
              </p>
              <h2 className="font-bold text-2xl">为什么要有这个博客？</h2>
              <p>
                我对旅行和讲故事的热爱促使我创建了这个博客。这里是我记录旅程、分享旅行技巧，并提供深入的旅游指南的平台。
              </p>
              <p>
                通过这个博客，我希望与旅行爱好者建立联系，分享有价值的见解，并提供实用的建议，帮助大家自信而有创意地探索世界。
                我相信旅行能够开阔视野，创造难忘的回忆。我希望我的博客能成为你下次旅行的灵感和信息来源。
              </p>
              <p>
                我致力于为旅行者提供实用的建议和有趣的故事，帮助他们规划和享受自己的旅程。
                我相信，旅行不仅是探索未知，更是发现自我，我希望通过我的博客，能够激励更多的人踏上旅程，探索这个美丽而神奇的世界。
                感谢你们的关注和支持，让我们一起共享旅行的乐趣，开启新的冒险之旅！
              </p>
              <p>
                我非常欢迎大家对我的文章发表看法和评论。请随时分享你的旅行经历，加入我们的讨论！
                期待与你们一起分享更多精彩的旅行故事！
              </p>
              <h2 className="font-bold text-2xl">我的旅行装备和工具：</h2>
              <ul>
                <li>相机：索尼a6000</li>
                <li>无人机：大疆Mavic Air 2</li>
                <li>编辑软件：Adobe Premiere Pro & Lightroom </li>
                <li>旅行规划：Google Maps, Notion</li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};
export default About;
