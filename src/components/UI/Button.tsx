import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    width?: "w-full" | "w-fit";
}

const Button = ({ children, className, width = "w-fit", ...rest }: IProps) => {
    return (
        <button
            className={`${className} ${width} text-white p-3  rounded-md `}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
