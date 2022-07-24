import { MdOutlineShoppingCart } from "react-icons/md";
import { useCart } from "@contexts/CartContext";
import Cart from "@components/layout/Cart";
import styles from "@styles/layout/Navigation.module.css";
import { useState } from "react";

const Navigation = () => {
  const { cartQuantity } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.Navigation}>
      <div>
        <p>Logo</p>
      </div>
      <ul>
        <li>Products</li>
        <li onClick={() => setIsOpen(true)}>
          {cartQuantity > 0 && <span>{cartQuantity}</span>}
          <MdOutlineShoppingCart />
        </li>
      </ul>
      <Cart isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
};

export default Navigation;
