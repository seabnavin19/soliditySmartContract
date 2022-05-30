import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import piggy_bank from './piggy_bank';
import web3 from './web3';
import Swal from 'sweetalert2';


export default function FirstDeposit(props) {
  const [loading, setLoading] = React.useState(false);

  const StartLoading = () => {
    setLoading(() => true);
  };

  const StopLoading = () => {
    setLoading(() => false);
    props.prf();
  };

  const onWithdraw = async () => {
    const accounts = await web3.eth.getAccounts();

    StartLoading();

    try{
      await piggy_bank.methods.withdraw(7).send({
        from: accounts[0],
      });

      Swal.fire({
        position: 'middle',
        icon: 'success',
        title: 'Your fund was withdrawed!',
        showConfirmButton: false,
        timer: 3000
      })
    } catch (error) {
      Swal.fire({
        position: 'middle',
        icon: 'error',
        title: 'Transaction Failed!!',
        showConfirmButton: false,
        timer: 3000
      })
    }

    StopLoading();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    StartLoading();
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });



    const accounts = await web3.eth.getAccounts();

    StartLoading();

    try{
      await piggy_bank.methods.deposit(parseInt(data.get('password'))).send({
        from: accounts[0],
        value: web3.utils.toWei(data.get('email'), 'ether')
      });

      Swal.fire({
        position: 'middle',
        icon: 'success',
        title: 'Your fund was deposited!',
        showConfirmButton: false,
        timer: 3000
      })
    } catch (error) {
      Swal.fire({
        position: 'middle',
        icon: 'error',
        title: 'Transaction Failed!!',
        showConfirmButton: false,
        timer: 3000
      })
    }

    StopLoading();
  };

  return (
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome To Piggy Bank
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Amount in ether  (defalut: 0 ether)"
              name="email"
              autoComplete="0"
              autoFocus
              type="number"
              defaultValue={0}
            />
            <TextField
              margin="normal"
              id="password"
              fullWidth
              label="Holding Time (default: 1 day)"
              name="password"
              autoComplete="password"
              autoFocus
              type="number"
              defaultValue={1}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Deposit
            </Button>
            <Grid container>
            <Button onClick={props.prf} variant="outlined" color='success'>Refresh Balance</Button>
            <Button onClick={onWithdraw} variant="contained" color="success">
                  Withdraw
                </Button>
            </Grid>
            <Box sx={{ my: 3, mx: 4}}>
            </Box>
            {loading
              ? <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}>
                  <CircularProgress />
                </Box>
              : <Box></Box>
            }
          </Box>
        </Box>
      </Grid>
  );
}