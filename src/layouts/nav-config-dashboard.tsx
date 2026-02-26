import path from 'path';
import { title } from 'process';

import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
  children?:{
    title:string;
    path:string;
    icon?:string;
  }[]
};

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
    // children: [{ title: 'Báo cáo quản trị', path: '/user' }],
  },
  // {
  //   title: 'Invoice IT',
  //   path: '/invoice-it',
  //   icon: icon('ic-invoice'),
  // },
  {
    title: 'Admin',
    path: '#',
    icon: icon('ic-admin'),
    children: [
      { title: 'User', path: '/user', icon: 'ic-user' },
      { title: 'Dashboard Admin', path: '/dashboard-admin', icon: 'ic-admin' },
    ],
  },
  // {
  //   title: 'Product',
  //   path: '/products',
  //   icon: icon('ic-cart'),
  //   info: (
  //     <Label color="error" variant="inverted">
  //       +3
  //     </Label>
  //   ),
  // },
  // {
  //   title: 'Blog',
  //   path: '/blog',
  //   icon: icon('ic-blog'),
  // },
  // {
  //   title: 'Sign in',
  //   path: '/sign-in',
  //   icon: icon('ic-lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic-disabled'),
  // },
];
