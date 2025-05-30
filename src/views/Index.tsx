import { useRecoilValueLoadable } from "recoil";
import { productsList } from "../store/products";
import Slider from "../components/common/Slider";
import ItemList from "../components/common/ItemList";
import ProductsLoad from "../components/products/ProductsLoad";

const Index = (): JSX.Element => {
  const productsLoadable = useRecoilValueLoadable(productsList);

  if (productsLoadable.state !== "hasValue") {
    return (
      <>
        <Slider />
        <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mt-10 xl:container mx-auto">
          <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">패션</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductsLoad limit={4} />
          </div>
        </section>
        <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
          <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">액세서리</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductsLoad limit={4} />
          </div>
        </section>
        <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
          <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">디지털</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductsLoad limit={4} />
          </div>
        </section>
      </>
    );
  }

  const allProducts = productsLoadable.contents;

  const fashion = allProducts
    .filter((p) => p.category === "men's clothing" || p.category === "women's clothing")
    .slice(0, 4);
  const accessory = allProducts.filter((p) => p.category === "jewelery").slice(0, 4);
  const digital = allProducts.filter((p) => p.category === "electronics").slice(0, 4);

  return (
    <>
      <Slider />
      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mt-10 xl:container mx-auto">
        <ItemList title="패션" products={fashion} />
      </section>
      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
        <ItemList title="액세서리" products={accessory} />
      </section>
      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
        <ItemList title="디지털" products={digital} />
      </section>
    </>
  );
};

export default Index;
