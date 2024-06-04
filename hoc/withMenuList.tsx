// hoc/withMenuList.tsx

import React from 'react';
import { NextPage, NextPageContext } from 'next';
import getMenuList from '@/lib/notion/getMenuList';

interface MenuItem {
  id: string;
  name: string;
}

interface WithMenuListProps {
  menuList: MenuItem[];
}

const withMenuList = (WrappedComponent: NextPage<any>) => {
  const WithMenuListComponent: NextPage<WithMenuListProps> = (props) => {
    return <WrappedComponent {...props} />;
  };

  WithMenuListComponent.getInitialProps = async (ctx: NextPageContext) => {
    const menuList = await getMenuList();

    let wrappedProps = {};
    if (WrappedComponent.getInitialProps) {
      wrappedProps = await WrappedComponent.getInitialProps(ctx);
    }

    return { ...wrappedProps, menuList };
  };

  return WithMenuListComponent;
};

export default withMenuList;
