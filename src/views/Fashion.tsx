import { useRecoilValueLoadable } from "recoil";
import { productsList } from "../store/products";
import ItemList from "../components/common/ItemList";
import ProductsLoad from "../components/products/ProductsLoad";
import BreadCrumb from "../components/common/Breadcrumb";
import { MENUS } from "../constants/category";

const Fashion = (): JSX.Element => {
  const productsLoadable = useRecoilValueLoadable(productsList);

  const getFashionItems = () => {
    if (productsLoadable.state !== "hasValue") return null;
    return productsLoadable.contents.filter(
      (p) => p.category === "men's clothing" || p.category === "women's clothing"
    );
  };

  return (
    <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      <BreadCrumb category={MENUS.HOME} crumb={MENUS.FASHION} />
      <article className="pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
        {productsLoadable.state !== "hasValue" ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductsLoad limit={10} />
          </div>
        ) : (
          <ItemList title="패션" products={getFashionItems()!} />
        )}
      </article>
    </section>
  );
};

export default Fashion;
