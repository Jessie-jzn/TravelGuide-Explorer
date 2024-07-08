import { GetStaticPaths, GetStaticProps } from 'next';
import NotionService from '@/lib/notion/NotionServer';
import { Post } from '@/lib/type';
import * as API from '@/lib/api/guide';
import React from 'react';
import NotionPage from '@/components/NotionPage';
import { BlogSEO } from '@/components/SEO';
import { title } from 'process';

const notionService = new NotionService();

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postId = params?.id as string;
  // console.log('idToUuid(postId)', idToUuid(postId));
  const post = await notionService.getPage(postId);

  return {
    props: {
      post: post,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await API.getTravelGuideList();
  const paths = posts.map((post: Post) => ({
    params: { id: post.id },
  }));

  return {
    paths,
    fallback: true,
  };
};

const RenderPost = ({ post }: any): React.JSX.Element => {
  return (
    <div className="flex-auto mx-auto w-full">
      <BlogSEO title={title} date lastEdit url image />
      <NotionPage recordMap={post} />
    </div>
  );
};

export default RenderPost;
