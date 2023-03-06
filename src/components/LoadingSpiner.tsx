import React, { FunctionComponent, PropsWithChildren } from "react";

export const LoadingSpinner: FunctionComponent<
  PropsWithChildren<{}>
> = ({}) => {
  return (
    <div className="flex items-center justify-center">
      <svg className="mr-3 h-5 w-5 animate-spin bg-black" viewBox="0 0 24 24" />
    </div>
  );
};
