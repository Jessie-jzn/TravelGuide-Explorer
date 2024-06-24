import Link from 'next/link';
import { Post } from '@/lib/type';

interface IndexProp {
  item: Post;
}
const PostItemCard = ({ item }: IndexProp) => {
  return (
    <div className="group relative flex flex-col items-start" key={item.id}>
      <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
        <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50"></div>
        <span className="relative z-10">{item.name}</span>
      </h2>
      <time
        className="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5"
        dateTime={item.date}
      >
        <span className="absolute inset-y-0 left-0 flex items-center">
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
        </span>
        {item.date}
      </time>
      <div className="relative max-h-20 whitespace-normal text-ellipsis overflow-hidden z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {item.description}
      </div>
      <Link href={`/guide/${item.id}`}>
        <div className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
          查看原文
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="ml-1 h-4 w-4 stroke-current"
          >
            <path d="M6.75 5.75 9.25 8l-2.5 2.25"></path>
          </svg>
        </div>
      </Link>
    </div>
  );
};
export default PostItemCard;
