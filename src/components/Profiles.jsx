import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Box,
  Chip
} from "@mui/material";
import ProfileDetails from './ProfileDetails';

function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(false);

  const toggleDialog = useCallback((isOpen) => {
      setOpen(isOpen);
      if(!isOpen){
        setSelectedProfile(null);
      }
  },[]);

  const getProfiles = () => {
    fetch(`${import.meta.env.VITE_API_URL}/users`)
      .then((res) => res.json())
      .then((data) => {
        setProfiles(data);
      }).catch(err => {
        console.log(err);
        setProfiles([])
      });
  };

  const editProfile = item => {
    toggleDialog(true);
    setSelectedProfile(item)
  }

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <>
    <Box sx={{ display:'flex',alignItems: "center", justifyContent: "center" , m:'50px'}}>
      <Grid container spacing={4} columns={12}>
        {profiles.map((item) => {
          return (
            <Grid key={item.id} item xs={4}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.avatar}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.email}
                    </Typography>
                    <Box sx={{display:'flex',gap:1,my:2}}>
                    {item.skills.map((item) =>  <Chip key={item} label={item.skill} color="primary" variant="outlined" />)}
                    </Box>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => editProfile(item)}>
                    Edit Profile
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
    <ProfileDetails profile={selectedProfile} toggleDialog={toggleDialog} isOpen={open}/>
    </>
  );
}

export default Profiles;
