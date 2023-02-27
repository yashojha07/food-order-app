import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import React, { useContext , useState } from 'react';
import CartContext from '../../store/Cart-Context';
import CartItem from './CartItem';
import CheckoutForm from './CheckoutForm';

const Cart = (props) =>{
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [didSubmit,setDidSubmit] = useState(false);
    const [order,setOrder] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = (item) =>{
        cartCtx.addItem( 
            {...item,amount:1}
        );
    };

    const cartItemRemoveHandler = (id) =>{
        cartCtx.removeItem(id);
    };

    const CartItems =  (<ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => 
            <CartItem key={item.id} name={item.name} price={item.price} amount={item.amount} 
            onAdd={cartItemAddHandler.bind(null,item)  } onRemove={cartItemRemoveHandler.bind(null,item.id) } />
        
         ) }
    </ul>);

    const orderHandler = () =>{
        setOrder(true);
    }

    const submitUserHandler = async(userData) =>{
        setIsSubmitting(true);
        await fetch('https://food-order-app-fcc45-default-rtdb.firebaseio.com/orders.json',{
           method: 'POST',
           body: JSON.stringify({
               user: userData,
               orderedItems: cartCtx.items
           })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const ModalAction = (
        <div className={classes.actions}>
        <button className={classes['button--alt']}  onClick = {props.onClose} >Cancel</button>
        {hasItems && <button className={classes.button} onClick={orderHandler} >Order</button>}
    </div>
    );
    
    const cartModalContent = <React.Fragment>
        {CartItems}
           <div className={classes.total}>
               <span >Total Amount</span>
               <span >{totalAmount}</span>
           </div>
           {order && <CheckoutForm onConfirm={submitUserHandler} onCancel={props.onClose} />}
            {!order && ModalAction }
    </React.Fragment>
    
    const isSubmittingContent = <p>Sending data......</p>

    const didSubmitContent = <React.Fragment>
            <p>Sucessfully sent the data..</p>
            <div className={classes.actions}>
        <button className={classes.button}  onClick = {props.onClose} >Cancel</button>
       
    </div>
        </React.Fragment>

    return(
       <Modal onClose={props.onClose} >
           {!isSubmitting && !didSubmit && cartModalContent}
           {isSubmitting && isSubmittingContent }
           {didSubmit && didSubmitContent}
       </Modal>
    );
};

export default Cart;
