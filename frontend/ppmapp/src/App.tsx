import styled from 'styled-components';
import {Routes, Route, Navigate} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateProject from './pages/forms/CreateProject';
import ProjectBoard from './pages/ProjectBoard';
import CreateProjectTask from './pages/forms/CreateProjectTask';
import Landing from "./pages/Landing";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import {useAppSelector} from "./redux/hooks";
import {RootState} from "./redux/store";
import Layout from "./pages/layout/Layout";

function App() {
    const token = useAppSelector((state: RootState) => state.user.token);
    return (
        <Routes>
            <Route element={token !== "" ? <Layout/> : <Navigate replace to="/landing"/>}>
                <Route path='/' element={<Dashboard/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/new-project' element={<CreateProject/>}/>
                <Route path='/:projectIdentifier/editProject' element={<CreateProject/>}/>
                <Route path='/:projectIdentifier/projectBoard' element={<ProjectBoard/>}/>
                <Route path='/:projectIdentifier/projectBoard/:projectSequence' element={<CreateProjectTask/>}/>
                <Route path='/:projectIdentifier/projectBoard/newTask' element={<CreateProjectTask/>}/>
            </Route>
            <Route element={token === "" ? <Layout/> : <Navigate replace to="/dashboard"/>}>
                <Route path='/landing' element={<Landing/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </Route>
        </Routes>
    );
}

export default App;