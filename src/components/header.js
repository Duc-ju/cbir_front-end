import React from 'react';
import classes from './header.module.css'

function Header(props) {
    return (
        <section className={classes.root}>
            <h1 className={classes.title}>Hệ thống tìm kiếm ảnh món ăn</h1>
        </section>
    );
}

export default Header;