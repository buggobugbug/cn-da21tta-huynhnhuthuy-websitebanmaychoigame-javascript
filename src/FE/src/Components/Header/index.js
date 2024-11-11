import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import CountryDropdown from '../CountryDropdown';
import { IoSearch } from "react-icons/io5";
import { Button } from '@mui/material';
import { FiUser } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5";

const Header = () => {
    return (
        <>
            <div className="headerWrapper">
                {/* Thanh thông báo */}
                <div className="top-strip bg-red">
                    <div className="container">
                        <p className="mb-0 text-center">
                            Shop bán máy chơi game <b>Play Station</b> chính hãng tại Việt Nam
                        </p>
                    </div>
                </div>

                {/* Header chính */}
                <div className="header py-3">
                    <div className="container">
                        <div className="row align-items-center">
                            {/* Logo */}
                            <div className="logoWrapper d-flex align-items-center col-sm-2">
                                <Link to="/">
                                    <img src={logo} alt="logo" className="img-fluid" />
                                </Link>
                            </div>

                            {/* Phần tìm kiếm và dropdown */}
                            <div className="col-sm-10 d-flex align-items-center part2">
                                {/* Dropdown quốc gia */}
                                <CountryDropdown />

                                {/* Thanh tìm kiếm */}
                                <div className="headerSearch ml-3 mr-3 d-flex align-items-center position-relative">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tìm kiếm..."
                                    />
                                    <Button className="search-button">
                                        <IoSearch />
                                    </Button>
                                </div>

                                {/* Kết thúc Thanh tìm kiếm */}
                                <div className='part3 d-flex align-items-center ml-auto'>
                                    <Button className='circle mr-3'><FiUser /></Button>
                                    <div className='ml-auto cartTab d-flex align-items-center'>
                                        <span className='price mr-2'>$3.29</span>
                                        <Button className='circle ml-2'><IoBagHandleOutline /></Button>
                                        <span className='count d-flex align-items-center justify-content-center'>0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
