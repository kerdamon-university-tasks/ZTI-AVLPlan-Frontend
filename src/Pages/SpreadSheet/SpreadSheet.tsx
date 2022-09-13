import { Button, Card, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery } from '@tanstack/react-query';
import { fetchSpreadSheet, fetchTimeline, postTimeline } from "Api";
import { useParams } from "react-router-dom";
import AvlSheet from "Components/AvlSheet";
import useTimelineDataContext from "Hooks/useTimelineDataContext";
import AvlEditableTimeline from "Components/AvlTimelines/AvlEditableTimeline";
import AvlSummaryTimeline from "Components/AvlTimelines/AvlSummaryTimeline";

const SpreadSheet = () => {
  let {id} = useParams();  
  const timelineDataContext = useTimelineDataContext();

  const {data: spreadsheet, isLoading: isSpreadSheetLoading, isError: isSpreadSheetError} = useQuery(['spreadsheet'], async () => {
    const spreadSheet = await fetchSpreadSheet("631ff5f1c2cf1146fbe0618b");
    const timeline = spreadSheet.avltimelines[0];
    timelineDataContext.setDateTimeFrom(timeline.dateTimeFrom);
    timelineDataContext.setDateTimeTo(timeline.dateTimeTo);
    timelineDataContext.setUser(timeline.user);
    timelineDataContext.setAvlspans(timeline.avlspans);
    return spreadSheet;
  });

  const handleOnClick = () => {
    postTimeline(timelineDataContext.getTimelineData());
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
                    <Typography variant='h3' color='primary.contrastText'>Twoja Dostępność</Typography>
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
                    <Typography variant='h3' color='primary.contrastText'>Zbiorowa Dostępność</Typography>
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
            <Button onClick={() => handleOnClick()} variant='outlined'>Prześlij</Button>
          </Card>
          </Stack>
        </Paper>
    </div>
    )
  }
  
  export default SpreadSheet;