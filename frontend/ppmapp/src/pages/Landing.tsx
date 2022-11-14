import {Box, Button, Typography} from "@mui/material";
import {StyledLink} from "../styles/LinkStyle";
import styled from "styled-components";

const StyledButton = styled(Button)`
    background-color: #3a7fff !important;
`;

const Landing = () => {
    return (
        <div>
            <Box sx={{width: "100%"}}>
                <Typography sx={{padding: 3, textAlign: "center"}} variant="h2">Welcome</Typography>
                <Typography sx={{textAlign: "center"}} variant="h4">Personal Project Management App</Typography>
            </Box>
        </div>
    );
}

export default Landing;