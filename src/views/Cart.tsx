import { Suspense } from "react";
import CartView from "../components/carts/CartView";

const Cart = (): JSX.Element => {
  return (
    <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      <Suspense fallback={<div>장바구니 정보를 불러오는 중입니다...</div>}>
        <CartView />
      </Suspense>
    </section>
  );
};

export default Cart;
