import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../redux/hooks";
import {useState} from "react";
import useInput from "../../hooks/use-input";
import {postData} from "../../services/fetch";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const locations = useLocation();
    let [id, setId] = useState();

    const {
        value: fullName,
        isValid: fullNameIsValid,
        hasError: fullNameInputHasError,
        valueChangeHandler: fullNameChangeHandler,
        inputBlurHandler: fullNameBlurHandler
    } = useInput("", (value: string) => value.trim() !== "");

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

    const {
        value: confirmPassword,
        isValid: confirmPasswordIsValid,
        hasError: confirmPasswordInputHasError,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler
    } = useInput("", (value: string) => value.trim().length > 0);

    const isFormValid = () => {
        return fullNameIsValid && usernameIsValid && passwordIsValid && confirmPasswordIsValid;
    }

    const submitHandler = (event: any) => {
        event.preventDefault();
        const body = {
            username, fullName, password, confirmPassword
        }
        postData(process.env.REACT_APP_API_USERS + "register","", body).then((response) => {
            console.log(response);
            navigate('/dashboard');
        });
    }

    return (
        <Box sx={{width: "100%"}}>
            <Typography sx={{padding: 3, textAlign: "center"}} variant="h3">Register</Typography>
            <form onSubmit={submitHandler}>
                <Grid container gap={2} direction="column" justifyContent="center" alignItems="flex-end">
                    <TextField fullWidth label="Fullname" required
                               value={fullName}
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                   fullNameChangeHandler(event.target.value);
                               }}
                               onBlur={fullNameBlurHandler}
                               helperText={fullNameInputHasError ? "Mandatory input field." : null}/>
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
                    <TextField fullWidth type="password" label="Confirm Password" required
                               value={confirmPassword}
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                   confirmPasswordChangeHandler(event.target.value);
                               }}
                               onBlur={confirmPasswordBlurHandler}
                               helperText={confirmPasswordInputHasError ? "Mandatory input field" : null}/>
                    <Button disabled={!isFormValid()} type="submit" variant="contained">REGISTER</Button>
                </Grid>
            </form>
        </Box>
    );
}

export default Register;