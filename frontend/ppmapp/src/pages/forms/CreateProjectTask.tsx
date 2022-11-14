import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useInput from "../../hooks/use-input";
import {fetchData, patchData, postData, putData} from "../../services/fetch";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const CreateProjectTask = () => {
    const navigate = useNavigate();
    const locations = useLocation();
    let [id, setId] = useState();
    const token = useSelector((state: RootState) => state.user.token);

    const {
        value: summary,
        isValid: summaryIsValid,
        hasError: summaryInputHasError,
        valueChangeHandler: summaryChangeHandler,
        inputBlurHandler: summaryBlurHandler
    } = useInput("", (value: string) => value.trim() !== "");

    const {
        value: acceptanceCriteria,
        isValid: acceptanceCriteriaIsValid,
        hasError: acceptanceCriteriaInputHasError,
        valueChangeHandler: acceptanceCriteriaChangeHandler,
        inputBlurHandler: acceptanceCriteriaBlurHandler
    } = useInput("", (value: string) => true);

    const {
        value: status,
        isValid: statusIsValid,
        hasError: statusInputHasError,
        valueChangeHandler: statusChangeHandler,
        inputBlurHandler: statusBlurHandler
    } = useInput("", (value: string) => true);

    const {
        value: priority,
        isValid: priorityIsValid,
        hasError: priorityInputHasError,
        valueChangeHandler: priorityChangeHandler,
        inputBlurHandler: priorityBlurHandler
    } = useInput("", (value: string) => true);

    const {
        value: dueDate,
        isValid: dueDateIsValid,
        hasError: dueDateInputHasError,
        valueChangeHandler: dueDateChangeHandler,
        inputBlurHandler: dueDateBlurHandler
    } = useInput("", (value: string) => true);

    const isFormValid = () => {
        return summaryIsValid;
    }

    const submitHandler = (event: any) => {
        event.preventDefault();
        if((locations.state as any)?.projectSequence){
            const body = {
                id, summary, acceptanceCriteria, status, priority, dueDate
            }
            patchData(process.env.REACT_APP_API_BACKLOG + (locations.state as any)?.projectIdentifier + "/" + (locations.state as any)?.projectSequence, token, body)
                .then((response) => {
                navigate(-1)
            });
        }
        else{
            const body = {
                summary, acceptanceCriteria, status, priority, dueDate
            }
            postData(process.env.REACT_APP_API_BACKLOG + (locations.state as any)?.projectIdentifier, token, body)
                .then((response) => {
                navigate(-1)
            });
        }
    }

    useEffect(() => {
        if((locations.state as any)?.projectSequence){
            fetchData(process.env.REACT_APP_API_BACKLOG + (locations.state as any).projectIdentifier + "/" + (locations.state as any)?.projectSequence, token)
            .then(response => {
                setId(response.id);
                summaryChangeHandler(response.summary);
                acceptanceCriteriaChangeHandler(response.acceptanceCriteria);
                statusChangeHandler(response.status);
                priorityChangeHandler(response.priority);
                dueDateChangeHandler(response.dueDate);
            });
        }
    }, []);

    return (
        <Box sx={{width: "100%"}}>
            <Typography sx={{padding: 3, textAlign: "center"}} variant="h3">Create / Edit Project form</Typography>
            <form onSubmit={submitHandler}>
                <Grid container gap={2} direction="column" justifyContent="center" alignItems="flex-end">
                    <TextField fullWidth label="Summary" 
                        value={summary}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            summaryChangeHandler(event.target.value);
                        }}
                        onBlur={summaryBlurHandler}/>
                    <TextField fullWidth label="Acceptance criteria" 
                        value={acceptanceCriteria}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            acceptanceCriteriaChangeHandler(event.target.value);
                        }}
                        onBlur={acceptanceCriteriaBlurHandler}/>
                    <TextField select fullWidth label="Status" 
                        value={status}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            statusChangeHandler(event.target.value);
                        }}
                        onBlur={statusBlurHandler}>
                            <MenuItem value={"TO_DO"}>To Do</MenuItem>
                            <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
                            <MenuItem value={"DONE"}>Done</MenuItem>
                    </TextField>
                    <TextField select fullWidth label="Priority" 
                        value={priority}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            priorityChangeHandler(event.target.value);
                        }}
                        onBlur={priorityBlurHandler}>
                            <MenuItem value={1}>High</MenuItem>
                            <MenuItem value={2}>Medium</MenuItem>
                            <MenuItem value={3}>Low</MenuItem>
                    </TextField>
                    <TextField type="date" fullWidth label="Estimated End Date" 
                        value={dueDate} InputLabelProps={{shrink: true}}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            dueDateChangeHandler(event.target.value);
                        }}
                        onBlur={dueDateBlurHandler}/>
                    <Button disabled={!isFormValid()} type="submit" variant="contained">ADD NEW PROJECT</Button>
                </Grid>
            </form>
        </Box>
    );
}

export default CreateProjectTask;