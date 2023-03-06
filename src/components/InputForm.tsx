import React, {
  ChangeEventHandler,
  FunctionComponent,
  PropsWithChildren,
} from "react";

export const InputForm: FunctionComponent<
  PropsWithChildren<{
    placeholder: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
  }>
> = ({ placeholder, value, onChange }) => {
  return (
    <input
      value={value}
      className="text-grey-darker mr-4 w-full appearance-none rounded border py-2 px-3 shadow"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
