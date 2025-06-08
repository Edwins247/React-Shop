import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState, cartList, addToCart, removeFromCart } from "../../store/cart";
import { toCurrencyFormat } from "../../helpers/helpers";
import { startTransition } from "react";

const CartList = (): JSX.Element => {
  const [cart, setCart] = useRecoilState(cartState);
  const items = useRecoilValue(cartList);

  const addToCartHandler = (id: number) => {
    startTransition(() => {
      setCart(addToCart(cart, { id }));
    });
  };

  const removeFromCartHandler = (id: number) => {
    startTransition(() => {
      setCart(removeFromCart(cart, id.toString()));
    });
  };

  return (
    <>
      {items.map((item) => (
        <div key={item.id} className="lg:flex lg:items-center mt-4 px-2 lg:px-0">
          <Link to={`/product/${item.id}`}>
            <figure className="w-56 min-w-full flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white">
              <img src={item.image} alt={item.title} className="object-contain w-full h-48" />
            </figure>
          </Link>
          <div className="card-body px-1 lg:px-12">
            <h2 className="card-title">
              <Link className="link link-hover" to={`/product/${item.id}`}>
                {item.title}
              </Link>
            </h2>
            <p className="mt-2 mb-4 text-3xl">
              {toCurrencyFormat(item.price * item.count)}{" "}
              <span className="text-2xl">({toCurrencyFormat(item.price)})</span>
            </p>
            <div className="card-actions">
              <div className="btn-group">
                <button className="btn btn-primary" onClick={() => removeFromCartHandler(Number(item.id))}>
                  -
                </button>
                <button className="btn btn-ghost no-animation">{item.count}</button>
                <button className="btn btn-primary" onClick={() => addToCartHandler(Number(item.id))}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartList;
