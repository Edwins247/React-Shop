import { Link } from "react-router-dom";
import BreadCrumb from "../common/Breadcrumb";
import Confirm from "../common/Confirm";
import CartList from "./CartList";
import { useRecoilValue } from "recoil";
import { cartList } from "../../store/cart";
import { toCurrencyFormat } from "../../helpers/helpers";
import { MENUS } from "../../constants/category";

const CartView = (): JSX.Element => {
  const items = useRecoilValue(cartList);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.count, 0);
  const isEmpty = items.length === 0;

  return (
    <>
      <BreadCrumb category={MENUS.HOME} crumb={MENUS.CART} />

      <div className="mt-6 md:mt-14 px-2 lg:px-0">
        {isEmpty && (
          <div>
            <h1 className="text-2xl">장바구니에 물품이 없습니다.</h1>
            <Link to="/" className="btn btn-primary mt-10">
              담으러 가기
            </Link>
          </div>
        )}

        <div className="lg:flex justify-between mb-20">
          <div>{!isEmpty && <CartList />}</div>

          <div className="self-start shrink-0 flex items-center mt-10 mb-20">
            <span className="text-xl md:text-2xl">총 : {toCurrencyFormat(totalPrice)}</span>
            <label htmlFor="confirm-modal" className="modal-button btn btn-primary ml-5">
              구매하기
            </label>
          </div>
        </div>
      </div>

      <Confirm />
    </>
  );
};

export default CartView;
