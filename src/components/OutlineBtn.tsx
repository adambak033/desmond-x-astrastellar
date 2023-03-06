import React, {
  FunctionComponent,
  MouseEventHandler,
  PropsWithChildren,
} from "react";

export const OutlineBtn: FunctionComponent<
  PropsWithChildren<{
    label: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    style?: any;
  }>
> = ({ label, onClick, style }) => {
  return (
    <button
      className="flex-no-shrink ver:bg-violet-600 rounded border-2 border-cyan-600 p-2 text-cyan-600 hover:text-white"
      onClick={onClick}
      style={style}
    >
      {label}
    </button>
  );
};
