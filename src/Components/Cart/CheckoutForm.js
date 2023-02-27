import classes from './CheckoutForm.module.css';
import {useRef, useState} from 'react';

const CheckoutForm = (props) => {

  const [formValidity ,setFormValidity ]  = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const isEmpty = value => value.trim() === '';

  const isSixChars = value => value.trim().length === 6;

  const confirmHandler = (event) => {
    event.preventDefault();

    const name = nameInputRef.current.value;
    const street = streetInputRef.current.value;
    const city = cityInputRef.current.value;
    const postalCode = postalInputRef.current.value;

    const nameIsValid = !isEmpty(name);
    const streetIsValid = !isEmpty(street);
    const postalCodeIsValid = isSixChars(postalCode);
    const cityIsValid = !isEmpty(city);

    setFormValidity({
      name: nameIsValid,
      street: streetIsValid,
      postalCode: postalCodeIsValid,
      city: cityIsValid
    });

    const formIsValid = nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;

    if(!formIsValid){
      return;
    }
    props.onConfirm({
      name: name,
      street: street,
      postalCode: postalCode,
      city: city
    });
  };

  const nameInputControl = `${classes.control} ${!formValidity.name && classes.invalid } `; 
  const streetInputControl = `${classes.control} ${!formValidity.street && classes.invalid } `; 
  const postalCodeInputControl = `${classes.control} ${!formValidity.postalCode && classes.invalid } `; 
  const cityInputControl = `${classes.control} ${!formValidity.city && classes.invalid } `; 

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputControl}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formValidity.name && <p>Write a valid name</p>}
      </div>
      <div className={streetInputControl}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formValidity.street && <p>Write a valid street</p>}
      </div>
      <div className={postalCodeInputControl}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!formValidity.postalCode && <p>Write a valid postalCode(6 chars long)</p>}
      </div>
      <div className={cityInputControl}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formValidity.city && <p>Write a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckoutForm;