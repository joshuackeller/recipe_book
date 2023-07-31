import { Dispatch, SetStateAction } from "react";
import { Switch } from "@headlessui/react";

interface ToggleProps {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  label?: string;
}

const Toggle = ({ value, setValue, label }: ToggleProps) => {
  return (
    <div>
      {!!label && (
        <div className="text-xs text-gray-600">
          <label>{label}</label>
        </div>
      )}
      <Switch
        checked={value}
        onChange={setValue}
        className={`${
          value ? "bg-black border-black" : "bg-gray-700 border-gray-700"
        }
          relative inline-flex h-[26px] w-[50px]  cursor-pointer rounded-full border-2  transition-colors duration-200 ease-in-out   `}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${
            value ? "translate-x-6 " : "  translate-x-0 bg-gray-200"
          }
          bg-white pointer-events-none inline-block h-[22px] w-[22px]  transform rounded-full shadow-lg  transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
};

export default Toggle;
