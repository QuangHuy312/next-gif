import LOGO from "@/assets/giphyLogo.png";
import { API_KEY } from "@/constants/config";
import { Search } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Button, Container, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import UtilityApi from "apiClient/utilityApi";
import clsx from "clsx";
import { debounce } from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Header = () => {
  const useStyles = makeStyles(() => ({
    container: {
      padding: "0 80px",
    },
    menu: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexGrow: 1,
      height: "50px",
    },
    menu_background: {
      background:
        "linear-gradient(to right, rgb(0, 204, 255), rgb(153, 51, 255) 31%, rgb(230, 70, 182) 52%, rgb(255, 249, 170) 77%, rgb(0, 255, 153), rgb(0, 204, 255)) 0% 50% / 200% 50%",
    },
    wrapper_menu_button: {
      height: 35,
      display: "flex",
      alignItems: "flex-start",
    },
    menu_button: {
      backgroundColor: "rgb(18, 18, 18)",
      height: 30,
      padding: 10,
      display: "flex",
      alignItems: "center",
      "&:hover": {
        transition: " background 0.25s ease 0s",
        background:
          "linear-gradient(to right, rgb(0, 204, 255), rgb(153, 51, 255) 31%, rgb(230, 70, 182) 52%, rgb(255, 249, 170) 77%, rgb(0, 255, 153), rgb(0, 204, 255)) 0% 50% / 200% 50%",
      },
      "& >p": {
        cursor: "pointer",
      },
    },

    button: {
      background: "linear-gradient(103deg, #6157FF, #7067ff, #6157FF)",
      padding: "10px ",
      color: "#fff !important",
    },

    btn_login: {
      color: "#fff !important",
      margin: "10px",
      textTransform: "initial ",
    },
    btn_avatar: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      fontSize: "30px ",
    },
    content_search: {
      position: "relative",
    },
    input_search: {
      backgroundColor: "#fff",
      color: "#000",
    },
    icon_search: {
      backgroundImage:
        "linear-gradient(45deg, rgb(153, 51, 255) 0%, rgb(255, 102, 102) 50%, rgb(153, 51, 255) 100%)",
      fontSize: "40px",
      height: "auto",
      width: "55px",
      cursor: "pointer",
      "&>div>input": {
        color: "#000",
      },
    },
    autocomplete: {
      backgroundColor: "#fff",
      width: "100%",
      height: 200,
      overflowY: "scroll",
      zIndex: 99,
      position: "absolute",
      bottom: -200,
      left: 0,
    },
    item_autocomplete: {
      padding: "14px 20px",
      color: "#000",
      cursor: "pointer",
    },
  }));
  const classes = useStyles();
  const [valueSearch, setValueSearch] = useState("");
  const [data, setData] = useState([]);
  const router = useRouter();

  const handleSearchChange = debounce((e) => {
    const value = e?.target.value;
    setValueSearch(value);
  }, 500);
  useEffect(() => {
    (async () => {
      try {
        const res = await UtilityApi.searchPoint({
          q: valueSearch,
          api_key: API_KEY,
        });
        setData(res);
      } catch (error) {}
    })();
  }, [valueSearch]);
  return (
    <Container className={classes.container}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Box
          width="100px"
          objectFit="cover"
          mr={2}
          style={{ cursor: "pointer" }}
        >
          <Image
            src={LOGO}
            alt="logo"
            size="20px"
            layout="responsive"
            width="50px"
            height="30px"
            onClick={() => router.push("/")}
          />
        </Box>
        <Box component="nav" className={classes.menu}>
          <Box
            className={clsx(
              classes.wrapper_menu_button,
              classes.menu_background
            )}
          >
            <Box className={classes.menu_button}>
              <Typography>Reactions</Typography>
            </Box>
          </Box>
          <Box
            className={clsx(
              classes.wrapper_menu_button,
              classes.menu_background
            )}
          >
            <Box className={classes.menu_button}>
              <Typography>Entertainment</Typography>
            </Box>
          </Box>
          <Box
            className={clsx(
              classes.wrapper_menu_button,
              classes.menu_background
            )}
          >
            <Box className={classes.menu_button}>
              <Typography>Sports</Typography>
            </Box>
          </Box>
          <Box
            className={clsx(
              classes.wrapper_menu_button,
              classes.menu_background
            )}
          >
            <Box className={classes.menu_button}>
              <Typography>Stickers</Typography>
            </Box>
          </Box>
          <Box
            className={clsx(
              classes.wrapper_menu_button,
              classes.menu_background
            )}
          >
            <Box className={classes.menu_button}>
              <Typography>Artists</Typography>
            </Box>
          </Box>

          <Box
            className={clsx(
              classes.wrapper_menu_button,
              classes.menu_background
            )}
            mr={1}
          >
            <Box className={classes.menu_button}>
              <MoreVertIcon />
            </Box>
          </Box>
        </Box>

        <Box mr={2}>
          <Button className={classes.button} style={{ marginRight: 5 }}>
            Upload
          </Button>
          <Button className={classes.button}>Create</Button>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          bgcolor="rgb(62, 62, 62)"
          position="relative"
          width="120px"
          height="45px"
        >
          <Button
            startIcon={<PermIdentityIcon className={classes.btn_avatar} />}
            className={classes.btn_login}
            disableRipple
          >
            Log in
          </Button>
        </Box>
      </Box>

      <Box display="flex" className={classes.content_search} mt={1}>
        <TextField
          className={classes.input_search}
          placeholder="Search all the GIFS and Stickers"
          fullWidth
          onChange={handleSearchChange}
        />
        <Search className={classes.icon_search} />
        <Box
          className={classes.autocomplete}
          style={{ visibility: data.length > 0 ? "initial" : "hidden" }}
        >
          {data.map((item, index) => (
            <Typography
              variant="subtitle2"
              key={index}
              className={classes.item_autocomplete}
              onClick={() => router.push(`/${item.id}`)}
            >
              {item.title}
            </Typography>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Header;
