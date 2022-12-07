import LOGO from "@/assets/trending.svg";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import clsx from "clsx";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function Trending({ data }) {
  const useStyles = makeStyles(() => ({
    content: {
      position: "relative",
      padding: "0px 3px",
      "&:hover": {
        "& $avatar_user": {
          width: 30,
          transition: "all 0.3s ease-in-out",
          cursor: "pointer",
        },
        "& $icon_copy": {
          width: 20,
          transition: "all 0.5s",
          cursor: "pointer",
        },
      },
    },
    img_gif: {
      height: 130,
      borderRadius: 4,
      cursor: "pointer",
      width: "100%",
    },
    avatar_user: {
      width: 0,
      height: 30,
      position: "absolute",
      left: 10,
      bottom: 10,
      zIndex: 10,
    },

    icon_copy: {
      width: 0,
      height: 30,
      position: "absolute",
      top: 10,
      right: 10,
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
    notify: {
      position: "fixed",
      overflow: "hidden",
      zIndex: "99",
      height: open ? "50px" : "0px",
      right: "0px",
      left: "0px",
      top: " 0px",
      backgroundColor: "rgb(0, 255, 153)",
      width: "100%",
      margin: "0 auto",
      textAlign: "center",
      transition: "height 0.3s ease-in-out",
      "& >h6": {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 16,
      },
    },
  }));
  const [open, setOpen] = useState(false);
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
  const classes = useStyles({ open });
  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    swipeToSlide: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const handleClickCopy = (url) => {
    setOpen(true);
    navigator.clipboard.writeText(url);
  };
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  }, [open]);
  return (
    <Box mt={2}>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Box width="30px" mr={2}>
            <Image layout="responsive" src={LOGO} alt="logo" />
          </Box>
          <Typography variant="h5" style={{ fontSize: 23, fontWeight: 700 }}>
            Trending
          </Typography>
        </Box>
        <Typography
          variant="subtitle2"
          style={{ color: "rgb(166, 166, 166)", cursor: "pointer" }}
        >
          All The GIFs
        </Typography>
      </Box>

      <Box mt={2}>
        <Slider {...settings}>
          {data.map((gif) => (
            <Box key={gif.id} className={classes.content}>
              <Image
                src={gif.url}
                alt="logo"
                height={200}
                width={200}
                className={classes.img_gif}
              />
              {gif.avatar_url && (
                <Box className={classes.avatar_user}>
                  <Image src={gif.avatar_url} alt="avatar" layout="fill" />
                </Box>
              )}
              <CopyAllIcon
                className={classes.icon_copy}
                onClick={() => handleClickCopy(gif.url)}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      <Box className={classes.notify}>
        <Typography variant="subtitle2">Link copied to clipboard!</Typography>
      </Box>
    </Box>
  );
}
