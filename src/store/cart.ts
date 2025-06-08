import { atom, selector, selectorFamily } from "recoil";
import { CART_ITEM } from "../constants/category";
import { productById } from "./products";

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

export const cartState = atom<ICartState>({
  key: "cart",
  default: {},
  effects: [
    ({ setSelf, onSet }) => {
      const stored = localStorage.getItem(CART_ITEM);
      if (stored) setSelf(JSON.parse(stored));
      onSet((value) => localStorage.setItem(CART_ITEM, JSON.stringify(value)));
    },
  ],
});

export const cartList = selector<ICartItems[]>({
  key: "cartList",
  get: ({ get }) => {
    const cart = get(cartState);
    if (!cart || !cart.items) return [];

    return Object.entries(cart.items).map(([id, info]) => {
      const product = get(productById(Number(id)));
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
