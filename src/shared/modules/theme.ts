import { createMuiTheme } from "@material-ui/core/styles";
import cyan from "@material-ui/core/colors/cyan";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: cyan[600],
      contrastText: '#fff',
    },
  },
});
