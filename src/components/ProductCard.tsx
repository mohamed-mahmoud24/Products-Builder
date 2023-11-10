import { IProduct } from "../interfaces";
import Image from "./Image";
import Button from "./UI/Button";
import { txtSlicer } from "../utils/functions";

interface IProps {
    product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
    const { title, category, colors, description, imageURL, price } = product;
    return (
        // <div className=" border border-white  text-white text-center rounded-md text-sm">
        <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3">
            <Image
                imageURL={imageURL}
                alt={category.name}
                className="rounded-md h-52 w-full lg:object-cover"
            />
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-gray-500 break-words">
                {txtSlicer(description)}
            </p>
            <div className="flex items-center flex-wrap space-x-1">
                {colors.length
                    ? colors.map((color) => (
                          <span
                              style={{
                                  background: color,
                              }}
                              key={color}
                              className="block w-5 h-5 rounded-full cursor-pointer mb-1"
                          ></span>
                      ))
                    : "Not available colors!"}
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
                >
                    EDIT
                </Button>
                <Button className="bg-red-700 hover:bg-red-900" width="w-full">
                    DELETE
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
