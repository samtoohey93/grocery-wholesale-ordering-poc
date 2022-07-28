import { useRouter } from "next/router";
import Image from "next/image";
import { useCart } from "@contexts/CartContext";
import { shopifyClient } from "@utils/shopify";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import styles from "@styles/layout/Cart.module.css";

const Cart = ({ isOpen }) => {
  // Hooks
  const router = useRouter();
  const {
    closeCart,
    cartItems,
    totalCartPrice,
    totalCartQuantity,
    increaseVariantQuantity,
    decreaseVariantQuantity,
    removeItemFromCart,
  } = useCart();

  // Handle checkout
  const handleCheckout = async () => {
    // Create a checkout
    const createCheckout = await shopifyClient.checkout.create();

    // Checkout Id
    const checkoutId = createCheckout.id;

    // Line items / items
    const lineItemsToAdd = cartItems.map((cartItem) => ({
      variantId: `gid://shopify/ProductVariant/${cartItem.variantId}`,
      quantity: cartItem.quantity,
    }));

    // Add items to check out
    const checkout = await shopifyClient.checkout.addLineItems(
      checkoutId,
      lineItemsToAdd
    );

    // Push to shopify checkout page
    router.push(checkout.webUrl);
  };

  return (
    <div>
      <div
        className={`${styles.Overlay} ${isOpen && styles.Open}`}
        onClick={closeCart}
      ></div>

      <div className={`${styles.Cart} ${isOpen && styles.Open}`}>
        <div className={styles.CartHeader}>
          <h3>
            Your cart <span>({totalCartQuantity})</span>
          </h3>
          <IoCloseOutline onClick={closeCart} />
        </div>

        <div>{!cartItems && <p>Your cart is empty</p>}</div>

        <div>
          {cartItems.map((item) => (
            <div key={item.variantId} className={styles.Item}>
              {/* Quantity */}
              <div className={styles.Quantity}>
                <AiOutlinePlus
                  className={styles.Plus}
                  onClick={() => increaseVariantQuantity(item.variantId)}
                />

                <p>{item.quantity}</p>

                <AiOutlineMinus
                  className={item.quantity > 1 && styles.Enabled}
                  onClick={() =>
                    item.quantity > 1 && decreaseVariantQuantity(item.variantId)
                  }
                />
              </div>

              {/* Image */}
              <div className={styles.Image}>
                <Image
                  src={item.variantImage}
                  width={16}
                  height={10}
                  layout="responsive"
                />
              </div>

              {/* Content */}
              <div className={styles.Content}>
                <p>
                  {item.name} - <span>{item.variantName}</span>
                </p>
                <small>
                  ${item.variantPrice} x {item.quantity}
                </small>
                <p>${item.price}</p>
              </div>

              {/* Delete */}
              <div className={styles.Delete}>
                <IoCloseOutline
                  onClick={() => removeItemFromCart(item.variantId)}
                />
              </div>
            </div>
          ))}
        </div>
        <button className={styles.Checkout} onClick={handleCheckout}>
          Checkout Now (${totalCartPrice})
        </button>
      </div>
    </div>
  );
};

export default Cart;
