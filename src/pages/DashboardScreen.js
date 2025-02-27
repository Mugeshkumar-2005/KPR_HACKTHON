import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventIcon from '@mui/icons-material/Event';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';

import Profile from './Profile';
import Consultation from './Consultation';
import Doctors from './Doctors';
import Appointments from './Appointments';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main Menu',
  },
  {
    segment: 'consultation',
    title: 'Consultation (AI Consultation)',
    icon: <VideoCallIcon />,
  },
  {
    segment: 'doctors',
    title: 'Doctors (Find & Book Doctors)',
    icon: <LocalHospitalIcon />,
  },
  {
    segment: 'appointments',
    title: 'Appointments',
    icon: <EventIcon />,
  },
  {
    segment: 'profile',
    title: 'Profile',
    icon: <AccountCircleIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function RenderPage({ pathname }) {
  switch (pathname) {
    case '/profile':
      return <Profile />;
    case '/consultation':
      return <Consultation />;
    case '/doctors':
      return <Doctors />;
    case '/appointments':
      return <Appointments />;
    default:
      return (
        <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography>Page Not Found</Typography>
        </Box>
      );
  }
}

RenderPage.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardScreen(props) {
  const { window } = props;
  const router = useDemoRouter('/consultation');

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme} window={demoWindow}>
      <DashboardLayout>
        <RenderPage pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardScreen.propTypes = {
  window: PropTypes.func,
};

export default DashboardScreen;