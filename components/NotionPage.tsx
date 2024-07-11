import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import SiteConfig from '../site.config';
import PageSocial from './PageSocial';
// import PropertyValue from './PropertyValue';

// import { PageBlock } from 'notion-types'
import { getPageProperty } from 'notion-utils';
import { NotionRenderer } from 'react-notion-x';
import { Block } from 'notion-types';
import * as Types from '@/lib/type';
import styles from './styles.module.css';
import PropertyValue from './PropertyValue';
import NotionPageHeader from './NotionPageHeader';
import { BlogSEO } from '@/components/SEO';
import { mapImageUrl } from '@/lib/util';
// const Code = dynamic(() =>
//   import('react-notion-x/build/third-party/code').then(async (m) => {
//     // add / remove any prism syntaxes here
//     await Promise.allSettled([
//       import('prismjs/components/prism-markup-templating.js'),
//       import('prismjs/components/prism-markup.js'),
//       import('prismjs/components/prism-bash.js'),
//       import('prismjs/components/prism-c.js'),
//       import('prismjs/components/prism-cpp.js'),
//       import('prismjs/components/prism-csharp.js'),
//       import('prismjs/components/prism-docker.js'),
//       import('prismjs/components/prism-java.js'),
//       import('prismjs/components/prism-js-templates.js'),
//       import('prismjs/components/prism-coffeescript.js'),
//       import('prismjs/components/prism-diff.js'),
//       import('prismjs/components/prism-git.js'),
//       import('prismjs/components/prism-go.js'),
//       import('prismjs/components/prism-graphql.js'),
//       import('prismjs/components/prism-handlebars.js'),
//       import('prismjs/components/prism-less.js'),
//       import('prismjs/components/prism-makefile.js'),
//       import('prismjs/components/prism-markdown.js'),
//       import('prismjs/components/prism-objectivec.js'),
//       import('prismjs/components/prism-ocaml.js'),
//       import('prismjs/components/prism-python.js'),
//       import('prismjs/components/prism-reason.js'),
//       import('prismjs/components/prism-rust.js'),
//       import('prismjs/components/prism-sass.js'),
//       import('prismjs/components/prism-scss.js'),
//       import('prismjs/components/prism-solidity.js'),
//       import('prismjs/components/prism-sql.js'),
//       import('prismjs/components/prism-stylus.js'),
//       import('prismjs/components/prism-swift.js'),
//       import('prismjs/components/prism-wasm.js'),
//       import('prismjs/components/prism-yaml.js'),
//     ]);
//     return m.Code;
//   }),
// );

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection,
  ),
);
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation),
);
// const Pdf = dynamic(
//   () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
//   {
//     ssr: false,
//   },
// );
// const Modal = dynamic(
//   () =>
//     import('react-notion-x/build/third-party/modal').then((m) => {
//       m.Modal.setAppElement('.notion-viewport');
//       return m.Modal;
//     }),
//   {
//     ssr: false,
//   },
// );

const minTableOfContentsItems = 3;

const propertyLastEditedTimeValue = (
  { block, pageHeader }: { pageHeader: boolean; block: Block },
  defaultFn: () => React.ReactNode,
) =>
  PropertyValue(
    {
      type: 'lastEdited',
      block,
      pageHeader,
    },
    defaultFn,
  );

const propertyDateValue = (
  {
    pageHeader,
    schema,
    block,
  }: { pageHeader: boolean; schema: any; block: Block },
  defaultFn: () => React.ReactNode,
) =>
  PropertyValue(
    {
      type: 'published',
      block,
      schema,
      pageHeader,
    },
    defaultFn,
  );

const propertyCreatedTimeValue = (
  { pageHeader, block }: { pageHeader: boolean; block: Block },
  defaultFn: () => React.ReactNode,
) =>
  PropertyValue(
    {
      type: 'created',
      block,
      pageHeader,
    },
    defaultFn,
  );
const NotionPage: React.FC<Types.PageProps> = ({
  //   site,
  recordMap,
  //   error,
  //   pageId,
}) => {
  const keys = Object.keys(recordMap?.block || {});
  const block = recordMap?.block?.[keys[0]]?.value;

  const isBlogPost =
    block?.type === 'page' && block?.parent_table === 'collection';

  const showTableOfContents = !!isBlogPost;

  const title = SiteConfig.title;
  const socialDescription =
    getPageProperty<string>('Description', block, recordMap) ||
    SiteConfig.description;
  // const socialDescription = SiteConfig.description;

  // const socialImage = mapImageUrl(
  //   getPageProperty<string>('Social Image', block, recordMap) ||
  //     (block as Block).format?.page_cover ||
  //     SiteConfig.defaultPageCover,
  //   block,
  // );
  // const imgs = mapImageUrl(
  //   getPageProperty<string>('Social Image', block, recordMap),
  //   block,
  // );
  // console.log('imgs', imgs);
  // debugger;

  const socialImage = mapImageUrl(
    (block as Block)?.format?.page_cover || SiteConfig.defaultPageCover,
    block,
  );

  // console.log('socialImage', socialImage);
  // debugger;

  const components = useMemo(
    () => ({
      nextImage: Image,
      nextLink: Link,
      //   Code,
      Collection,
      Equation,
      //   Pdf,
      //   Modal,
      //   Tweet,
      Header: NotionPageHeader,
      propertyLastEditedTimeValue,
      propertyDateValue,
      propertyCreatedTimeValue,
    }),
    [],
  );
  const pageAside = React.useMemo(() => <PageSocial />, []);

  return (
    <>
      <BlogSEO
        title={title}
        description={socialDescription}
        // date
        // lastEdit
        image={socialImage}
      />
      <NotionRenderer
        bodyClassName={styles.notion}
        components={components}
        recordMap={recordMap}
        // rootPageId={site.rootNotionPageId}
        rootDomain={SiteConfig.domain}
        fullPage={true}
        previewImages={!!recordMap?.preview_images}
        showCollectionViewDropdown={false}
        showTableOfContents={showTableOfContents}
        minTableOfContentsItems={minTableOfContentsItems}
        defaultPageIcon={SiteConfig.defaultPageIcon}
        defaultPageCover={SiteConfig.defaultPageCover}
        defaultPageCoverPosition={SiteConfig.defaultPageCoverPosition}
        // mapPageUrl={siteMapPageUrl}
        // mapImageUrl={mapImageUrl}
        // searchNotion={config.isSearchEnabled ? searchNotion : null}
        pageAside={pageAside}
        // footer={footer}
      />
    </>
  );
};
export default NotionPage;
