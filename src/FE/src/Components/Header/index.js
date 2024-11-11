import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';
import CountryDropdown from '../CountryDropdown';

const Header =()=>{
    return(
        <>
        <div className="headerWrapper">
                <div className="top-strip bg-red">
                    <div className="container">
                        <p className="mb-0 mt-0 text-center">shop bán máy chơi game <b>Play Station</b> chính hãng tại Việt Nam</p>
                    </div>
                </div>
                <div className="header">
                    <div className="container">
                        <div className='row'>
                            <div className="logoWrapper d-flex align-items-center col-sm-2">
                                < Link to={'/'}><img src={logo} alt='logo' /></Link>
                            </div>

                            <div className='col-sm-10 d-flex align-items-center part2'>
                                <CountryDropdown/>
                                {/* thanh tìm kiếm bắt đầu  */}

                                {/* thanh tìm kiếm kết thúc  */}
                            </div>

                        </div>
                
                    </div>
                </div>
        </div>
        </>
    )
}

export default Header;