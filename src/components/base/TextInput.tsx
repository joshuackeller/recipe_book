import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

interface TextInputProps {
  value: any;
  setValue: Dispatch<SetStateAction<any>>;
  type?: string;
  label?: string;
  name?: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
}

const TextInput = ({
  value,
  setValue,
  type = "text",
  className,
  label,
  inputClassName,
  name,
  disabled,
}: TextInputProps) => {
  return (
    <div className={className}>
      {!!label && (
        <div className="text-xs text-gray-600">
          {" "}
          <label htmlFor={name}>{label}</label>
        </div>
      )}
      <input
        type={type}
        name={name}
        className={clsx("rounded border border-gray-400 p-1", inputClassName)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};

export default TextInput;
