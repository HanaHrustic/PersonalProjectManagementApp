import { Box, Button, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProjectTask from "../components/ProjectTask";
import {fetchData} from "../services/fetch";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

const StyledButton = styled(Button)`
    background-color: #3a7fff !important;
`;

const Wrapper = styled.div`
  padding-top: 20px;
  width: 100%;
`;

const StyledBox = styled(Box)`
  height: 100px;
  border-radius: 10px;
  padding-bottom: 10px;
`;

const ProjectBoard = () => {
    const [tasks, setTasks] = useState<{id: number, projectSequence: string, summary: string, acceptanceCriteria: string, status: string, priority: number, dueDate: Date, projectIdentifier: string, create_At: Date, update_At: Date}[]>([]);
    const locations = useLocation();
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.user.token);
    
    const fetchTasks = () => {
        fetchData(process.env.REACT_APP_API_BACKLOG + (locations.state as any).projectIdentifier, token)
            .then(response => {
                setTasks(response);
            });
    }

    const buttonHandler = () => {
        navigate(`/${(locations.state as any).projectIdentifier}/projectBoard/newTask`, {state: {projectIdentifier: (locations.state as any)?.projectIdentifier}})
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <Wrapper>
            <Grid container direction="row" justifyContent="center" alignItems="baseline">
                <Grid item>
                    <StyledButton variant="outlined" onClick={buttonHandler}>
                        <Typography variant="button" color="#000000">CREATE PROJECT TASK</Typography>
                    </StyledButton>
                </Grid>
            </Grid>
            <Wrapper>
                <Grid container direction="row" justifyContent="space-around" alignItems="baseline">
                    <Grid item sx={{width: "30%"}}>
                        <StyledBox sx={{backgroundColor: "#3a8e8d"}}>
                            <Typography sx={{padding: 3, textAlign: "center"}} variant="h4">TO DO</Typography>
                        </StyledBox>
                        {tasks.filter((task) => task.status === "TO_DO").map((task) => <ProjectTask task={task} key={task.id}/>)}
                    </Grid>
                    <Grid item sx={{width: "30%"}}>
                        <StyledBox sx={{backgroundColor: "#3a618e"}}>
                            <Typography sx={{padding: 3, textAlign: "center"}} variant="h4">IN PROGRESS</Typography>
                        </StyledBox>
                        {tasks.filter((task) => task.status === "IN_PROGRESS").map((task) => <ProjectTask task={task} key={task.id}/>)}
                    </Grid>
                    <Grid item sx={{width: "30%"}}>
                        <StyledBox sx={{backgroundColor: "#3a3d8e"}}>
                            <Typography sx={{padding: 3, textAlign: "center"}} variant="h4">DONE</Typography>
                        </StyledBox>
                        {tasks.filter((task) => task.status === "DONE").map((task) => <ProjectTask task={task} key={task.id}/>)}
                    </Grid>
                </Grid>
            </Wrapper>
            
        </Wrapper>
    );
}

export default ProjectBoard;