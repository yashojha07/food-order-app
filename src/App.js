import React,{ useState} from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Meal2 from "./Components/Meals/Meal2";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./store/CartProvider";
function App() {
  const [CartIsShown,setCartIsShown] = useState(false);

  const ShowCartHandler = () =>{
    setCartIsShown(true);
  };

  const HideCartHandler = () =>{
    setCartIsShown(false);
  }

  

  return (
    <CartProvider>
      { CartIsShown && <Cart onClose={HideCartHandler} /> }
      <Header onShowCart={ShowCartHandler} />
      <main>
        <Meals  />
        <Meal2/>
      </main>
    </CartProvider>
  );
}

export default App;
