import React from 'react';
import Image from 'next/image';
import { Post } from '@/lib/type';
import Link from 'next/link';

interface PostItemHomeProp {
  post: Post;
}
const PostItemHome = ({ post }: PostItemHomeProp) => {
  return (
    <>
      <Link href={`/guide/${post.id}`}>
        <div className="max-w-sm mx-auto bg-white dark:bg-zinc-800 border border-gray-200 rounded-xl overflow-hidden p-4">
          <div className="md:flex">
            <div className="md:flex-shrink-0 rounded-xl overflow-hidden">
              <Image
                width={360}
                height={120}
                className="h-36 md:w-36 object-cover object-center"
                src={post.cover}
                alt="Beach"
              />
            </div>
            <div className="py-4 md:ml-4">
              <div className="flex">
                {post.tags?.map((t: string) => (
                  <div
                    key={t}
                    className="uppercase tracking-wide text-sm font-semibold text-teal-500 mr-2"
                  >
                    {t}
                  </div>
                ))}
              </div>
              <div className="block mt-1 text-lg leading-tight font-medium text-gray-900 dark:text-gray-100 hover:underline">
                {post?.name}
              </div>
              <div className="mt-2 text-gray-500">
                <p className="text-sm"> {post.created_time}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default PostItemHome;
