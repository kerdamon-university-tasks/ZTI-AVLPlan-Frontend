import { Button, Card, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery } from '@tanstack/react-query';
import { fetchSpreadSheet, postTimeline } from "Api";
import AvlSheet from "Components/AvlSheet";
import useTimelineDataContext from "Hooks/useTimelineDataContext";
import AvlEditableTimeline from "Components/AvlTimelines/AvlEditableTimeline";
import AvlSummaryTimeline from "Components/AvlTimelines/AvlSummaryTimeline";
import useIdFromParams from "Hooks/useIdFromParams";
import useAuth from "Hooks/useAuth";
import withAuth from "ContextProviders/AuthProvider/withAuth";

const SpreadSheet = () => {
  const spreadSheetId = useIdFromParams(); 
  const timelineDataContext = useTimelineDataContext();
  const auth = useAuth();
  const {data: spreadsheet, isLoading: isSpreadSheetLoading, isError: isSpreadSheetError} = useQuery(['spreadsheet'], async () => {
    const spreadSheet = await fetchSpreadSheet(spreadSheetId);
    const timeline = spreadSheet.avltimelines.find(timeline => timeline.user === auth.user?.username) // TODO change to logged user
    if(timeline){
      timelineDataContext.setAvlspans(timeline.avlspans);
    }
    timelineDataContext.setDateTimeFrom(spreadSheet.dateTimeFrom);
    timelineDataContext.setDateTimeTo(spreadSheet.dateTimeTo);
    return spreadSheet;
  });

  const handleOnClick = () => {
    postTimeline(spreadSheetId, timelineDataContext.getTimelineData());
  }

  return (
    <div style={{margin: 40}}>
        <Paper sx={{backgroundColor: "primary.main", padding: 3}}>
          <Stack alignItems='center'>
          <Grid container spacing={5}>
            <Grid alignItems='center'>
            {
              isSpreadSheetLoading ? (
                <Typography variant='h3' color='primary.contrastText'>Loading</Typography>
              ) : (
                isSpreadSheetError ? (
                  <Typography variant='h3' color='primary.contrastText'>Error</Typography>
                ) : (
                  <Stack alignItems="center" spacing={5}>
                    <Typography variant='h3' color='primary.contrastText'>Yours availability</Typography>
                    <AvlSheet>
                      <AvlEditableTimeline/>
                    </AvlSheet>
                  </Stack>
                )
              )
            }
            </Grid>
            <Grid>
            {
              isSpreadSheetLoading ? (
                <Typography variant='h3' color='primary.contrastText'>Loading spreadsheet</Typography>
              ) : (
                isSpreadSheetError ? (
                  <Typography variant='h3' color='primary.contrastText'>Error spreadsheet</Typography>
                ) : (
                  <Stack alignItems="center" spacing={5}>
                    <Typography variant='h3' color='primary.contrastText'>Summary availability</Typography>
                    <AvlSheet>
                      <AvlSummaryTimeline avlTimelines={spreadsheet.avltimelines}/>
                    </AvlSheet>
                  </Stack>
                )
              )
            }
            </Grid>
          </Grid>
          <Card color="primary">
            <Button onClick={() => handleOnClick()} variant='outlined'>Prze??lij</Button>
          </Card>
          </Stack>
        </Paper>
    </div>
    )
  }
  
  export default withAuth(SpreadSheet);