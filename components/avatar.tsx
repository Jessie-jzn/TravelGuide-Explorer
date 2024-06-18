import Image from 'next/image';

interface Author {
  node: {
    firstName?: string;
    lastName?: string;
    name?: string;
    avatar: {
      url: string;
    };
  };
}

interface AvatarProps {
  author: Author;
}

export default function Avatar({ author }: AvatarProps) {
  const isAuthorHaveFullName =
    author?.node?.firstName && author?.node?.lastName;
  const name = isAuthorHaveFullName
    ? `${author.node.firstName} ${author.node.lastName}`
    : author.node.name || null;

  return (
    <div className="flex items-center">
      <div className="w-12 h-12 relative mr-4">
        <Image
          src={author.node.avatar.url}
          layout="fill"
          className="rounded-full"
          alt={author.node.avatar.url}
        />
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}
