import { useRecoilValueLoadable } from "recoil";
import { productsList } from "../store/products";
import ItemList from "../components/common/ItemList";
import ProductsLoad from "../components/products/ProductsLoad";
import BreadCrumb from "../components/common/Breadcrumb";
import { MENUS } from "../constants/category";

const Digital = (): JSX.Element => {
  const productsLoadable = useRecoilValueLoadable(productsList);

  const getDigitalItems = () => {
    if (productsLoadable.state !== "hasValue") return null;
    return productsLoadable.contents.filter((p) => p.category === "electronics");
  };

  return (
    <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      <BreadCrumb category={MENUS.HOME} crumb={MENUS.DIGITAL} />
      <article className="pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
        {productsLoadable.state !== "hasValue" ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductsLoad limit={6} />
          </div>
        ) : (
          <ItemList title="디지털" products={getDigitalItems()!} />
        )}
      </article>
    </section>
  );
};

export default Digital;
