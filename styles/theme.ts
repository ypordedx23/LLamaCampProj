import { createTheme, ThemeOptions } from "@mui/material/styles"

export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: "#001D56",
        },
        secondary: {
            main: "#001D56"
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "50vw",
                    textTransform: "none",
                    fontWeight: 600
                }
            },
            defaultProps: {
                size: 'small',
                color: 'primary',
                variant: 'contained',
                disableElevation: true,
                disableRipple: true,
            }
        },
        MuiTextField: {
            defaultProps: {
                variant: "outlined",
                size: "small",
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8
                }
            },
            defaultProps: {
                size: "small"
            }
        },
        MuiIcon: {
            defaultProps: {
                fontSize: "small"
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderLeft: 'none',
                    borderRight: 'none'
                }
            }
        }
    },
    typography: {
        fontFamily: 'Montserrat',
        fontSize: 14,
    },
}

const theme = createTheme(themeOptions)

export default theme