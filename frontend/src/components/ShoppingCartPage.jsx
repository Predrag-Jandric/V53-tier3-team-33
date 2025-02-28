import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  setCart,
} from "../utils/shoppingSlice";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Modal from "../utils/Modal.jsx";
import useModal from "../utils/useModal.jsx";
import { useEffect } from "react";
import Title from "./Title.jsx";
import { IoIosArrowBack } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import Button from "../utils/Button.jsx";

function ShoppingCartPage() {
  const cart = useSelector((state) => state.shopping.inCart);
  const dispatch = useDispatch();
  const { isOpen, openModal, closeModal, handleClickOutside } = useModal();

  // when loading component, if cart in state, save to localStorage
  // if no cart state (i.e. navigate directly to page), load stored cart as state
  useEffect(() => {
    if (cart.length) localStorage.setItem("dinoCart", JSON.stringify(cart));
    else {
      const dinoCart = localStorage.getItem("dinoCart");
      if (dinoCart) dispatch(setCart(JSON.parse(dinoCart)));
    }
  }, [cart]);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    openModal();
  };

  const handleClearCart = () => {
    localStorage.removeItem("dinoCart");
    dispatch(clearCart());
  };

  return (
    <section className="bg-bgcolor text-dark font-body min-h-text-[1.05rem]p-6 flex flex-col items-center">
      {/* DONE */}
      {/* <article className="w-full max-w-4xl flex mb-10 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/shoppingCartPage"
            className="p-3 rounded-custom hover:bg-primary/5 text-primary border-primary/60 border-2 text-lg transition-all disabled:hover:bg-transparent disabled:cursor-not-allowed disabled:border-gray-400/50 disabled:text-gray-400/50"
          >
            <IoIosArrowBack className="size-5 font-extrabold" />
          </Link>
          <span>Back</span>
        </div>

        <Title className="pb-0 mx-auto" title="Your Shopping Cart" />
      </article> */}

      <ToastContainer />

      {cart.length === 0 ? (
        // <div className="mt-10 text-center flex flex-col items-center">
        //   <Title className="" title="Cart is empty 🤷‍♂️" />

        //   <Link
        //     to="/"
        //     className="flex w-fit flex-row items-center gap-3 p-3 rounded-custom hover:bg-primary/5 text-primary border-primary/60 border-2 text-lg transition-all disabled:hover:bg-transparent disabled:cursor-not-allowed disabled:border-gray-400/50 disabled:text-gray-400/50"
        //   >
        //     <IoIosArrowBack className="size-5 font-extrabold" />
        //     <span>Back to Homepage</span>
        //   </Link>
        // </div>
        <p>DELETE</p>
      ) : (
        <div className="w-full max-w-4xl space-y-6">
          {/* Table Layout */}
          <div className="overflow-x-auto rounded-custom border border-grayOne/50 shadow-custom hover:shadow-xl transition">
            <table className="w-full bg-white shadow-custom rounded-custom overflow-hidden">
              <thead className="bg-bgcolortwo">
                <tr>
                  <th className="p-3 text-[1.05rem] text-left font-semibold">
                    Product
                  </th>
                  <th className="p-3 text-[1.05rem] text-center font-semibold">
                    Price
                  </th>
                  <th className="p-3 text-[1.05rem] text-center font-semibold">
                    Quantity
                  </th>
                  <th className="p-3 text-[1.05rem] text-center font-semibold">
                    Total
                  </th>
                  <th className="p-3 text-[1.05rem] text-center font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="">
                    {/* Product (Image + Name) */}
                    <td className="p-3 flex items-center gap-3">
                      <img
                        src={item.imageSrc}
                        alt="dino"
                        className="w-20 h-20 object-contain"
                      />
                      <span>{item.name}</span>
                    </td>

                    {/* Price */}
                    <td className="p-3 text-center text-light">
                      ${item.price.toFixed(2)}
                    </td>

                    {/* Quantity Controls */}
                    {/* <td className="p-3 text-center">
                      <div className="flex border mx-auto border-grayOne w-fit items-center justify-center ">
                        <button
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          disabled={item.quantity === 1}
                          className={`h-8 w-8 border-r font-extrabold border-grayOne flex items-center justify-center transition 
                          ${item.quantity === 1 && "cursor-not-allowed bg-gray-200"}`}
                        >
                          −
                        </button>
                        <span className="w-10">{item.quantity}</span>

                        <button
                          disabled={item.inStock === 0}
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          className={`h-8 w-8 border-l font-extrabold border-grayOne flex items-center justify-center transition 
                            ${item.inStock === 0 && "cursor-not-allowed bg-gray-200"}`}
                        >
                          +
                        </button>
                      </div>
                    </td> */}

                    {/* Total Price */}
                    <td className="p-3 text-center">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>

                    {/* Remove Button */}
                    <td className="p-3 text-center">
                      <button onClick={() => dispatch(removeFromCart(item.id))}>
                        <IoCloseOutline className="text-dark/60 size-10 p-1" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Summary */}
          <div className="mt-6 text-right flex justify-between">
            <button
              onClick={handleClearCart}
              className="rounded bg-primary px-4 py-2 text-light transition duration-200 hover:bg-highlight"
            >
              Clear Cart
            </button>
            <h2 className="text-2xl ">Total: ${totalPrice.toFixed(2)}</h2>
          </div>

          {/* Action Buttons */}
            <Button
              onClick={handleCheckout}
              className={}
            >
              Checkout
            </Button>
          
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <Modal
          content={
            <div className="flex flex-col gap-10 text-center">
              <h1 className="text-xl">You cannot really buy these items.</h1>
              <button
                onClick={closeModal}
                className="mt-4 rounded bg-primary px-4 py-2 text-white transition duration-200 hover:bg-primaryHover"
              >
                Close
              </button>
            </div>
          }
          onClose={closeModal}
          handleClickOutside={handleClickOutside}
        />
      )}
    </section>
  );
}

export default ShoppingCartPage;
