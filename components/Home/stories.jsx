import LOGO from "@/assets/stories.svg";
import { API_KEY } from "@/constants/config";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import UtilityApi from "apiClient/utilityApi";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function Stories({ dataStories }) {
  const useStyles = makeStyles(() => ({
    img_gif: {
      height: 200,
      borderRadius: 4,
      cursor: "pointer",
      width: "100%",
      objectFit: "cover",
    },
    title: {},
    first_grid: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr",
      gap: 10,
      marginBottom: 10,
    },
    second_grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 2fr",
      gap: 10,
      marginBottom: 10,
    },
    third_grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      gap: 10,
      marginBottom: 10,
    },
    four_grid: {
      display: "grid",
      gridTemplateColumns: "1fr 2fr 1fr",
      gap: 10,
      marginBottom: 10,
    },
    last_grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      gap: 10,
      marginBottom: 10,
    },
    content_title: {
      height: 250,
      overflow: "hidden",
      position: "relative",
      "&:hover": {
        "& $content_avatar": {
          "& >span >img": {
            transform: "scale(1.2)",
            transition: "transform 0.3s linear",
          },
        },
      },
    },
    image: {
      width: "100%",
      objectFit: "cover",
      borderRadius: 6,
      height: "100%",
      cursor: "pointer",
      "&:hover": {
        transform: "scale(1.2)",
        transition: "transform 0.3s linear",
      },
    },
    title: {
      fontWeight: 600,
      fontSize: 14,
      position: "absolute",
      bottom: 5,
      left: 10,
      zIndex: 99,
    },
    content_avatar: {
      width: 50,
      height: 50,
      position: "absolute",
      top: 10,
      left: 10,
      zIndex: 99,
    },
    line_purple: {
      background: "rgb(150 62 214)",
      height: 6,
      margin: "0 8px",
    },

    line_green: {
      background: "rgb(84 220 138)",
      height: 6,
      margin: "0 8px",
    },

    line_turquoise: {
      background: "rgb(0, 204, 255)",
      height: 6,
      margin: "0 8px",
    },

    "@keyframes dots": {
      "50%": {
        opacity: 0,
        transform: "transcale(0.7)",
      },
    },

    dotsLoading: {
      marginBottom: 10,
      "& >span": {
        width: 15,
        height: 15,
        margin: "0 7px",
        backgroundColor: "rgb(150 62 214)",
        borderRadius: "50%",
        display: "inline-block",
        animation: "$dots 0.8s infinite ease-in-out",
      },
      "& >span:nth-child(2)": {
        backgroundColor: "rgb(84 220 138)",
        animationDelay: "0.2s",
      },
      "& >span:nth-child(3)": {
        backgroundColor: "rgb(0, 204, 255)",
        animationDelay: "0.4s",
      },
    },
  }));

  const getColorBorder = () => {
    const arrColor = ["purple", "green", "turquoise"];
    const randomColor = Math.floor(Math.random() * 4);
    return arrColor[randomColor];
  };
  const ref = useRef();
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renderItem, setRenderItem] = useState(1);
  useEffect(() => {
    setData(dataStories);
  }, [dataStories]);

  const getRandom = () => {
    const randomIdx = Math.floor(Math.random() * data.length);
    const randomGiphy = data[randomIdx];
    if (randomGiphy) {
      return randomGiphy;
    }
  };

  const gridConfig = [
    ["first_grid", 3],
    ["second_grid", 3],
    ["third_grid", 4],
    ["four_grid", 3],
    ["last_grid", 4],
  ];
  const GiphyTitle = ({ item }) => {
    const color = getColorBorder();
    const classColor =
      color === "purple"
        ? classes.line_purple
        : color === "green"
        ? classes.line_green
        : classes.line_turquoise;
    return (
      <Box height="300px">
        <Box className={classes.content_title}>
          <Typography variant="subtitle2" className={classes.title}>
            {item?.title}
          </Typography>
          {item?.user?.avatar_url && (
            <Box className={classes.content_avatar}>
              <Image src={item?.user?.avatar_url} alt="avatar" layout="fill" />
            </Box>
          )}
          <Box className={classes.image}>
            {item?.url && (
              <Image
                src={
                  item.url.includes(".gif")
                    ? item?.url
                    : item.images.downsized.url
                }
                alt="gif"
                layout="fill"
              />
            )}
          </Box>
        </Box>
        <Box>
          <Box className={classColor}></Box>
          <Box className={classColor} style={{ margin: "0 14px" }}></Box>
          <Box className={classColor} style={{ margin: "0 20px" }}></Box>
        </Box>
      </Box>
    );
  };

  const CreateTitle = (number) => {
    let titles = [];
    for (let i = 0; i < number; i++) {
      titles.push(<GiphyTitle item={getRandom()} key={i} />);
    }
    return titles;
  };

  const fetchMoreData = async () => {
    setLoading(true);
    try {
      const res = await UtilityApi.searchPoint({
        api_key: API_KEY,
        q: "stories",
        limit: 20,
        offset: data.length,
      });
      setRenderItem(renderItem + 1);
      setData([...data, ...res]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (loading) return;
    const handleFetchData = () => {
      if (
        ref.current.clientHeight + ref.current.offsetTop <=
        window.innerHeight + window.scrollY
      ) {
        fetchMoreData();
      }
    };
    window.addEventListener("scroll", handleFetchData);
    return () => {
      window.removeEventListener("scroll", handleFetchData);
    };
  }, [loading, fetchMoreData]);

  return (
    <Box mt={4} ref={ref} position="relative" mb={2}>
      <Box display="flex" mb={2}>
        <Box width="30px" mr={2}>
          <Image layout="responsive" src={LOGO} alt="logo" />
        </Box>
        <Typography variant="h5" style={{ fontSize: 23, fontWeight: 700 }}>
          Stories
        </Typography>
      </Box>

      {Array.from(new Array(renderItem)).map((item, idx) => (
        <Box key={idx}>
          {gridConfig.map(([layout, numberTitle], index) => {
            const title = CreateTitle(numberTitle);
            const classname =
              layout === "first_grid"
                ? classes.first_grid
                : layout === "second_grid"
                ? classes.second_grid
                : layout === "third_grid"
                ? classes.third_grid
                : layout === "four_grid"
                ? classes.four_grid
                : classes.last_grid;
            return (
              <Box className={classname} key={index}>
                {title}
              </Box>
            );
          })}
        </Box>
      ))}
      {loading && (
        <div className={classes.dotsLoading}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </Box>
  );
}
