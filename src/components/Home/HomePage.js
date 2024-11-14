import { useSelector } from 'react-redux';
import videoHome from '../../assets/video-homepage.mp4';

const HomePage = (props) => {

    const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    console.log(account, isAuthenticated);
    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source src={videoHome} type="video/mp4" />
            </video>
            <div className='homepage-content'>
                <div className='title-1'>There's a better way to ask</div>
                <div className='title-2'>You don't want to make a boring form.
                    And your audience won't answer one.
                    Create a typeform instead-and make everyone happy.</div>
                <div className='title-action'>
                    <button>Get's started. It's free</button>
                </div>
            </div>
        </div>
    )
}
export default HomePage;  