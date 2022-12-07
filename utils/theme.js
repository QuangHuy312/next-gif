import { responsiveFontSizes, createTheme } from "@mui/material/styles";

export let theme = createTheme({
    components: {
        MuiUseMediaQuery: {
            defaultProps: {
                noSsr: true,
            },
        },
    },

    typography: {
        fontFamily: 'Inter, sans-serif',
    },

})

theme = responsiveFontSizes(theme)
