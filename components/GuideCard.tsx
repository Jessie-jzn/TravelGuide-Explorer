import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/type';

interface GuideCardProp {
  post: Post;
}

const GuideCard = ({ post }: GuideCardProp) => {
  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-lg shadow-nextjs dark:shadow-nextjs-dark hover:translate-y-1 transition-all duration-300 active:translate-y-1"
      key={post.id}
    >
      <Link href={`/guide/${post.id}`}>
        <Image
          width={480}
          height={480}
          className="object-cover object-center md:h-36 lg:h-60"
          alt={`Cover Image for`}
          src={post.cover}
        />
        <div className="p-6">
          <div
            className="mt-4 prose mb-3 max-w-none text-gray-500 dark:text-gray-400"
            data-relingo-block="true"
          >
            {post.date}
          </div>
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            {post.name}
          </h2>
          <div className="w-full h-12 whitespace-normal text-ellipsis overflow-hidden prose mb-3 text-gray-500 dark:text-gray-400">
            {post?.description}
          </div>
          <div className="flex">
            {post.tags?.map((t: string) => (
              <div
                key={t}
                className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GuideCard;
