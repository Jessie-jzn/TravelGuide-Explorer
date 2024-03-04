import Link from 'next/link';
import Layout from '../../components/Layout/index';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getSinglePost, getAllPostsWithId } from '../../lib/api';
import Image from 'next/image';
import { formatTimestampToDate } from '../../lib/util';

interface PostProps {
  post: {
    title: string;
    date: string;
    content: string;
    featuredImage: {
      node: {
        sourceUrl: string;
      };
    };
  };
}

export default function Post({ post }: PostProps) {
  console.log('post', post);

  return (
    <Layout>
      <div className="relative px-8 mt-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="h-64 md:h-96  lg:h-[480px] relative overflow-hidden rounded-lg">
            <Image
              src={post.featuredImage?.node?.sourceUrl}
              className="object-cover object-center rounded-t-lg w-full"
              layout="fill"
              alt={post.featuredImage?.node?.sourceUrl}
            />
          </div>
          <div className="max-w-3xl mx-auto mt-4">
            <div className="border-b-2 border-primary-500 w-8"></div>
            <h1 className="font-display text-4xl font-bold my-6 text-secondary-500">
              {post.title}
            </h1>
            <div className="mt-4 uppercase text-gray-600 italic font-semibold text-xs">
              {formatTimestampToDate(post.date)}
            </div>

            <div
              className="prose max-w-full mb-20"
              dangerouslySetInnerHTML={{ __html: post?.content }}
            />
          </div>
        </div>
      </div>
      {/* <nav className="flex flex-wrap justify-between mb-10">
        {previousPost ? (
          <Link href={'/posts/[slug]'} as={`/posts/${previousPost.slug}`}>
            <div className="text-lg font-bold">
              ← {previousPost.frontmatter.title}
            </div>
          </Link>
        ) : (
          <div />
        )}
        {nextPost ? (
          <Link href={'/posts/[slug]'} as={`/posts/${nextPost.slug}`}>
            <div className="text-lg font-bold">{nextPost.frontmatter.title} →</div>
          </Link>
        ) : (
          <div />
        )}
      </nav> */}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  console.log('params?.id', params?.id);
  const post = await getSinglePost(params?.id as string, preview);

  console.log('data', post);

  return {
    props: {
      post: post,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const allPostsData = await getAllPostsWithId();

    // 使用文章数据来生成路径
    // @ts-ignore
    const paths = allPostsData.edges.map(({ node }) => `/posts/${node.id}`);
  
    return {
      paths: paths,
      fallback: true,
    };
  } catch (error) {
    console.error('获取静态路径时出错：', error);
    return {
      paths: [],
      fallback: true,
    }
  }

};
