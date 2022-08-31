import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { AVLColumnProps, AvlSheetProps } from "./types";

const AVLAtomicTime = () => {
  return(
    <Box height={8} sx={{
      backgroundColor: '#E8E9EF',
      '&:hover': {
        backgroundColor: 'primary.main',
        opacity: [0.9, 0.8, 0.7],
      },
      borderStyle: 'dashed', borderWidth: 1, borderColor: 'white'
    }}/>
  )
}

const AVLHour = () => {
  return(
    <Stack width={46}>
      <AVLAtomicTime/>
      <AVLAtomicTime/>
      <AVLAtomicTime/>
      <AVLAtomicTime/>
    </Stack>
  )
}

const AVLColumn = ({n}: AVLColumnProps) => {
  return(
    <Stack>
      {Array.from(Array(n)).map((_, index) => (
        <Box>
          <AVLHour/>
        </Box>
      ))}
    </Stack>
  )
}

const AvlSheet = ({ numberOfHours, numberOfDays}: AvlSheetProps) => {
  return (
    <Stack direction="row">
      {Array.from(Array(numberOfDays)).map((_, index) => (
        <AVLColumn n={numberOfHours}/>
      ))}
        
    </Stack>
    );
  }
  
  export default AvlSheet;