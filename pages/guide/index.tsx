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
interface Props {
  posts: Post[];
  // preview: boolean;
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

const Index = ({ posts }: Props): JSX.Element => {
  return (
    <div className="grid sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 pt-8">
      {posts.map((item: Post) => (
        <Link href={`/guide/${item.id}`}>
          <div className="flex-col group mb-8 md:mb-0" key={item.id}>
            <div className="relative w-full overflow-clip">
              <Image
                width={480}
                height={480}
                alt={`Cover Image for`}
                src={item.image}
              />
            </div>
            <div className="bg-gray-100 p-8 border-1 border-t-0 rounded-b-lg">
              <div
                className="mt-4 text-gray-600 italic font-semibold text-xs transition"
                data-relingo-block="true"
              >
                {item.date}
              </div>
              <div className="text-secondary-500 mt-1 font-black text-2xl group-hover:text-primary-500 transition duration-300">
                {item.name}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Index;
