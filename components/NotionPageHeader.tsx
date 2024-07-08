import { Breadcrumbs } from 'react-notion-x';
import SiteConfig from '@/site.config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const NotionPageHeader = ({ block }: any) => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<
    Array<{ href: string; label: string }>
  >([]);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();

      const pathArray = linkPath?.slice(0, -1)?.map((path, index) => {
        const href = '/' + linkPath.slice(0, index + 1).join('/');
        const matchingLink = SiteConfig.navigationLinks.find(
          (link) => link.url === href,
        );
        return {
          href,
          label: matchingLink ? matchingLink.title : decodeURIComponent(path),
        };
      });
      // const homeLink = SiteConfig.navigationLinks.find(
      //   (link) => link.url === '/',
      // );
      // debugger;
      // if (homeLink) {
      //   pathArray.unshift({
      //     href: homeLink.url,
      //     label: homeLink.title,
      //   });
      // }

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  return (
    <header className="notion-header">
      <div className="notion-nav-header">
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={index} className="breadcrumbs">
            <Link href={breadcrumb.href} className="breadcrumb">
              {breadcrumb.label}
            </Link>
            <div> / </div>
          </div>
        ))}
        <Breadcrumbs block={block} rootOnly={true} />
      </div>
    </header>
  );
};
export default NotionPageHeader;
