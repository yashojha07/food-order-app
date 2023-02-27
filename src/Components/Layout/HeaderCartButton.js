import React ,{useContext, useEffect, useState} from 'react';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/Cart-Context';

const HeaderCartButton = (props) =>{

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false) ; 
    const cartCtx = useContext(CartContext);
    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
      }, 0);

      const btnClasses = `${classes.button}  ${ btnIsHighlighted? classes.bump : ''} `;
      const items = cartCtx.items;
      useEffect(
        ()=>{
            if(items.length === 0){
                return;
            }
            setBtnIsHighlighted(true);

            const timer = setTimeout( ()=>{
                setBtnIsHighlighted(false);
            },300);

            return () =>{
                clearTimeout(timer);
            };

        } ,[items]);

    return(
        <button className={btnClasses} onClick={props.onShowCart} >
            <span className={classes.icon}><CartIcon /></span>
            <span className={classes.bump}>Your Cart</span>
            <span className={classes.badge}> {numberOfCartItems} </span>
        
        </button>
    )
};

export default HeaderCartButton;