import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  width: 80vw;
  flex: 1;
  margin: 0 auto;
`;

const Layout = () => {
    return (
        <Wrapper>
            <Header />
            <ContentWrapper>
                <Outlet />
            </ContentWrapper>
            <Footer />
        </Wrapper>
    );
};

export default Layout;