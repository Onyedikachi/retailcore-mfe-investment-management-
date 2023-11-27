import { forwardRef } from "react";
import clsx from "clsx";
import { BiLoaderAlt } from "react-icons/bi";

type Ref = HTMLButtonElement;

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  as?: React.ElementType;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset"; // Add the default value for type prop
};

const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const {
    as: Component = "button", // Use "button" as default if as prop is not provided
    type = "button",
    className,
    children,
    isLoading,
    disabled,
    ...rest
  } = props;
  const merged = clsx("btn", className);

  return (
    <Component
      ref={ref}
      type={type}
      className={merged}
      {...rest}
      disabled={disabled}
    >
      {children}
      {isLoading && (
        <span>
          <BiLoaderAlt data-testid="loader" className="animate-spin" />
        </span>
      )}
    </Component>
  );
});

Button.displayName = "Button";
export default Button;
