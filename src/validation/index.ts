/**
 * Validates a product object based on specified criteria.
 *
 * @param {Object} product - The product object to be validated.
 * @param {string} product.title - The title of the product.
 * @param {string} product.description - The description of the product.
 * @param {string} product.imageURL - The URL of the product image.
 * @param {string} product.price - The price of the product.
 * @param {string[]} product.tempColor - An array of temporary colors.
 * @returns {Object} errors - An object containing validation errors.
 * @returns {string} errors.title - The error message for the title validation.
 * @returns {string} errors.description - The error message for the description validation.
 * @returns {string} errors.imageURL - The error message for the image URL validation.
 * @returns {string} errors.price - The error message for the price validation.
 * @returns {string} errors.colors - The error message for the colors validation.
 */

export const productValidation = (product: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
    tempColor?: string[] | undefined;
}) => {
    // ** Returns an object
    const errors = {
        title: "",
        description: "",
        imageURL: "",
        price: "",
        colors: "",
    };

    const imageValidation = /^(ftp|http|https):\/\/[^ "]+$/.test(
        product.imageURL
    );

    if (
        !product.title.trim() ||
        product.title.length < 10 ||
        product.title.length > 80
    ) {
        errors.title =
            "The product title must be a minimum of 10 characters and a maximum of 80 characters";
    }

    if (
        !product.description.trim() ||
        product.description.trim().length < 10 ||
        product.description.trim().length > 900
    ) {
        errors.description =
            "The product description must be a minimum of 10 characters and a maximum of 900 characters";
    }

    if (!product.imageURL.trim() || !imageValidation) {
        errors.imageURL = "Valid image URL is required";
    }

    if (!product.price.trim() || isNaN(Number(product.price))) {
        errors.price = "Valid price URL is required";
    }

    if (product.tempColor && !product.tempColor?.length) {
        errors.colors = "you should choose at least one color";
    }

    return errors;
};
