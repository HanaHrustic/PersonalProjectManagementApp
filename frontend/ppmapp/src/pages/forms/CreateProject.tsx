import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import useInput from "../../hooks/use-input";
import { useLocation, useNavigate } from "react-router-dom";
import {fetchData, postData, putData} from "../../services/fetch";
import { useAppDispatch } from "../../redux/hooks";
import { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const Project = () => {
    const navigate = useNavigate();
    const locations = useLocation();
    let [id, setId] = useState();
    const token = useSelector((state: RootState) => state.user.token);

    const {
        value: projectName,
        isValid: projectNameIsValid,
        hasError: projectNameInputHasError,
        valueChangeHandler: projectNameChangeHandler,
        inputBlurHandler: projectNameBlurHandler
    } = useInput("", (value: string) => value.trim() !== "");

    const {
        value: projectIdentifier,
        isValid: projectIdentifierIsValid,
        hasError: projectIdentifierInputHasError,
        valueChangeHandler: projectIdentifierChangeHandler,
        inputBlurHandler: projectIdentifierBlurHandler
    } = useInput("", (value: string) => value.trim().length > 3 && value.trim().length < 6);

    const {
        value: description,
        isValid: descriptionIsValid,
        hasError: descriptionInputHasError,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler
    } = useInput("", (value: string) => value.trim() !== "");

    const {
        value: start_date,
        isValid: start_dateIsValid,
        hasError: start_dateInputHasError,
        valueChangeHandler: start_dateChangeHandler,
        inputBlurHandler: start_dateBlurHandler
    } = useInput("", (value: string) => value.trim() !== "");

    const {
        value: end_date,
        isValid: end_dateIsValid,
        hasError: end_dateInputHasError,
        valueChangeHandler: end_dateChangeHandler,
        inputBlurHandler: end_dateBlurHandler
    } = useInput("", (value: string) => value.trim() !== "");

    const isFormValid = () => {
        return projectNameIsValid && projectIdentifierIsValid && descriptionIsValid && start_dateIsValid && end_dateIsValid;
    }

    const submitHandler = (event: any) => {
        event.preventDefault();
        if((locations.state as any)?.projectIdentifier){
            const body = {
                id, projectName, projectIdentifier, description, start_date, end_date
            }
            putData(process.env.REACT_APP_API_PROJECT + projectIdentifier, token, body).then(() =>
                navigate('/')
            ).then((response) => {
                navigate('/')
            });
        }
        else{
            const body = {
                projectName, projectIdentifier, description, start_date, end_date
            }
            postData(process.env.REACT_APP_API_PROJECT + "", token, body).then(() =>
                navigate('/dashboard')
            ).then((response) => {
                navigate('/dashboard')
            });
        }
    }

    useEffect(() => {
        if((locations.state as any)?.projectIdentifier){
            fetchData(process.env.REACT_APP_API_PROJECT + (locations.state as any).projectIdentifier, token)
            .then(response => {
                setId(response.id);
                projectNameChangeHandler(response.projectName);
                projectIdentifierChangeHandler(response.projectIdentifier);
                descriptionChangeHandler(response.description);
                start_dateChangeHandler(response.start_date);
                end_dateChangeHandler(response.end_date);
            });
        }
    }, []);

    return (
        <Box sx={{width: "100%"}}>
            <Typography sx={{padding: 3, textAlign: "center"}} variant="h3">Create / Edit Project form</Typography>
            <form onSubmit={submitHandler}>
                <Grid container gap={2} direction="column" justifyContent="center" alignItems="flex-end">
                    <TextField fullWidth label="Project Name" 
                        value={projectName}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            projectNameChangeHandler(event.target.value);
                        }}
                        onBlur={projectNameBlurHandler}
                        helperText={projectNameInputHasError ? "Mandatory input field." : null}/>
                    <TextField fullWidth label="Unique Project ID" 
                        disabled={id != null}
                        value={projectIdentifier}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            projectIdentifierChangeHandler(event.target.value);
                        }}
                        onBlur={projectIdentifierBlurHandler}
                        helperText={projectIdentifierInputHasError ? "Mandatory input field, has to contain 4 or 5 letters or numbers." : null}/>
                    <TextField fullWidth multiline label="Project Description" 
                        value={description}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            descriptionChangeHandler(event.target.value);
                        }}
                        onBlur={descriptionBlurHandler}
                        helperText={descriptionInputHasError ? "Mandatory input field." : null}/>
                    <TextField type="date" fullWidth label="Start Date" 
                        value={start_date} InputLabelProps={{shrink: true}}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            start_dateChangeHandler(event.target.value);
                        }}
                        onBlur={start_dateBlurHandler}
                        helperText={start_dateInputHasError ? "Mandatory input field." : null}/>
                    <TextField type="date" fullWidth label="Estimated End Date" 
                        value={end_date} InputLabelProps={{shrink: true}}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            end_dateChangeHandler(event.target.value);
                        }}
                        onBlur={end_dateBlurHandler}
                        helperText={end_dateInputHasError ? "Mandatory input field." : null}/>
                    <Button disabled={!isFormValid()} type="submit" variant="contained">ADD NEW PROJECT</Button>
                </Grid>
            </form>
        </Box>
    );
}

export default Project;