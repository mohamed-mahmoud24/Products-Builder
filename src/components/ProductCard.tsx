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
        <div className="border rounded-md p-2 flex flex-col mb-4 max-w-sm md:max-w-lg mx-auto md:mx-0">
            <Image
                imageURL={imageURL}
                alt={category.name}
                className="rounded-md h-52 w-full lg:object-cover"
            />
            <h3>{title}</h3>
            <p>{txtSlicer(description)}</p>
            <div className="flex space-x-2 items-center my-5">
                {colors.length
                    ? colors.map((color) => (
                          <span
                              style={{
                                  background: color,
                              }}
                              className="w-5 h-5 rounded-full cursor-pointer"
                          ></span>
                      ))
                    : "Not available colors!"}
            </div>
            <div className="flex items-center justify-between">
                <span>${price}</span>
                <Image
                    className="w-10 h-10 rounded-full object-cover"
                    imageURL={category.imageURL}
                    alt={category.name}
                />
            </div>
            <div className="flex items-center justify-between space-x-2 mt-5">
                <Button className="bg-indigo-700 " width="w-full">
                    EDIT
                </Button>
                <Button className="bg-red-700 " width="w-full">
                    DELETE
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
