import { ChangeEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/UI/Modal";
import { formInputsList, productList } from "./data";
import Button from "./components/UI/Button";
import Input from "./components/UI/Input";
import { IProduct } from "./interfaces";

const App = () => {
    /* STATE */
    const [product, setProduct] = useState<IProduct>({
        title: "",
        description: "",
        imageURL: "",
        price: "",
        colors: [],
        category: {
            name: "",
            imageURL: "",
        },
    });
    const [isOpen, setIsOpen] = useState(false);

    /* HANDLER */
    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setProduct({ ...product, [name]: value });
    };

    /* RENDER */
    const renderProductList = productList.map((product) => (
        <ProductCard product={product} key={product.id} />
    ));
    const renderFormInputList = formInputsList.map((input) => (
        <div key={input.id} className="flex flex-col">
            <label
                className="mb-1 text-sm font-medium text-gray-700"
                htmlFor={input.id}
            >
                {input.label}
            </label>
            <Input
                type="text"
                id={input.id}
                name={input.name}
                value={product[input.name]}
                onChange={onChangeHandler}
            />
        </div>
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
                <form className="space-y-3">
                    {renderFormInputList}

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
                </form>
            </Modal>
        </main>
    );
};

export default App;
