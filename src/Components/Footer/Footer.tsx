import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';


const Footer = () => {
  const theme = useTheme();

  return (
    <Stack padding={2} flexDirection="row" justifyContent="space-between" sx={{backgroundColor: theme.palette.primary.main}}>
      <Typography color='white'>Footer</Typography>
      <Typography color='white'>2022</Typography>
    </Stack>
  )
}

export default Footer;
