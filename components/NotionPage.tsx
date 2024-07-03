import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
// import { PageBlock } from 'notion-types'
import { NotionRenderer } from 'react-notion-x';
import * as types from '@/lib/type';
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

const NotionPage: React.FC<types.PageProps> = ({
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
      //   Header: NotionPageHeader,
      //   propertyLastEditedTimeValue,
      //   propertyTextValue,
      //   propertyDateValue,
    }),
    [],
  );
  return (
    <>
      <NotionRenderer
        // bodyClassName={cs(
        //   styles.notion,
        //   pageId === site.rootNotionPageId && 'index-page',
        // )}
        components={components}
        recordMap={recordMap}
        // rootPageId={site.rootNotionPageId}
        // rootDomain={site.domain}
        // fullPage={!isLiteMode}
        previewImages={!!recordMap.preview_images}
        showCollectionViewDropdown={false}
        showTableOfContents={showTableOfContents}
        minTableOfContentsItems={minTableOfContentsItems}
        // defaultPageIcon={config.defaultPageIcon}
        // defaultPageCover={config.defaultPageCover}
        // defaultPageCoverPosition={config.defaultPageCoverPosition}
        // mapPageUrl={siteMapPageUrl}
        // mapImageUrl={mapImageUrl}
        // searchNotion={config.isSearchEnabled ? searchNotion : null}
        // pageAside={pageAside}
        // footer={footer}
      />
    </>
  );
};
export default NotionPage;
