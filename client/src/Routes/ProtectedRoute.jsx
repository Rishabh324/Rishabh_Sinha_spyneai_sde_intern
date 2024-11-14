import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import API from '../services/API';
import { currentUser } from '../redux/features/auth/authActions';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();

    const getUser = async () => {
        try {
            const { data } = await API.get('/auth/currentUser');
            if (data?.status) dispatch(currentUser(data));
            else return <Navigate to='/login'></Navigate>
        }
        catch (err) {
            localStorage.clear();
            console.log(err);
        }
    }
    useEffect(() => {
        getUser()
    })

    if (localStorage.getItem('token')) return children;
    else return <Navigate to="/login"></Navigate>;
}

export default ProtectedRoute;