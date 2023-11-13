import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/UI/Modal";
import { formInputsList, productList } from "./data";
import Button from "./components/UI/Button";
import Input from "./components/UI/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/UI/ErrorMessage";

const App = () => {
    const defaultErrorMessage = {
        title: "",
        description: "",
        imageURL: "",
        price: "",
    };
    const defaultProducts = {
        title: "",
        description: "",
        imageURL: "",
        price: "",
        colors: [],
        category: {
            name: "",
            imageURL: "",
        },
    };
    /* STATE */
    const [product, setProduct] = useState<IProduct>(defaultProducts);
    const [errors, setErrors] = useState(defaultErrorMessage);
    const [isOpen, setIsOpen] = useState(false);

    /* HANDLER */
    const closeModal = () => {
        setIsOpen(false);
        setErrors(defaultErrorMessage);
    };

    const openModal = () => setIsOpen(true);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setProduct({ ...product, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const { title, description, imageURL, price } = product;
        const errors = productValidation({
            title,
            description,
            imageURL,
            price,
        });

        const hasErrorMsg = Object.values(errors).every(
            (value) => value === ""
        );

        if (!hasErrorMsg) {
            setErrors(errors);
            return;
        }

        console.log("SEND THIS PRODUCT TO OUR SERVER");
    };

    const onCancle = () => {
        setProduct(defaultProducts);
        closeModal();
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
            <ErrorMessage msg={errors[input.name]} />
        </div>
    ));

    return (
        <main className="container ">
            <Button
                className="block bg-indigo-700 hover:bg-indigo-800 mx-auto my-10 px-10 font-medium"
                onClick={openModal}
                width="w-fit"
            >
                Build Product
            </Button>

            <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 m-5 p-2 rounded-md">
                {renderProductList}
            </div>
            <Modal
                title="ADD A NEW PRODUCT"
                closeModal={closeModal}
                isOpen={isOpen}
            >
                <form className="space-y-3" onSubmit={submitHandler}>
                    {renderFormInputList}

                    <div className="flex items-center space-x-3">
                        <Button
                            className="bg-indigo-700 hover:bg-indigo-900"
                            width="w-full"
                        >
                            SUBMIT
                        </Button>
                        <Button
                            type="button"
                            className="bg-gray-400 hover:bg-gray-500"
                            width="w-full"
                            onClick={onCancle}
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
