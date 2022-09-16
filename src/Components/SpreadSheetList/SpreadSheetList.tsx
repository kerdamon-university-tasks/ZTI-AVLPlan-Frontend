import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchAllSpreadSheets } from "Api";
import useAuth from "Hooks/useAuth";
import { SpreadSheetListData } from "./types";

const SpreadSheetList = () => {
  const auth = useAuth();
  const {data: spreadSheetComponentList, isLoading: isLoading, isError: isError} = useQuery(['spreadsheets'], async () => {
    const spreadSheets = await fetchAllSpreadSheets();
    console.log(spreadSheets);
    
    const spreadSheetList = new Array<SpreadSheetListData>();
    spreadSheets.forEach(spreadSheet => {
      spreadSheet.avltimelines.forEach(timeline => {
        if(timeline.user === auth.user?.username){
          spreadSheetList.push({
            id: spreadSheet.eventName,
            name: spreadSheet.eventName,
            dateTimeFrom: spreadSheet.dateTimeFrom,
            dateTimeTo: spreadSheet.dateTimeTo
          });
        }
      });
    });

    const spreadSheetComponentList = spreadSheetList.map((spreadSheet: SpreadSheetListData) => (
      <ListItem disablePadding>
        <ListItemButton component="a" href={`/spreadsheet/${spreadSheet.id}`}>
          <ListItemText primary={spreadSheet.name} secondary={`${spreadSheet.dateTimeFrom.getDate()} - ${spreadSheet.dateTimeTo.getDate()} ${spreadSheet.dateTimeFrom.getHours()}:00 - ${spreadSheet.dateTimeTo.getHours()}:00 `} />
        </ListItemButton>
      </ListItem>
    ))
    return spreadSheetComponentList;
  });

  return (
    <div style={{margin: 40}}>
      {
        isLoading ? (
          <Typography variant='h3' color='primary.contrastText'>Loading</Typography>
        ) : (
          isError ? (
            <Typography variant='h3' color='primary.contrastText'>Error</Typography>
          ) : (
            <Box sx={{ width: '40vw', maxWidth: 360, minWidth: 200, bgcolor: 'background.paper' }}>
              <nav>
                <List>
                  {spreadSheetComponentList}
                </List>
              </nav>
            </Box>
          )
        )
      }
    </div>
    )
  }
  
  export default SpreadSheetList;