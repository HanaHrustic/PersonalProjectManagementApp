import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../redux/hooks";
import {useState} from "react";
import useInput from "../../hooks/use-input";
import {postData, putData} from "../../services/fetch";
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {userActions} from "../../redux/slices/UserSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const locations = useLocation();
    let [id, setId] = useState();

    const {
        value: username,
        isValid: usernameIsValid,
        hasError: usernameInputHasError,
        valueChangeHandler: usernameChangeHandler,
        inputBlurHandler: usernameBlurHandler
    } = useInput("", (value: string) => value.trim() !== "");

    const {
        value: password,
        isValid: passwordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler
    } = useInput("", (value: string) => value.trim().length > 0);

    const isFormValid = () => {
        return usernameIsValid && passwordIsValid;
    }

    const submitHandler = (event: any) => {
        event.preventDefault();
        const body = {
            username, password
        }
        postData(process.env.REACT_APP_API_USERS + "login", "", body).then((response) => {
            dispatch(userActions.enterUserTokenValue(response.token));
        }).then(() => {
            navigate('/dashboard')
        });
    }

    return (
        <Box sx={{width: "100%"}}>
            <Typography sx={{padding: 3, textAlign: "center"}} variant="h3">Login</Typography>
            <form onSubmit={submitHandler}>
                <Grid container gap={2} direction="column" justifyContent="center" alignItems="flex-end">
                    <TextField fullWidth label="Username" required
                               value={username}
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                   usernameChangeHandler(event.target.value);
                               }}
                               onBlur={usernameBlurHandler}
                               helperText={usernameInputHasError ? "Mandatory input field." : null}/>
                    <TextField fullWidth type="password" label="Password" required
                               value={password}
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                   passwordChangeHandler(event.target.value);
                               }}
                               onBlur={passwordBlurHandler}
                               helperText={passwordInputHasError ? "Mandatory input field" : null}/>
                    <Button disabled={!isFormValid()} type="submit" variant="contained">LOGIN</Button>
                </Grid>
            </form>
        </Box>
    );
}

export default Login;