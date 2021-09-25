import React from "react";
import headerLogo from '../images/header__logo.svg';

function Header() {
    return (
        <header className="header">
            <a className="link" href="#" target="_blank">
                <img src={headerLogo} className="header__logo" alt="Место Россия" />
            </a>
        </header>
    );
};

export default Header;