import { Box, Stack } from "@mui/material"
import { AVLRowColumnProps } from "./types"

export const rowHeight = 40
export const columnWidth = 46

export const AVLColumn = ({n, children}: AVLRowColumnProps) => {
  return(
    <Stack>
      {Array.from(Array(n)).map((_, index) => (
        <Box>
          {children}
        </Box>
      ))}
    </Stack>
  )
}

export const AVLRow = ({n, children}: AVLRowColumnProps) => {
  return(
    <Stack direction='row'>
      {Array.from(Array(n)).map((_, index) => (
        <Box>
          {children}
        </Box>
      ))}
    </Stack>
  )
}