import { useSelector } from 'react-redux';
import videoHome from '../../assets/video-homepage.mp4';
import {  useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
const HomePage = (props) => {
    const { t,i18n } = useTranslation();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate();
    // console.log(account, isAuthenticated);
    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source src={videoHome} type="video/mp4" />
            </video>
            <div className='homepage-content'>
                <div className='title-1'>
                    {t('homepage.title1')}
                </div>
                <div className='title-2'>{t('homepage.title2')}</div>
                <div className='title-action'>
                    {!isAuthenticated ?
                        <button onClick={() => navigate('/login')}>{t('homepage.title3.login')}</button> :
                        <button onClick={() => navigate('/users')}>{t('homepage.title3.quiz')}</button>
                    }
                    
                </div>
            </div>
        </div>
    )
}
export default HomePage;  