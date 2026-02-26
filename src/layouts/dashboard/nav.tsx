import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useState, useEffect } from 'react';
import { varAlpha } from 'minimal-shared/utils';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuItem, setMenuItem] = useState<any>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (item: any) => (event: React.MouseEvent<HTMLElement>) => {
    if (item.children) {
      setAnchorEl(event.currentTarget);
      setMenuItem(item);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuItem(null);
  };
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
          // overflowX: 'auto', // nếu nhiều item thì kéo ngang
          whiteSpace: 'nowrap',
        }}
      >
        {/* {data.map((item) => {
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
        })} */}
        {data.map((item) => (
          <ListItem key={item.title} disableGutters disablePadding sx={{ width: 'auto' }}>
            <ListItemButton
              disableGutters
              component={item.children ? 'div' : RouterLink}
              {...(!item.children && { href: item.path })}
              onMouseEnter={handleOpen(item)}
              sx={(theme) => ({
                px: 1.2,
                py: 0.4,
                gap: 1,
                borderRadius: 999,
                minHeight: 28,
                color: theme.vars.palette.common.white,
                '&:hover': {
                  bgcolor: varAlpha(theme.vars.palette.common.whiteChannel, 0.15),
                },
              })}
            >
              <Box sx={{ width: 20, height: 20 }}>{item.icon}</Box>
              <Box>{item.title}</Box>
            </ListItemButton>
          </ListItem>
        ))}
      </Box>
      {/* 🔥 DROPDOWN MENU */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          onMouseLeave: handleClose,
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 2,
            minWidth: 180,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            p: 0.5,
          },
        }}
      >
        {menuItem?.children?.map((child: any) => {
          const activeChild = pathname === child.path;

          return (
            <MenuItem
              key={child.title}
              component={RouterLink}
              href={child.path}
              onClick={handleClose}
              sx={{
                borderRadius: 1.5,
                px: 1.5,
                py: 1,
                fontSize: 13,
                gap: 1.2,
                fontWeight: 500,
                minHeight: 32,
                ...(activeChild && {
                  bgcolor: 'primary.main',
                  color: '#fff',
                  '&:hover': { bgcolor: 'primary.main' },
                }),
              }}
            >
              {/* icon child */}
              {child.icon && (
                <Box sx={{ width: 18, height: 18 }}>
                  <img src={`/assets/icons/navbar/${child.icon}.svg`} width={18} />
                </Box>
              )}

              {child.title}
            </MenuItem>
          );
        })}
      </Menu>
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
