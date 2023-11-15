import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";

import { formInputsList, productList, colors, categories } from "./data";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";

import Button from "./components/UI/Button";
import Input from "./components/UI/Input";
import ProductCard from "./components/ProductCard";
import Modal from "./components/UI/Modal";
import ErrorMessage from "./components/UI/ErrorMessage";
import CircleColor from "./components/UI/CircleColor";
import Select from "./components/UI/Select";
import { ProductNameTypes } from "./types";

const App = () => {
    const defaultErrorMessage = {
        title: "",
        description: "",
        imageURL: "",
        price: "",
        colors: "",
    };
    const defaultProductObj = {
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
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [products, setProducts] = useState(productList);
    const [product, setProduct] = useState<IProduct>(defaultProductObj);
    const [productToEdit, setProductToEdit] =
        useState<IProduct>(defaultProductObj);
    const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
    const [errors, setErrors] = useState(defaultErrorMessage);
    const [tempColor, setTempColor] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);

    /* HANDLER */
    const closeModal = () => setIsOpen(false);

    const openModal = () => setIsOpen(true);

    const closeEditModal = () => {
        setIsOpenEditModal(false);
        setErrors(defaultErrorMessage);
    };

    const openEditModal = () => setIsOpenEditModal(true);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setProduct({ ...product, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };
    const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setProductToEdit({ ...productToEdit, [name]: value });
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
            tempColor,
        });

        const hasErrorMsg = Object.values(errors).every(
            (value) => value === ""
        );

        if (!hasErrorMsg) {
            setErrors(errors);
            return;
        }

        setProducts((prev) => [
            {
                ...product,
                id: uuid(),
                colors: tempColor,
                category: selectedCategory,
            },
            ...prev,
        ]);
        setProduct(defaultProductObj);
        setTempColor([]);
        closeModal();
    };
    const submitEditHandler = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const { title, description, imageURL, price } = productToEdit;
        const errors = productValidation({
            title,
            description,
            imageURL,
            price,
            tempColor,
        });

        const hasErrorMsg = Object.values(errors).every(
            (value) => value === ""
        );

        if (!hasErrorMsg) {
            setErrors(errors);
            return;
        }

        const updatedProducts = [...products];
        updatedProducts[productToEditIdx] = {
            ...productToEdit,
            colors: [...tempColor],
        };
        setProducts(updatedProducts);

        setProductToEdit(defaultProductObj);
        setTempColor([]);
        closeEditModal();
    };

    const onCancle = () => {
        setProduct(defaultProductObj);
        setErrors(defaultErrorMessage);
        setTempColor([]);
        closeModal();
    };

    /* RENDER */
    const renderProductList = products.map((product, idx) => (
        <ProductCard
            setTempColor={setTempColor}
            openEditModal={openEditModal}
            product={product}
            key={product.id}
            setProductToEdit={setProductToEdit}
            setProductToEditIdx={setProductToEditIdx}
            idx={idx}
        />
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

    const renderProductColors = colors.map((color) => (
        <CircleColor
            color={color}
            key={color}
            onClick={() => {
                if (tempColor.includes(color))
                    setTempColor((prev) =>
                        prev.filter((item) => item !== color)
                    );
                else {
                    setTempColor((prev) => [...prev, color]);
                    setErrors({ ...errors, colors: "" });
                }
            }}
        />
    ));

    const renderTempColor = tempColor.map((color) => (
        <span
            key={color}
            style={{ background: color }}
            className="p-1 me-1 mb-1 rounded-md text-xs text-white"
        >
            {color}
        </span>
    ));
    const renderproductToEditColor = tempColor.map((color) => (
        <span
            key={color}
            style={{ background: color }}
            className="p-1 me-1 mb-1 rounded-md text-xs text-white"
        >
            {color}
        </span>
    ));

    const renderProductEditWithErrorMsg = (
        id: string,
        label: string,
        name: ProductNameTypes
    ) => {
        return (
            <div className="flex flex-col">
                <label
                    className="mb-1 text-sm font-medium text-gray-700"
                    htmlFor={id}
                >
                    {label}
                </label>
                <Input
                    type="text"
                    id={id}
                    name={name}
                    value={productToEdit[name]}
                    onChange={onChangeEditHandler}
                />
                <ErrorMessage msg={errors[name]} />
            </div>
        );
    };

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
            {/* ADD PRODUCT */}
            <Modal
                title="ADD A NEW PRODUCT"
                closeModal={closeModal}
                isOpen={isOpen}
            >
                <form className="space-y-3" onSubmit={submitHandler}>
                    {renderFormInputList}
                    <Select
                        selected={selectedCategory}
                        setSelected={setSelectedCategory}
                    />
                    <div className=" flex space-x-1">{renderProductColors}</div>
                    <ErrorMessage msg={errors.colors} />

                    <div className="flex-wrap flex">{renderTempColor}</div>
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
            {/* EDIT PRODUCT */}
            <Modal
                title="EDIT THIS PRODUCT"
                closeModal={closeEditModal}
                isOpen={isOpenEditModal}
            >
                <form className="space-y-3" onSubmit={submitEditHandler}>
                    {renderProductEditWithErrorMsg(
                        "title",
                        "Product Title",
                        "title"
                    )}
                    {renderProductEditWithErrorMsg(
                        "description",
                        "Product Description",
                        "description"
                    )}
                    {renderProductEditWithErrorMsg(
                        "imageURL",
                        "Product Image URL",
                        "imageURL"
                    )}
                    {renderProductEditWithErrorMsg(
                        "price",
                        "Product price",
                        "price"
                    )}
                    <Select
                        selected={productToEdit.category}
                        setSelected={(value) =>
                            setProductToEdit({
                                ...productToEdit,
                                category: value,
                            })
                        }
                    />
                    <div className=" flex space-x-1">{renderProductColors}</div>
                    <ErrorMessage msg={errors.colors} />

                    <div className="flex-wrap flex">
                        {renderproductToEditColor}
                    </div>
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
                            onClick={closeEditModal}
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
