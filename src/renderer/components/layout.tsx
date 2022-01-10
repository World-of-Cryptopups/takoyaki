import { ReactNode } from 'react';

type LayoutContainerProps = {
  children: ReactNode;
};
const LayoutContainer = ({ children }: LayoutContainerProps) => {
  return <div className="flex items-start justify-between">{children}</div>;
};

export default LayoutContainer;
