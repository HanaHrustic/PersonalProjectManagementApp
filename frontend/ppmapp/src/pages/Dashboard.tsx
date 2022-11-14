import { Box, Button, Typography } from "@mui/material";
import ProjectItem from "../components/ProjectItem";
import { useCallback, useState, useEffect } from "react";
import styled from 'styled-components';
import { StyledLink } from '../styles/LinkStyle';
import {useAppSelector} from "../redux/hooks";
import {RootState} from "../redux/store";
import {fetchData} from "../services/fetch";
import {useSelector} from "react-redux";

const StyledButton = styled(Button)`
    background-color: #3a7fff !important;
`;

const Dashboard = () => {
    const [projects, setProjects] = useState<{id: number, projectName: string, projectIdentifier: string, description: string, start_date: Date, end_date: Date}[]>([]);
    const token = useSelector((state: RootState) => state.user.token);

    const fetchProjects = () => {
        fetchData(process.env.REACT_APP_API_PROJECT + "all", token)
            .then(response => {
                setProjects(response);
            });
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <Box sx={{width: "100%"}}>
            <Typography sx={{padding: 3, textAlign: "center"}} variant="h3">Projects</Typography>
            <StyledButton variant="outlined"><StyledLink to="/new-project">Create a Project</StyledLink></StyledButton>
            {projects.map((project) => <ProjectItem project={project} key={project.id}/>)}
        </Box>
    );
}

export default Dashboard;