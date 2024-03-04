import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';
import { formatTimestampToDate } from '../lib/util';

interface EdgeItem {
  node: {
    id: string;
    featuredImage?: {
      node?: {
        sourceUrl: string;
      };
    };
    slug: string;
    date: string;
    title: string;
  };
}

const PostCard: React.FC<{ edgeItem: EdgeItem }> = ({ edgeItem }) => {
  const node = useMemo(() => edgeItem.node, [edgeItem]);

  return (
    <Link href={`/posts/${node.id}`} passHref>
      <div className="hover:underline">
        <div className="flex-col group mb-8 md:mb-0">
          <div className="relative h-64 w-full overflow-clip">
            {node.featuredImage?.node?.sourceUrl && (
              <Image
                src={node.featuredImage.node.sourceUrl}
                alt={node.title}
                className="object-cover object-center rounded-t-lg w-full"
                layout="fill"
              />
            )}
          </div>
          <div className="bg-gray-100 p-8 border-2 border-t-0 rounded-b-lg">
            <div className="uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose">
              {node.slug}
            </div>
            <div className="border-b-2 border-primary-500 w-8"></div>
            <div className="mt-4 uppercase text-gray-600 italic font-semibold text-xs">
              {formatTimestampToDate(node.date)}
            </div>
            <h2 className="text-secondary-500 mt-1 font-black text-2xl group-hover:text-primary-500 transition duration-300">
              {node.title}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;

