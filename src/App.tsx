import Stack from '@mui/material/Stack';
import { Route, Routes } from 'react-router-dom';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Navbar from './Components/Navbar';
import Footer from 'Components/Footer';
import { useTheme } from '@mui/material/styles';
import Sheet from 'Pages/Sheet';
import TimelineDataProvider from 'ContextProviders/TimelineDataProvider';
import NewSpreadSheet from 'Pages/NewSpreadSheet';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

function App() {
  const theme = useTheme();
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Stack sx={{minHeight: '100vh'}}>
        <Navbar />
        <Stack alignItems='baseline' justifyContent='center' direction='row' sx={{ flex: 1, backgroundColor: theme.palette.primary.dark }}>
          <Pages/>
        </Stack>
        <Footer />
      </Stack>
    </LocalizationProvider>
  );
}

const Pages = () => {
  return(
    <TimelineDataProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/timeline/:id" element={<Sheet />} />
        <Route path="/new-spreadsheet/" element={<NewSpreadSheet />} />
      </Routes>
    </TimelineDataProvider>
  )
}

export default App;
