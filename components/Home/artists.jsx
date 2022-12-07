import LOGO from "@/assets/artists.svg";
import LOGO_HOVER from "@/assets/hoverArtists.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
export default function Artists({ data }) {
  const useStyles = makeStyles(() => ({
    content: {
      position: "relative",
      padding: "0px 5px",
      "&:hover": {
        opacity: 0.7,
        "& $icon_hover": {
          width: 50,
          transition: "all 0.5s",
          cursor: "pointer",
        },
      },
    },
    img_gif: {
      height: 200,
      borderRadius: 4,
      cursor: "pointer",
      width: "100%",
    },
    avatar_user: {
      height: 30,
      position: "absolute",
      left: 15,
      bottom: 20,
      zIndex: 10,
      display: "flex",
      "& >img": {
        width: 35,
        height: 35,
        objectFit: "cover",
      },
    },

    info_user: {
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
    icon_hover: {
      width: 0,
      height: 30,
      position: "absolute",
      top: 0,
      right: 0,
      zIndex: 10,
      "&:hover": {
        transform: "scale(1.3)",
      },
    },
    iconNext: {
      right: 10,
      fontSize: 40,
      zIndex: 9,
      color: "rgb(166, 166, 166)",
      "&:hover": {
        color: "#fff !important",
        transition: "color 0.3s ease-in-out",
      },
    },
    iconPrev: {
      left: 15,
      fontSize: 40,
      zIndex: 9,
      color: "rgb(166, 166, 166)",
      "&:hover": {
        color: "#fff !important",
        transition: "color 0.3s ease-in-out",
      },
    },
  }));
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <ArrowForwardIosIcon
        className={clsx(className, classes.iconNext)}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <ArrowBackIosIcon
        className={clsx(className, classes.iconPrev)}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }
  const classes = useStyles();
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    swipeToSlide: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Box mt={2}>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Box width="30px" mr={2}>
            <Image layout="responsive" src={LOGO} alt="logo" />
          </Box>
          <Typography variant="h5" style={{ fontSize: 23, fontWeight: 700 }}>
            Artists
          </Typography>
        </Box>
        <Typography
          variant="subtitle2"
          style={{ color: "rgb(166, 166, 166)", cursor: "pointer" }}
        >
          All GIPHY Artists
        </Typography>
      </Box>

      <Box mt={2}>
        <Slider {...settings}>
          {data?.map((gif) => (
            <Box key={gif.id} className={classes.content}>
              <Image
                src={gif.url}
                alt="logo"
                className={classes.img_gif}
                width={400}
                height={250}
              />

              <Box className={classes.icon_hover}>
                <Image layout="responsive" src={LOGO_HOVER} alt="avatar" />
              </Box>
              <Box className={classes.avatar_user}>
                {gif.user?.avatar_url && (
                  <Image
                    src={gif.user.avatar_url}
                    alt="avatar_user"
                    width={35}
                    height={35}
                  />
                )}
                <Box className={classes.info_user}>
                  <Typography variant="subtitle2">
                    {gif.user?.display_name}
                  </Typography>
                  <Typography variant="body2">
                    @{gif.username}
                    {gif.user?.is_verified && (
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
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}
