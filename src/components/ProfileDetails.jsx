import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  DialogContent,
  DialogActions,
  CardMedia,
  Card,
  CardActionArea,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import EditableTable from './EditableTable';

export default function ProfileDetails({ profile, isOpen, toggleDialog }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleSubmit = (skills) => {
    toggleDialog(false);
    const changedProfile = profile;
    changedProfile.skills =skills
    updateProfile(changedProfile);
  };

  const updateProfile = async (profile) => {
    const payload = JSON.stringify(profile)
    await fetch(`${import.meta.env.VITE_API_URL}/users/${profile.id}`,{method: 'PATCH',body:payload})
  };


  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={handleSubmit}
        aria-labelledby="responsive-dialog-title"
        fullWidth={true}
        maxWidth={"lg"}
      >
        <DialogTitle id="responsive-dialog-title">{"Edit Profle"}</DialogTitle>
        <DialogContent>
          <Box sx={{p:3}}>
            <Grid container columns={12} spacing={4}>
              <Grid item xs={4}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="100%"
                      image={profile?.avatar}
                      alt={profile?.name}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={8}>
                <Grid container columns={12} spacing={4}>
                  <Grid item xs={12}>
                    <EditableTable  rows={profile?.skills} onSubmit={handleSubmit}/>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
