import { selector, selectorFamily } from "recoil";
import CONSTANTS from "../constants/constants";

const productsURL = `${CONSTANTS.IS_DEV ? "/proxy" : import.meta.env.VITE_FAKE_STORE_API}/products`;

interface IRating {
  readonly rate?: number;
  readonly count?: number;
}

export interface IProduct {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly price: number;
  readonly image: string;
  readonly rating: IRating;
}

export const productsList = selector<IProduct[]>({
  key: "productsList",
  get: async () => {
    try {
      const response = await fetch(productsURL);
      return (await response.json()) || [];
    } catch (error) {
      console.log(`Error: \n${error}`);
      return [];
    }
  },
});

export const productById = selectorFamily<IProduct | null, number>({
  key: "productById",
  get:
    (id: number) =>
    async ({ get }) => {
      const allProducts = get(productsList);
      return allProducts.find((p) => p.id === id) ?? null;
    },
});
