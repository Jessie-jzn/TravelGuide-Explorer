import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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
interface IndexProps {
  posts: Post[];
}

export const getStaticProps: GetStaticProps = async () => {
  console.log('执行getStaticProps');

  const data = await API.getTravelGuideList();

  // 返回格式化后的数据
  console.log('formattedGuides', data);

  return {
    props: {
      posts: data,
    },
    revalidate: 10,
  };
};

const Index = ({ posts }: IndexProps): JSX.Element => {
  return (
    <div className="grid sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 pt-8">
      {posts.map((item: Post) => (
        <Link href={`/guide/${item.id}`}>
          <div
            className="flex h-full flex-col overflow-hidden rounded-lg border border-transparent shadow-nextjs dark:shadow-nextjs-dark"
            key={item.id}
          >
            <Image
              width={480}
              height={480}
              className="object-cover object-center md:h-36 lg:h-60"
              alt={`Cover Image for`}
              src={item.image}
            />
            <div className="p-6">
              <div
                className="mt-4 prose mb-3 max-w-none text-gray-500 dark:text-gray-400"
                data-relingo-block="true"
              >
                {item.date}
              </div>
              <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
                {item.name}
              </h2>
              <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
                {item?.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Index;
