import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

export default createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: purple,
    },
});