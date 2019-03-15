import { createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';

export default createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: pink,
    },
});