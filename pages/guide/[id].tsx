import { GetStaticPaths, GetStaticProps } from 'next';
import NotionService from '@/lib/notion/NotionServer';
import { Post } from '@/lib/type';
import { NotionRenderer } from 'react-notion-x';
import Link from 'next/link';
import Image from 'next/image';
import * as API from '../api/guide';
import React from 'react';

const notionService = new NotionService();

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postId = params?.id as string;
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
  console.log('postpostpostpost', post)
  return (
    <NotionRenderer
      recordMap={post}
      fullPage={true}
      darkMode={false}
      components={{
        nextImage: Image,
        nextLink: Link,
      }}
    />
  );
};

export default RenderPost;
