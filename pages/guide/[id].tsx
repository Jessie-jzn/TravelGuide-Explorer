import { GetStaticPaths } from 'next';
import NotionService from '../../lib/notion/NotionServer';
import { NotionRenderer } from 'react-notion-x';
import * as API from '../api/guide';

interface Post {
  id: string;
  description?: string;
  name?: string;
  published?: boolean;
  url: string;
  date?: string;
  image: string;
}
interface Props {
  post: Post;
  redirect?: string;
  // preview: boolean;
}
const notionService = new NotionService();

export const getStaticProps = async ({ params }) => {
  console.log('执行getStaticProps', params.id);

  // const data = await getPostIndex('067dd719-a912-471e-a9a3-ac10710e7fdf');
  const post = await notionService.getPage(params.id);
  console.log('data', post);
  // console.log('1data1111111',data1)

  return {
    props: {
      post: post,
    },
    revalidate: 10,
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch data from Notion to get all guide IDs
  const posts = await API.getTravelGuideList();
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  return {
    paths,
    fallback: true,
  };
};
const RenderPost = ({ post, redirect }: Props): JSX.Element => {
  console.log('posts', post);

  return <NotionRenderer recordMap={post} fullPage={true} darkMode={false} />;
};

export default RenderPost;
