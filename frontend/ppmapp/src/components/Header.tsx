import {Button, Grid, Typography} from '@mui/material';
import ContentWrapper from './ContentWrapper';
import Wrapper from './Wrapper';
import { StyledLink } from '../styles/LinkStyle';
import { useAppSelector} from "../redux/hooks";
import {RootState} from "../redux/store";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const selector = useAppSelector((state: RootState) => state.user.token);
    const navigate = useNavigate();

    const logoutHandler = () => {
        navigate(0);
    }

    return (
        <Wrapper>
            <ContentWrapper>
                <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
                    <Grid item>
                        <Grid sx={{gap: 3}} container direction="row" justifyContent="flex-start" alignItems="baseline">
                            <Typography variant="h6"><StyledLink to="/">Personal Project Management App</StyledLink></Typography>
                            <Typography variant="subtitle1"><StyledLink to="/">Dashboard</StyledLink></Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {selector === "" &&
                            <Grid sx={{gap: 3}} container direction="row" justifyContent="flex-end" alignItems="baseline">
                                <Typography variant="subtitle1"><StyledLink to="/register">Register</StyledLink></Typography>
                                <Typography variant="subtitle1"><StyledLink to="/login">Login</StyledLink></Typography>
                            </Grid>
                        }
                        {selector !== "" &&
                            <Grid sx={{gap: 3}} container direction="row" justifyContent="flex-end" alignItems="baseline">
                                <Typography variant="subtitle1">Welcome</Typography>
                                <Button onClick={logoutHandler}>
                                    <Typography color={"black"} variant="button">Logout</Typography>
                                </Button>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </ContentWrapper>
        </Wrapper>
    );
}

export default Header;