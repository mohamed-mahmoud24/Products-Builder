import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/UI/Modal";
import { productList } from "./data";
import Button from "./components/UI/Button";

const App = () => {
    /* STATE */
    const [isOpen, setIsOpen] = useState(false);

    /* HANDLER */
    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }
    const renderProductList = productList.map((product) => (
        <ProductCard product={product} key={product.id} />
    ));
    return (
        <main className="container ">
            <Button
                className="bg-indigo-700 hover:bg-indigo-800 "
                width="w-full"
                onClick={() => openModal()}
            >
                ADD
            </Button>
            <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 m-5 p-2 rounded-md">
                {renderProductList}
            </div>
            <Modal
                title="ADD A NEW PRODUCT"
                closeModal={closeModal}
                isOpen={isOpen}
            >
                <div className="flex items-center space-x-3">
                    <Button
                        className="bg-indigo-700 hover:bg-indigo-900"
                        width="w-full"
                    >
                        SUBMIT
                    </Button>
                    <Button
                        className="bg-gray-400 hover:bg-gray-500"
                        width="w-full"
                        onClick={() => closeModal()}
                    >
                        CANCEL
                    </Button>
                </div>
            </Modal>
        </main>
    );
};

export default App;
