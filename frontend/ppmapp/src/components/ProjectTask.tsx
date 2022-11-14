import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {deleteData} from "../services/fetch";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

const StyledButton = styled(Button)`
    width: 45%;
    margin: 1px !important;

    &:hover{
        background-color: #e4e4e4e8 !important;
    }
`;

const StyledDiv = styled.div`
    justify-content: center;
    display: flex;
    height: 40px;
`;

const ProjectTask: React.FC<{task: {id: number, projectSequence: string, summary: string, acceptanceCriteria: string, status: string, priority: number, dueDate: Date, projectIdentifier: string, create_At: Date, update_At: Date}}> = (props) => {
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.user.token);
    
    const deleteHandler = () => {
        deleteData(process.env.REACT_APP_API_BACKLOG + props.task.projectIdentifier + "/" + props.task.projectSequence, token)
        .then( () =>
            navigate(-1)
        );
    }

    function updateHandler() {
        navigate(`/${props.task.projectIdentifier}/projectBoard/${props.task.projectSequence}`, {state: {projectIdentifier: props.task.projectIdentifier, projectSequence: props.task.projectSequence}})
    }
    
    return (
        <Box sx={{border: 1, marginTop: "25px", borderRadius: 2, borderColor: "#000000"}}>
            <Box sx={{padding: "7px", borderBottom: 1, borderRadius: 2, borderColor: "#000000", backgroundColor: props.task.priority === 1 ? "#ff1414" : props.task.priority === 2 ? "#ff141499" : "#dedede"}}>
                <Typography sx={{textAlign: "left"}} variant="h6">ID: {props.task.projectSequence}</Typography>
                <Typography sx={{textAlign: "left"}} variant="h6">Priority: {props.task.priority}</Typography>
            </Box>
            <Box>
                <Typography sx={{textAlign: "center"}} variant="h5">{props.task.summary}</Typography>
                <Typography sx={{textAlign: "center"}}>{props.task.acceptanceCriteria}</Typography>
                <StyledDiv>
                    <StyledButton sx={{borderColor: "#0e56ffd1"}} variant="outlined" onClick={updateHandler}><Typography variant="button" color="#0e56ffd1">View / Update</Typography></StyledButton>
                    <StyledButton sx={{borderColor: "#ff430fe8"}} variant="outlined" onClick={deleteHandler}><Typography variant="button" color="#ff430fe8">Delete</Typography></StyledButton>
                </StyledDiv>
            </Box>
        </Box>
    );
}

export default ProjectTask;