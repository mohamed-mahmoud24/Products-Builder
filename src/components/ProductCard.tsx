import { IProduct } from "../interfaces";
import Image from "./Image";
import Button from "./UI/Button";
import { txtSlicer } from "../utils/functions";
import CircleColor from "./UI/CircleColor";

interface IProps {
    product: IProduct;
    setProductToEdit: (product: IProduct) => void;
    openEditModal: () => void;
    idx: number;
    setProductToEditIdx: (value: number) => void;
    setTempColor: (value: string[]) => void;
}

const ProductCard = ({
    product,
    openEditModal,
    setProductToEdit,
    idx,
    setProductToEditIdx,
    setTempColor,
}: IProps) => {
    const { title, category, colors, description, imageURL, price } = product;

    /* Render */
    const renderProductColors = colors.length
        ? colors.map((color) => <CircleColor color={color} key={color} />)
        : "Not available colors!";

    /* Handler */
    const onEdit = () => {
        setProductToEdit(product);
        openEditModal();
        setProductToEditIdx(idx);
        setTempColor(colors);
    };

    return (
        <div className="max-w-sm w-full md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col">
            <Image
                imageURL={imageURL}
                alt={category.name}
                className="rounded-md h-52 w-full lg:object-cover"
            />
            <h3 className=" text-lg mb-auto mt-2 font-semibold">{title}</h3>
            <div className="mt-2 space-y-3">
                <p className="text-sm text-gray-500 break-words">
                    {txtSlicer(description)}
                </p>
                <div className="flex items-center flex-wrap space-x-1">
                    {renderProductColors}
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-lg text-indigo-600 font-semibold">
                        ${price}
                    </span>
                    <div className="flex space-x-1 items-center">
                        <span>{category.name}</span>
                        <Image
                            className="w-10 h-10 rounded-full object-cover"
                            imageURL={category.imageURL}
                            alt={category.name}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between space-x-2 mt-5">
                    <Button
                        className="bg-indigo-700 hover:bg-indigo-900"
                        width="w-full"
                        onClick={onEdit}
                    >
                        EDIT
                    </Button>
                    <Button
                        className="bg-red-700 hover:bg-red-900"
                        width="w-full"
                    >
                        DELETE
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
