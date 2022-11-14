import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
    text-decoration: none;
    opacity: 60%;
    color: black;

    &:hover{
        text-decoration: underline;
    }
`;