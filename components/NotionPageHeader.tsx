import { Breadcrumbs, useNotionContext } from 'react-notion-x';
import SiteConfig from '@/site.config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const NotionPageHeader = ({ block }: any) => {
  const { components, mapPageUrl } = useNotionContext();
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<
    Array<{ href: string; label: string }>
  >([]);

  console.log('router', router);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();

      const pathArray = linkPath.map((path, index) => {
        return {
          href: '/' + linkPath.slice(0, index + 1).join('/'),
          label: path,
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  return (
    <header className="notion-header">
      <div className="notion-nav-header">
        <Breadcrumbs block={block} rootOnly={true} />
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li key="home">
              <Link href="/">Home</Link>
            </li>
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={index} className="breadcrumb-item">
                <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="notion-nav-header-rhs breadcrumbs">
          {SiteConfig.navigationLinks
            ?.map((link, index) => {
              if (!link.pageId && !link.url) {
                return null;
              }

              if (link.pageId) {
                return (
                  <components.PageLink
                    href={mapPageUrl(link.pageId)}
                    key={index}
                    className="breadcrumb, button"
                  >
                    {link.title}
                  </components.PageLink>
                );
              } else {
                return (
                  <components.Link
                    href={link.url}
                    key={index}
                    className="breadcrumb, button"
                  >
                    {link.title}
                  </components.Link>
                );
              }
            })
            .filter(Boolean)}

          {/* {isSearchEnabled && <Search block={block} title={null} />} */}
        </div>
      </div>
    </header>
  );
};
export default NotionPageHeader;
