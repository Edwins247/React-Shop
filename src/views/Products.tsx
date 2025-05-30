import { useParams } from "react-router-dom";
import { useRecoilValueLoadable, useRecoilState } from "recoil";
import { productsList } from "../store/products";
import { cartState, addToCart } from "../store/cart";
import ProductsView from "../components/products/ProductsView";
import ProductsViewLoad from "../components/products/ProductsViewLoad";
import BreadCrumb from "../components/common/Breadcrumb";
import { Category } from "../constants/category";

const Products = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const [cart, setCart] = useRecoilState(cartState);
  const productsLoadable = useRecoilValueLoadable(productsList);

  const getProduct = () => {
    if (productsLoadable.state !== "hasValue") return null;
    return productsLoadable.contents.find((p) => p.id === productId) || null;
  };

  const product = getProduct();

  const handleAddToCart = () => {
    if (!product) return;
    setCart(addToCart(cart, product));
  };

  return (
    <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      {product ? (
        <>
          <BreadCrumb category={Category[product.category]} crumb={product.title} />
          <ProductsView product={product} onAddToCart={handleAddToCart} />
        </>
      ) : productsLoadable.state === "loading" ? (
        <ProductsViewLoad />
      ) : (
        <div className="text-center py-10">상품을 찾을 수 없습니다.</div>
      )}
    </section>
  );
};

export default Products;
