import BANNER from "@/assets/banner.gif";
import LOADING from "@/assets/loading.gif";
import Artists from "@/components/Home/artists";
import Stories from "@/components/Home/stories";
import Trending from "@/components/Home/trending";
import Videos from "@/components/Home/video";
import { API_KEY } from "@/constants/config";
import { Box, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import UtilityApi from "apiClient/utilityApi";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import MainLayout from "../components/layout/main";

// const Trending = dynamic(() => import("../components/Home/trending"), {
//   ssr: false,
// });
// const Stories = dynamic(() => import("../components/Home/stories"), {
//   ssr: false,
// });
// const Artists = dynamic(() => import("../components/Home/artists"), {
//   ssr: false,
// });
// const Videos = dynamic(() => import("../components/Home/video"), {
//   ssr: false,
// });

const Home = ({
  dataTrending,
  dataArtists,
  dataStories,
  dataVideoTrending,
}) => {
  const useStyles = makeStyles(() => ({
    container: {
      padding: "0px 80px",
      position: "relative",
    },
    loading: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      "& >img": {
        width: 80,
        height: 80,
      },
    },
  }));
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Box>
        <Image src={BANNER} alt="clip_carousel" layout="responsive" />
      </Box>
      <Box mb={4}>
        <Trending data={dataTrending} />
      </Box>
      <Box mb={4}>
        <Artists data={dataArtists} />
      </Box>
      <Box mb={4}>
        <Videos data={dataVideoTrending} />
      </Box>

      <Box mb={4}>
        <Stories dataStories={dataStories} />
      </Box>
    </Container>
  );
};

Home.Layout = MainLayout;

export async function getServerSideProps() {
  const resDataTrending = await UtilityApi.trendingPoint({
    api_key: API_KEY,
    limit: 50,
  });

  const resDataArtists = await UtilityApi.searchPoint({
    api_key: API_KEY,
    q: "artists",
    limit: 30,
  });
  const resVideo = await UtilityApi.videoTrending({
    api_key: API_KEY,
    limit: 3,
  });
  const resDataStories = await UtilityApi.searchPoint({
    api_key: API_KEY,
    limit: 20,
    q: "stories",
  });
  return {
    props: {
      dataTrending: resDataTrending.map((item) => ({
        id: item.id,
        url: item?.images?.fixed_height?.url,
        avatar_url: item?.user?.avatar_url || null,
      })),
      dataArtists: resDataArtists.map((item) => ({
        id: item.id,
        url: item?.images?.fixed_height?.url,
        user: item?.user || null,
      })),
      dataVideoTrending: resVideo.map((item) => ({
        url: item?.images?.fixed_height?.url,
        user: item?.user || null,
      })),
      dataStories: resDataStories.map((item) => ({
        url: item?.images?.fixed_height?.url,
        user: item?.user || null,
      })),
    },
  };
}

export default Home;
