const ProductsViewLoad = (): JSX.Element => {
  return (
    <section className="pt-8 pb-12 px-4 xl:container mx-auto animate-pulse">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 h-[500px] bg-gray-100 rounded"></div>

        <div className="w-full lg:w-1/2 space-y-6">
          <div className="h-8 bg-gray-100 rounded w-3/4"></div>
          <div className="h-6 bg-gray-100 rounded w-1/2"></div>
          <div className="h-6 bg-gray-100 rounded w-1/3"></div>
          <div className="h-36 bg-gray-100 rounded w-full"></div>
          <div className="h-12 w-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    </section>
  );
};

export default ProductsViewLoad;
