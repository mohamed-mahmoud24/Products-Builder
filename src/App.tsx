import ProductCard from "./components/ProductCard";
import { productList } from "./data";
const App = () => {
    const renderProductList = productList.map((product) => (
        <ProductCard product={product} key={product.id} />
    ));
    return (
        <main className="container ">
            <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 m-5 p-2 rounded-md">
                {renderProductList}
            </div>
        </main>
    );
};

export default App;
