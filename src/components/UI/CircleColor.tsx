import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
    color: string;
}

const CircleColor = ({ color, ...rest }: IProps) => {
    return (
        <span
            style={{
                background: color,
            }}
            key={color}
            className="block w-5 h-5 rounded-full cursor-pointer mb-1"
            {...rest}
        />
    );
};

export default CircleColor;
