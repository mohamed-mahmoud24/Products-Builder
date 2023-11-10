interface IProps {
    imageURL: string;
    alt: string;
    className: string;
}

const Image = ({ imageURL, alt, className }: IProps) => {
    return <img className={className} src={imageURL} alt={alt} />;
};

export default Image;
