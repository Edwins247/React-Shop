import { atom, selector } from "recoil";
import { CART_ITEM } from "../constants/category";
import { productsList } from "./products";

export interface ICartInfo {
  readonly id: number;
  readonly count: number;
}

export interface ICartItems {
  readonly id: string;
  readonly title: string;
  readonly price: number;
  readonly count: number;
  readonly image: string;
}

export interface ICartState {
  readonly items?: Record<string | number, ICartInfo>;
}

/**
 * 카트의 상태는 localStorage 기준으로 초기화 됩니다.
 * 카트의 상태는 새로고침해도 유지되어야 하기 때문입니다.
 */
export const cartState = atom<ICartState>({
  key: "cart",
  default: {},
  effects: [
    ({ setSelf, onSet }) => {
      localStorage.getItem(CART_ITEM) && setSelf(JSON.parse(localStorage.getItem(CART_ITEM) as string));
      onSet((value) => localStorage.setItem(CART_ITEM, JSON.stringify(value)));
    },
  ],
});

/**
 * cartList를 구현 하세요.
 * id, image, count 등을 return합니다.
 */

export const cartList = selector<ICartItems[]>({
  key: "cartList",
  get: async ({ get }) => {
    const cart = get(cartState);
    const products = get(productsList);

    if (!cart || !cart.items) return [];

    return Object.entries(cart.items).map(([id, info]) => {
      const product = products.find((p) => p.id === Number(id));
      return {
        id,
        title: product?.title || "알 수 없음",
        price: product?.price || 0,
        image: product?.image || "",
        count: info.count,
      };
    });
  },
});

// addToCart는 구현 해보세요.
export const addToCart = (cart: ICartState, product: { id: number }): ICartState => {
  const productId = product.id;
  const prevItems = cart.items || {};

  const updatedItems = {
    ...prevItems,
    [productId]: {
      id: productId,
      count: prevItems[productId]?.count + 1 || 1,
    },
  };

  return {
    items: updatedItems,
  };
};

// removeFromCart는 참고 하세요.
export const removeFromCart = (cart: ICartState, id: string): ICartState => {
  const prevItems = { ...(cart.items || {}) };

  if (prevItems[id].count === 1) {
    delete prevItems[id];
  } else {
    prevItems[id] = {
      id: Number(id),
      count: prevItems[id].count - 1,
    };
  }

  return {
    items: prevItems,
  };
};

/**
 * 그 외에 화면을 참고하며 필요한 기능들을 구현 하세요.
 */
