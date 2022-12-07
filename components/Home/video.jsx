import LOGO from "@/assets/clips.svg";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Image from "next/image";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LOADING from "@/assets/loading.gif";

export default function Videos({ data }) {
  const useStyles = makeStyles(() => ({
    img_gif: {
      borderRadius: 4,
      cursor: "pointer",
      objectFit: "cover",
    },
    infoUser: {
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      "& >img": {
        width: 25,
        height: 25,
        objectFit: "cover",
      },
    },

    title: {
      marginLeft: 6,
      "& >h6": {
        fontWeight: 600,
        fontSize: 14,
      },
      "& >p": {
        fontSize: 12,
        padding: 0,
        display: "flex",
        alignItems: "center",
      },
    },
  }));
  const classes = useStyles();
  return (
    <Box mt={2} mb={3}>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Box width="30px" mr={2}>
            <Image layout="responsive" src={LOGO} alt="logo" />
          </Box>
          <Typography variant="h5" style={{ fontSize: 23, fontWeight: 700 }}>
            Clips
          </Typography>
        </Box>
        <Typography
          variant="subtitle2"
          style={{ color: "rgb(166, 166, 166)", cursor: "pointer" }}
        >
          All Clips
        </Typography>
      </Box>

      <Grid container mt={1} spacing={2}>
        <Grid item xs={8}>
          <Image
            src={data[0]?.url || LOADING}
            alt="clip"
            width={700}
            height={480}
            className={classes.img_gif}
          />
          <Typography
            variant="subtitle2"
            style={{ fontSize: 16, fontWeight: 600, marginBottom: 5 }}
          >
            {data[0]?.title}
          </Typography>
          <Box className={classes.infoUser}>
            {data[0]?.user?.avatar_url && (
              <Image
                src={data[0]?.user?.avatar_url}
                alt="infoUser"
                width={25}
                height={25}
              />
            )}
            <Box className={classes.title}>
              <Typography variant="subtitle2">
                {data[0]?.user?.display_name}{" "}
                {data[0]?.user?.is_verified && (
                  <CheckCircleIcon
                    style={{
                      fontSize: 15,
                      color: "blue",
                      marginLeft: 5,
                    }}
                  />
                )}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Image
            src={data[1]?.url || LOADING}
            alt="clip"
            height={290}
            width={500}
            className={classes.img_gif}
          />
          <Typography
            variant="subtitle2"
            style={{ fontSize: 16, fontWeight: 600, marginBottom: 5 }}
          >
            {data[1]?.title}
          </Typography>
          <Box className={classes.infoUser} mb={3}>
            {data[1]?.user?.avatar_url && (
              <Image
                src={data[1]?.user?.avatar_url}
                alt="infoUser"
                width={25}
                height={25}
              />
            )}
            <Box className={classes.title}>
              <Typography variant="subtitle2">
                {data[1]?.user?.display_name}{" "}
                {data[1]?.user?.is_verified && (
                  <CheckCircleIcon
                    style={{
                      //   backgroundColor: "blue",
                      fontSize: 15,
                      color: "blue",
                      marginLeft: 5,
                    }}
                  />
                )}
              </Typography>
            </Box>
          </Box>
          <Image
            src={data[2]?.url || LOADING}
            alt="clip"
            height={290}
            width={500}
            className={classes.img_gif}
          />
          <Typography
            variant="subtitle2"
            style={{ fontSize: 16, fontWeight: 600, marginBottom: 5 }}
          >
            {data[2]?.title}
          </Typography>
          <Box className={classes.infoUser}>
            {data[2]?.user?.avatar_url && (
              <Image
                src={data[2]?.user?.avatar_url}
                alt="infoUser"
                width={25}
                height={25}
              />
            )}
            <Box className={classes.title}>
              <Typography variant="subtitle2">
                {data[2]?.user?.display_name}{" "}
                {data[2]?.user?.is_verified && (
                  <CheckCircleIcon
                    style={{
                      //   backgroundColor: "blue",
                      fontSize: 15,
                      color: "blue",
                      marginLeft: 5,
                    }}
                  />
                )}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
