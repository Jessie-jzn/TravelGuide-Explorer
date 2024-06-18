import { GetStaticPaths, GetStaticProps } from 'next';
import NotionService from '@/lib/notion/NotionServer';
import { Post } from '@/lib/type';
import { NotionRenderer } from 'react-notion-x';
import Link from 'next/link';
import * as API from '../api/guide';

interface Props {
  post: Post;
  redirect?: string;
  // preview: boolean;
}
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
const RenderPost = ({ post, redirect }: Props): JSX.Element => {
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
