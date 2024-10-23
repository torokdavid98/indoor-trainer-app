import { createTheme } from '@mui/material';

const THEME_FONT = "'proxima-nova', sans-serif";

const theme = () => {
    const BASE_COLORS = {
        DARK_BACKGROUND: '#1D3557',
        MEDIUM_RED_BACKGROUND: '#E63946',
        LIGHT_BACKGROUND: '#edf2f4',
        GREY_TEXT: '#191919',
        LIGHT_BORDER_COLOR: '#8d99ae',
        PAPER_BACKGROUND: '#FFFFFF',
    };

    const t = createTheme({
        palette: {
            primary: {
                main: BASE_COLORS.DARK_BACKGROUND,
            },
            background: {
                default: BASE_COLORS.LIGHT_BACKGROUND,
            },
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: BASE_COLORS.GREY_TEXT,
                        '& .MuiSvgIcon-root': {
                            color: `${BASE_COLORS.LIGHT_BACKGROUND} !important`,
                        },
                    },
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        backgroundColor: BASE_COLORS.PAPER_BACKGROUND,
                        '& .MuiSvgIcon-root': {
                            color: `${BASE_COLORS.GREY_TEXT} !important`,
                        },
                    },
                },
            },
            MuiTextField: {
                defaultProps: {
                    variant: 'standard',
                },
            },
            MuiSelect: {
                defaultProps: {
                    variant: 'standard',
                },
                styleOverrides: {
                    root: {
                        '&:after': {
                            borderBottom: `1px solid ${BASE_COLORS.DARK_BACKGROUND}`,
                        },
                    },
                },
            },
            MuiChip: {
                defaultProps: {
                    variant: 'filled',
                },
                styleOverrides: {
                    root: {
                        lineHeight: '1.5rem',
                    },
                },
            },
            MuiDivider: {
                styleOverrides: {
                    root: {
                        '&:after, &:before': {
                            borderWidth: 8,
                            borderColor: BASE_COLORS.LIGHT_BACKGROUND,
                            top: -4,
                        },
                        '& .MuiChip-root': {
                            alignSelf: 'center',
                            aspectRatio: '1',
                        },
                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    shrink: {
                        transform: 'translate(0px, 0px) scale(0.75)',
                        '&.MuiInputLabel-outlined.MuiInputLabel-sizeSmall': {
                            transform: 'translate(14px, -9px) scale(0.75)',
                        },
                    },
                    root: {
                        '&.Mui-focused': {
                            color: BASE_COLORS.DARK_BACKGROUND,
                        },
                    },
                },
            },
            MuiToolbar: {
                styleOverrides: {
                    root: {
                        borderBottomWidth: 0,
                    },
                },
            },
            MuiAvatar: {
                styleOverrides: {
                    root: {
                        borderColor: BASE_COLORS.LIGHT_BACKGROUND,
                        borderWidth: 1,
                        borderStyle: 'solid',
                    },
                },
            },
            MuiGrid: {
                defaultProps: {
                    spacing: 1,
                },
            },
            MuiSwitch: {
                styleOverrides: {
                    root: {
                        padding: 8,
                        '& .MuiSwitch-track': {
                            borderRadius: 22 / 2,
                            '&::before, &::after': {
                                content: '""',
                                position: 'absolute',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: 16,
                                height: 16,
                            },
                            '&::before': {
                                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                                    BASE_COLORS.LIGHT_BACKGROUND
                                )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
                                left: 12,
                            },
                            '&::after': {
                                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                                    BASE_COLORS.LIGHT_BACKGROUND
                                )}" d="M19,13H5V11H19V13Z" /></svg>')`,
                                right: 12,
                            },
                        },
                        '& .MuiSwitch-thumb': {
                            boxShadow: 'none',
                            width: 16,
                            height: 16,
                            margin: 2,
                        },
                    },
                },
            },
            MuiTable: {
                styleOverrides: {
                    root: {
                        backgroundColor: BASE_COLORS.LIGHT_BACKGROUND,
                    },
                },
            },
            MuiTableBody: {
                styleOverrides: {
                    root: {
                        background: 'white',
                    },
                },
            },
            MuiLinearProgress: {
                styleOverrides: {
                    root: {
                        borderRadius: '16px 16px 16px 16px',
                    },
                },
            },
            MuiDialogTitle: {
                styleOverrides: {
                    root: {
                        width: '100%',
                        borderRadius: '8px 8px 0 0',
                        fontWeight: '300',
                        fontSize: '2.157142857142857rem',
                        lineHeight: '1.235',
                    },
                },
            },
            MuiAutocomplete: {
                styleOverrides: {
                    groupLabel: {
                        lineHeight: 1.5,
                    },
                },
            },
            MuiBackdrop: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        borderWidth: 0,
                        borderRadius: 0,
                    },
                },
            },
            MuiTableHead: {
                styleOverrides: {
                    root: {
                        backgroundColor: BASE_COLORS.LIGHT_BACKGROUND,
                        color: BASE_COLORS.DARK_BACKGROUND,
                    },
                },
            },
            MuiTableRow: {
                styleOverrides: {
                    root: {
                        borderBottom: `4px solid ${BASE_COLORS.LIGHT_BACKGROUND}`,
                        '&.editedTableRow': {},
                        '&.removeBorderBottom': {
                            borderBottom: '0px',
                            '& .MuiTableCell-root': {
                                borderBottom: '0px',
                            },
                        },
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    head: {
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        padding: 8,
                    },
                    body: {
                        border: 'none',
                        padding: '8px',
                        '& p': {
                            margin: 0,
                        },
                        '&.nowrap': {
                            whiteSpace: 'nowrap',
                        },
                    },
                },
            },
            MuiButtonBase: {
                defaultProps: {
                    disableRipple: true,
                },
            },
            MuiIconButton: {
                defaultProps: {
                    variant: 'contained',
                },
                styleOverrides: {
                    root: {
                        borderRadius: '50%',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    text: {
                        borderRadius: 8,
                        color: BASE_COLORS.DARK_BACKGROUND,
                    },
                    root: {
                        textTransform: 'none',
                        borderRadius: 8,
                        padding: '4px 10px',
                        letterSpacing: '0.5px',
                    },
                    outlined: {
                        color: BASE_COLORS.DARK_BACKGROUND,
                    },
                    contained: {
                        backgroundColor: BASE_COLORS.DARK_BACKGROUND,
                        color: 'white',
                    },
                },
                defaultProps: {
                    variant: 'contained',
                    color: 'primary',
                },
            },
            MuiButtonGroup: {
                styleOverrides: {
                    outlined: {
                        color: BASE_COLORS.DARK_BACKGROUND,
                    },
                    contained: {
                        backgroundColor: BASE_COLORS.DARK_BACKGROUND,
                        '& .MuiButton-root:not(:last-child)': {
                            borderRight: `1px solid ${BASE_COLORS.LIGHT_BACKGROUND}`,
                        },
                    },
                },
            },
            MuiPopover: {
                styleOverrides: {
                    paper: {
                        border: `1px solid ${BASE_COLORS.DARK_BACKGROUND}`,
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        marginTop: -7,
                        borderTopWidth: 0,
                        marginLeft: 0.2,
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderColor: BASE_COLORS.LIGHT_BORDER_COLOR,
                        borderWidth: 0,
                        borderStyle: 'solid',
                        backgroundColor: BASE_COLORS.PAPER_BACKGROUND,
                    },
                    rounded: {
                        borderRadius: 8,
                    },
                },
            },
            MuiCheckbox: {
                styleOverrides: {
                    root: {
                        color: BASE_COLORS.DARK_BACKGROUND,
                        '&.Mui-checked': {
                            color: 'inherit',
                        },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    notchedOutline: {
                        borderWidth: '1px !important',
                    },
                },
            },
            MuiFilledInput: {
                root: {
                    borderRadius: 4,
                    '&:before, &:after': {
                        display: 'none',
                    },
                },
            },
            MuiSlider: {
                styleOverrides: {
                    root: {
                        color: BASE_COLORS.DARK_BACKGROUND,
                    },
                },
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        '&.Mui-selected': {
                            color: BASE_COLORS.DARK_BACKGROUND,
                        },
                    },
                },
            },
            MuiTabs: {
                styleOverrides: {
                    indicator: {
                        backgroundColor: BASE_COLORS.DARK_BACKGROUND,
                    },
                },
            },
        },
        shape: {
            borderRadius: 8,
        },
        typography: {
            fontFamily: THEME_FONT,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            htmlFontSize: 10,
            fontSize: 12,
            body1: {
                fontSize: '1.3rem',
                fontFamily: THEME_FONT,
                fontWeight: 400,
                lineHeight: 1.5,
            },
            body2: {
                fontSize: '1.3rem',
                fontFamily: THEME_FONT,
                fontWeight: 400,
                lineHeight: 1.43,
            },
            body3: {
                fontSize: '1rem',
                fontFamily: THEME_FONT,
                fontWeight: 300,
                color: BASE_COLORS.GREY_TEXT,
                lineHeight: 1.2,
                display: 'block',
            },
            fontWeightBold: 900,
            h1: {
                fontFamily: THEME_FONT,
                fontWeight: 300,
                fontSize: '6.914285714285715rem',
                lineHeight: 1.167,
            },
            h2: {
                fontFamily: THEME_FONT,
                fontWeight: 300,
                fontSize: '4.571428571428571rem',
                lineHeight: 1.2,
                color: BASE_COLORS.MEDIUM_RED_BACKGROUND,
            },
            h3: {
                fontFamily: THEME_FONT,
                fontWeight: 300,
                fontSize: '3.457142857142857rem',
                lineHeight: 1.167,
                color: BASE_COLORS.MEDIUM_RED_BACKGROUND,
            },
            h4: {
                fontFamily: THEME_FONT,
                fontWeight: 600,
                fontSize: '2.157142857142857rem',
                lineHeight: 1.235,
                color: BASE_COLORS.DARK_BACKGROUND,
            },
            h5: {
                fontFamily: THEME_FONT,
                fontWeight: 300,
                fontSize: '1.8285714285714286rem',
                lineHeight: 1.334,
                color: BASE_COLORS.MEDIUM_RED_BACKGROUND,
            },
            h6: {
                fontFamily: THEME_FONT,
                fontWeight: 300,
                // grabbed from TableCell-root
                fontSize: '2.057142857142857rem',
                lineHeight: '2.057142857142857rem',
                color: BASE_COLORS.MEDIUM_RED_BACKGROUND,
            },
            subtitle1: {
                fontFamily: THEME_FONT,
                fontWeight: 600,
                fontSize: '1.3rem',
                lineHeight: '2.057142857142857rem',
            },
            subtitle2: {
                fontFamily: THEME_FONT,
                fontWeight: 500,
                fontSize: '1.3rem',
                lineHeight: 1.57,
            },
            button: {
                fontFamily: THEME_FONT,
                fontWeight: 500,
                fontSize: '1.3rem',
                lineHeight: 1.75,
                textTransform: 'uppercase',
            },
            caption: {
                fontFamily: THEME_FONT,
                fontWeight: 400,
                fontSize: '1.1142857142857143rem',
                lineHeight: 1.66,
            },
            overline: {
                fontFamily: THEME_FONT,
                fontWeight: 400,
                fontSize: '1.1142857142857143rem',
                lineHeight: 2.66,
                textTransform: 'uppercase',
            },
            listTitle: {
                fontFamily: THEME_FONT,
                fontWeight: 600,
                fontSize: '1.3rem',
                lineHeight: '2.057142857142857rem',
                color: BASE_COLORS.MEDIUM_RED_BACKGROUND,
            },
        },
        shadows: Array(25).fill('none'),
        mixins: {
            toolbar: {
                minHeight: 56,
                '@media (min-width:600px)': {
                    minHeight: 64,
                },
            },
        },
    });
    return t;
};

export default theme;
