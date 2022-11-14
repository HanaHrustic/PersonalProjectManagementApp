import {Box, Button, Grid, Modal, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import {deleteData} from "../services/fetch";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {useState} from "react";

const StyledButton = styled(Button)`
    width: 100%;
    margin: 1px !important;
`;

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ProjectItem: React.FC<{project: {id: number, projectName: string, projectIdentifier: string, description: string, start_date: Date, end_date: Date}}> = (props) => {
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.user.token);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const deleteHandler = () => {
        deleteData(process.env.REACT_APP_API_PROJECT + props.project.projectIdentifier, token)
            .then( () => {
                setOpen(false);
                navigate("/");
            }
        );
    }

    function updateHandler() {
        navigate(`/${props.project.projectIdentifier}/editProject`, {state: {projectIdentifier: props.project.projectIdentifier}})
    }

    function boardHandler() {
        navigate(`/${props.project.projectIdentifier}/projectBoard`, {state: {projectIdentifier: props.project.projectIdentifier}})
    }
    
    return (
        <Box sx={{border: 1, marginTop: 1, borderRadius: 1, borderColor: "primary"}}>
            <Grid container direction="row" justifyContent="space-around" alignItems="center">
                <Grid item xs={2}>
                    <Typography sx={{padding: 1}} variant="subtitle1">{props.project.projectIdentifier}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography sx={{padding: 1}} variant="h4">{props.project.projectName}</Typography>
                    <Typography sx={{padding: 1}} variant="subtitle1">{props.project.description}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Grid container>
                        <StyledButton variant="outlined" color="primary" onClick={boardHandler}>Project Board</StyledButton>
                        <StyledButton variant="outlined" color="secondary" onClick={updateHandler}>Update Project Info</StyledButton>
                        <StyledButton variant="outlined" color="error" onClick={handleOpen}>Delete Project</StyledButton>
                        <Modal open={open} onClose={handleClose}>
                            <Box sx={style}>
                                <Typography variant="h6">Are you sure you want to delete this project?</Typography>
                                <StyledButton variant="outlined" color="error" onClick={deleteHandler}>Delete Project</StyledButton>
                            </Box>
                        </Modal>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ProjectItem;