import React from 'react';
import classes from './Header.module.css';
import mealsImage from '../../assets/Meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) =>{
    return (
        <React.Fragment>
            <header className={classes.header} >
                <h2 className="title">React meals</h2>
                <HeaderCartButton onShowCart = {props.onShowCart}/>
            </header>
            <div className={classes['main-image'] } >
                <img src= {mealsImage} alt="Table is full of delicios food !!" />
            </div>
        </React.Fragment >
    )
}

export default Header;