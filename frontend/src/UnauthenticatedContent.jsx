
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Form, { SimpleItem, ButtonItem } from 'devextreme-react/form';
import { useCallback, useMemo } from 'react';
import { useAuth } from './contexts/auth';

const defaultTheme = createTheme();

const userModel = {
  username: "",
  password: ""
};

const passwordOptions = {
  mode: 'password'
}

export default function UnauthenticatedContent() {
  const { signIn } = useAuth()

  const buttonOptions = useMemo(()=> ({
    text: 'Submit',
    type: 'default',
    useSubmitBehavior: true
  }),[])

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const {isOk, error} = await signIn(data.get('username'), data.get('password'))
    
    if(isOk) window.location.reload();
    if(!isOk) console.log(error);
  }, []);

  const boxStyles = useMemo(() => ({
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }), [])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={boxStyles}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" paddingBottom={2}>
            Sign in
          </Typography>
          <form onSubmit={handleSubmit}>
            <Form formData={userModel} labelLocation='top' width={300}>
              <SimpleItem dataField="username" isRequired/>
              <SimpleItem 
                dataField="password" 
                editorOptions={passwordOptions}
                isRequired
                />
              <ButtonItem buttonOptions={buttonOptions}/>
            </Form>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
