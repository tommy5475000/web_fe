import path from 'path';

import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
  children?: {
    title: string;
    path: string;
    icon?: string;
  }[];
};

export const navData = [
  {
    title: 'Home',
    path: '/',
    icon: icon('ic-benthanh'),
  },
  {
    title: 'Báo cáo',
    path: '#',
    icon: icon('ic-baocao'),
    children: [
       {title: 'Tổng quan', path: '/tong-quan', icon: 'ic-report' },
      //  {title: 'Doanh thu', path: '/doanhthu', icon: 'ic-bctq' }
      ],
  },
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
  //   title: 'Invoice IT',
  //   path: '/invoice-it',
  //   icon: icon('ic-invoice'),
  // },
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
