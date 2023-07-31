import clsx from "clsx";
import { Dispatch, KeyboardEventHandler, SetStateAction } from "react";

interface TextInputProps {
  value: any;
  setValue: Dispatch<SetStateAction<any>>;
  type?: string;
  label?: string;
  name?: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  onKeyDown?: KeyboardEventHandler;
  placeholder?: string;
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
  onKeyDown,
  placeholder,
}: TextInputProps) => {
  return (
    <div className={className}>
      {!!label && (
        <div className="text-xs text-gray-600">
          <label htmlFor={name}>{label}</label>
        </div>
      )}
      <input
        type={type}
        name={name}
        className={clsx(
          "w-full rounded-lg border-2 border-black p-1 ",
          inputClassName
        )}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
