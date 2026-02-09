import type { Breakpoint } from '@mui/material/styles';

import { merge } from 'es-toolkit';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { NavMobile, NavContent } from './nav';
import { layoutClasses } from '../core/classes';
import { _account } from '../nav-config-account';
import { dashboardLayoutVars } from './css-vars';
import { navData } from '../nav-config-dashboard';
import { MainSection } from '../core/main-section';
import { MenuButton } from '../components/menu-button';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';
// import { _workspaces } from '../nav-config-workspace';
// import { LanguagePopover } from '../components/language-popover';
import { AccountPopover } from '../components/account-popover';

import type { MainSectionProps } from '../core/main-section';
import type { HeaderSectionProps } from '../core/header-section';
import type { LayoutSectionProps } from '../core/layout-section';

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

export type DashboardLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    main?: MainSectionProps;
  };
};

export function DashboardLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'lg',
}: DashboardLayoutProps) {
  const theme = useTheme();

  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const renderHeader = () => {
    const headerSlotProps: HeaderSectionProps['slotProps'] = {
      container: {
        maxWidth: false,
      },
    };

    // const headerSlots: HeaderSectionProps['slots'] = {
    //   // topArea: (
    //   //   <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
    //   //     This is an info Alert.
    //   //   </Alert>
    //   // ),
    //   leftArea: (
    //     <>

    //       {/* <Logo /> */}
    //       {/** @slot Nav mobile */}
    //     </>
    //   ),
    //   // leftArea: (
    //   //   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 1 }}>
    //   //     {/* Mobile menu button */}
    //   //     <MenuButton
    //   //       onClick={onOpen}
    //   //       sx={{ mr: 1, ml: -1, [theme.breakpoints.up(layoutQuery)]: { display: 'none' } }}
    //   //     />

    //   //     {/* Mobile drawer */}
    //   //     <NavMobile data={navData} open={open} onClose={onClose} />

    //   //     {/* Desktop menu nằm trên header */}
    //   //     <Box
    //   //       sx={{
    //   //         display: 'none',
    //   //         [theme.breakpoints.up(layoutQuery)]: {
    //   //           display: 'flex',
    //   //         },
    //   //       }}
    //   //     >
    //   //       <NavDesktop
    //   //         data={navData}
    //   //         layoutQuery={layoutQuery}
    //   //         sx={{
    //   //           position: 'static', // ⚠️ rất quan trọng
    //   //           width: 'auto',
    //   //           height: 'auto',
    //   //           borderRight: 'none',
    //   //         }}
    //   //       />
    //   //     </Box>
    //   //   </Box>
    //   // ),
    //   rightArea: (
    //     <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, sm: 0.75 } ,m:0,p:0}}>
    //       {/** @slot Searchbar */}

    //       {/* <Searchbar /> */}

    //       {/** @slot Notifications popover */}
    //       {/* <NotificationsPopover data={_notifications} /> */}

    //       {/** @slot Account drawer */}
    //       <AccountPopover data={_account} />
    //     </Box>
    //   ),
    // };
    const headerSlots: HeaderSectionProps['slots'] = {
      leftArea: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 1 }}>
          {/* Mobile menu button */}
          <MenuButton
            onClick={onOpen}
            sx={{ color: 'white', [theme.breakpoints.up(layoutQuery)]: { display: 'none' } }}
          />

          {/* Mobile drawer */}
          <NavMobile data={navData} open={open} onClose={onClose} />

          {/* Desktop menu ngang */}
          <Box
            sx={{
              display: 'none',
              [theme.breakpoints.up(layoutQuery)]: {
                display: 'flex',
                alignItems: 'center',
              },
              alignItems: 'center',
              height: 1,
            }}
          >
            <NavContent data={navData} />
          </Box>
        </Box>
      ),

      rightArea: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccountPopover data={_account} />
        </Box>
      ),
    };
    return (
      <HeaderSection
        disableElevation
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        sx={{
          height: 45,
          position: 'relative',
          backgroundColor: '#0B74DE',

          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            zIndex: -1,
          },
        }}
        slotProps={merge(headerSlotProps, slotProps?.header?.slotProps ?? {})}
        // sx={slotProps?.header?.sx}
      />
      // <Box sx={{ position: 'sticky', top: 0, zIndex: 'appBar' }}>
      //   {/* HÀNG 1 */}
      //   <HeaderSection
      //     disableElevation
      //     layoutQuery={layoutQuery}
      //     slots={headerSlots}
      //     slotProps={merge(headerSlotProps, slotProps?.header?.slotProps ?? {})}
      //   />

      //   {/* HÀNG 2 – menu ngang */}
      //   <>
      //     <MenuButton
      //       onClick={onOpen}
      //       sx={{ mr: 1, ml: 1.5, [theme.breakpoints.up(layoutQuery)]: { display: 'none' } }}
      //     />
      //     <NavMobile data={navData} open={open} onClose={onClose} />
      //   </>

      //   <Box
      //     sx={{
      //       display: 'none',
      //       [theme.breakpoints.up(layoutQuery)]: { display: 'flex' },
      //       alignItems: 'center',
      //       px: 2,
      //       height: 44,
      //       bgcolor: '#0B74DE',
      //     }}
      //   >
      //     <NavContent data={navData} />
      //   </Box>
      // </Box>
    );
  };

  const renderFooter = () => null;

  const renderMain = () => <MainSection {...slotProps?.main}>{children}</MainSection>;

  return (
    <LayoutSection
      /** **************************************
       * @Header
       *************************************** */
      headerSection={renderHeader()}
      /** **************************************
       * @Sidebar
       *************************************** */
      // sidebarSection={
      //   <NavDesktop data={navData} layoutQuery={layoutQuery}  />
      // }
      /** **************************************
       * @Footer
       *************************************** */
      footerSection={renderFooter()}
      /** **************************************
       * @Styles
       *************************************** */
      cssVars={{ ...dashboardLayoutVars(theme), ...cssVars }}
      sx={[
        {
          [`& .${layoutClasses.sidebarContainer}`]: {
            [theme.breakpoints.up(layoutQuery)]: {
              // pl: 'var(--layout-nav-vertical-width)', sidebar nằm dọc
              transition: theme.transitions.create(['padding-left'], {
                easing: 'var(--layout-transition-easing)',
                duration: 'var(--layout-transition-duration)',
              }),
            },
          },
          // ✅ nếu bạn dùng MUI Container (DashboardContent) gây thụt
          '& .MuiContainer-root': {
            paddingLeft: 2,
            paddingRight: 1,
            maxWidth: '100%',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {renderMain()}
    </LayoutSection>
  );
}
