import { Stack, useToast } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../../../components/common/LoadingScreen';
import { UserContext } from '../../../context/userContext';
import { createUser, updateUserProfile } from '../../../services/UserService';
import UserDetails from './UserDetails';
import UserDP from './UserDP';
import UserLocation from './UserLocation';
import UserSocial from './UserSocial';

const defaultFormFields = {
    name: '',
    email: '',
    password: '',
    social_links: {
        instagram_url: '',
        facebook_url: '',
        linkedIn_url: ''
    }
};

const UserSignupDetails = ({ onLoginClick }) => {

    const [currentView, setCurrentView] = useState('user details');
    const [form, setForm] = useState(defaultFormFields);
    const [dpData, setDpData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setCurrentUser } = useContext(UserContext);
    const toast = useToast();
    const navigate = useNavigate();


    const handleSubmit = async () => {

        setLoading(true);
        try {
            const response = await createUser(form, dpData);
            // if response is 200, then user is created
            if (response.status === 200) {
                if (dpData !== null) {
                    const formData = new FormData();
                    formData.append('file', dpData);
                    const profileResponse = await updateUserProfile(response.data.user_id, formData);
                    if (profileResponse.status === 200) {
                        setCurrentUser(profileResponse.data);
                        setLoading(false);
                        navigate('/feed');
                    } else {
                        setCurrentUser(response.data);
                        setLoading(false);
                        toast({
                            title: `Something went wrong`,
                            status: "error",
                            duration: 6000,
                        })
                        navigate('/feed');
                    }
                } else {
                    setCurrentUser(response.data);
                    setLoading(false);
                    navigate('/feed');
                }
            }
        } catch (error) {
            // if status code is 400, then it means that the user already exists
            if (error.response.status === 401) {
                setLoading(false);
                setCurrentView('user details');
                toast({
                    title: `User already exists`,
                    status: "error",
                    duration: 6000,
                })
            } else {
                setLoading(false);
                setCurrentView('user details');
                toast({
                    title: `Something went wrong`,
                    status: "error",
                    duration: 6000,
                })

            }

        }
    }


    return (
        <Stack
            bg={'gray.50'}
            rounded={'xl'}
            zIndex={20}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: 'lg' }}
            minH="500px"
        >
            {loading ? <LoadingScreen size="xl" color={"black"} /> : (
                <>
                    {currentView === 'user details' && (
                        <UserDetails goNext={() => setCurrentView('user dp')} form={form} setForm={setForm} />
                    )}
                    {currentView === 'user dp' && (
                        <UserDP goNext={() => setCurrentView('user location')} dpData={dpData} setDpData={setDpData} />
                    )}
                    {currentView === 'user location' && (
                        <UserLocation goNext={() => setCurrentView('user social')} form={form} setForm={setForm} />
                    )}
                    {currentView === 'user social' && (
                        <UserSocial handleSubmit={handleSubmit} form={form} setForm={setForm} />
                    )}
                </>
            )}

        </Stack>
    )
}

export default UserSignupDetails