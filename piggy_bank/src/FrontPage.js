import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FirstDeposit from './FirstDeposit';
import piggy_bank from './piggy_bank';
import web3 from './web3';

const theme = createTheme();

class FrontPage extends React.Component {
  state = {
    balance: '',
    expireTime: '',
  };

  async componentDidMount() {
    this.Refresh();
  }

  Refresh = async () => {
    const accounts = await web3.eth.getAccounts();

    const balance = await piggy_bank.methods.viewBalance().call({from: accounts[0]});
    const expireTime = await piggy_bank.methods.viewExpireTime().call({from: accounts[0]});

    this.setState({ balance, expireTime });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
          >
              <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              >
                  <Typography component="h1" variant="h4">
                  Piggy Balance
                  </Typography>
                  <Typography component="h1" variant="h6">
                  $$$$$$$$$$$$$$$$$$$$$$$
                  </Typography>
                  <Typography component="h1" variant="h4">
                  {this.state.balance}
                  </Typography>
                  <Typography component="h1" variant="h6">
                  $$$$$$$$$$$$$$$$$$$$$$$
                  </Typography>
                  <Box
                      sx={{
                      my: 5,
                      mx: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      }}
                      >
                  </Box>
                  <Typography component="h1" variant="h4">
                  Remaining Time Till Withdraw
                  </Typography>
                  <Typography component="h1" variant="h3">
                  --------------------------
                  </Typography>
                  <Typography component="h1" variant="h4">
                  {this.state.expireTime}
                  </Typography>
                  <Typography component="h1" variant="h3">
                  --------------------------
                  </Typography>
              </Box>
          </Grid>
          <FirstDeposit prf={this.Refresh}/>
        </Grid>
      </ThemeProvider>
    );
  };
}

export default FrontPage;