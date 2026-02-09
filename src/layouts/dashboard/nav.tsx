import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';
import { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import type { NavItem } from '../nav-config-dashboard';
// import { NavUpgrade } from '../components/nav-upgrade';
// import { WorkspacesPopover } from '../components/workspaces-popover';

// import type { WorkspacesPopoverProps } from '../components/workspaces-popover';

// ----------------------------------------------------------------------

export type NavContentProps = {
  data: NavItem[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  // workspaces: WorkspacesPopoverProps['data'];
  sx?: SxProps<Theme>;
  variant?: 'vertical' | 'horizontal'; // ✅ thêm dòng này
};

export function NavDesktop({
  sx,
  data,
  slots,
  layoutQuery,
}: NavContentProps & { layoutQuery: Breakpoint }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        pt: 2.5,
        px: 2.5,
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        zIndex: 'var(--layout-nav-zIndex)',
        width: 'var(--layout-nav-vertical-width)',
        // width:'15%',
        borderRight: `1px solid ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      <NavContent data={data} slots={slots} />
    </Box>
  );
}

// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
}: NavContentProps & { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: 'unset',
          width: 'var(--layout-nav-mobile-width)',

          /* ✅ ÉP MENU NẰM DỌC */
          '& ul': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: 0.5,
          },

          /* ✅ MỖI ITEM FULL WIDTH */
          '& li': {
            width: '100%',
          },

          /* ✅ CHỮ MÀU ĐEN */
          '& .MuiListItemButton-root': {
            color: '#000',
            justifyContent: 'flex-start',
          },

          '& .MuiListItemButton-root.Mui-selected': {
            color: '#000',
          },
          ...sx,
        },
      }}
    >
      <NavContent data={data} slots={slots} />
    </Drawer>
  );
}

// ----------------------------------------------------------------------

export function NavContent({ data, slots, sx }: NavContentProps) {
  const pathname = usePathname();

  return (
    <>
      <Box
        component="ul"
        sx={{
          m: 0,
          p: 0,
          listStyle: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          flexWrap: 'nowrap', // header thường không wrap
          overflowX: 'auto', // nếu nhiều item thì kéo ngang
          whiteSpace: 'nowrap',
        }}
      >
        {data.map((item) => {
          const isActived = item.path === pathname;

          return (
            <ListItem key={item.title} disableGutters disablePadding sx={{ width: 'auto' }}>
              <ListItemButton
                disableGutters
                component={RouterLink}
                href={item.path}
                sx={(theme) => ({
                  px: 1.5,
                  py: 0.75,
                  gap: 1,
                  borderRadius: 999,
                  minHeight: 36,
                  color: theme.vars.palette.common.white,
                  '&:hover': {
                    bgcolor: varAlpha(theme.vars.palette.common.whiteChannel, 0.15),
                  },
                  ...(isActived && {
                    color: theme.vars.palette.primary.contrastText,
                    bgcolor: varAlpha(theme.vars.palette.primary.main, 0.9),
                  }),
                })}
              >
                <Box component="span" sx={{ width: 20, height: 20, display: 'inline-flex' }}>
                  {item.icon}
                </Box>
                <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
                  {item.title}
                </Box>
              </ListItemButton>
            </ListItem>
          );
        })}
      </Box>

      {/* Code sidebar nằm dọc  */}
      {/* <Scrollbar fillContent>
        <Box
          component="nav"
          sx={[
            {
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        >
          <Box
            component="ul"
            sx={{
              gap: 0.5,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {data.map((item) => {
              const isActived = item.path === pathname;

              return (
                <ListItem disableGutters disablePadding key={item.title}>
                  <ListItemButton
                    disableGutters
                    component={RouterLink}
                    href={item.path}
                    sx={[
                      (theme) => ({
                        pl: 2,
                        py: 1,
                        gap: 2,
                        pr: 1.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        fontWeight: 'fontWeightMedium',
                        color: theme.vars.palette.text.secondary,
                        minHeight: 44,
                        ...(isActived && {
                          fontWeight: 'fontWeightSemiBold',
                          color: theme.vars.palette.primary.main,
                          bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
                          '&:hover': {
                            bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.16),
                          },
                        }),
                      }),
                    ]}
                  >
                    <Box component="span" sx={{ width: 23, height: 23 }}>
                      {item.icon}
                    </Box>

                    <Box component="span" sx={{ flexGrow: 1 }}>
                      {item.title}
                    </Box>

                    {item.info && item.info}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </Box>
        </Box>
      </Scrollbar> */}

      {slots?.bottomArea}

    </>
  );
 
}
