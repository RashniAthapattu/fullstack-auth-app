import './index.scss';
import { ReactNode } from 'react';

type LoaderProps = {
  children: ReactNode;
  loading: boolean;
};

const Loader = ({ children, loading }: LoaderProps) => (
  <>
    <div
      className="opaque-loader-wrapper"
      style={{ display: loading ? 'flex' : 'none' }}
    >
      <div className="lds-roller">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
    {children}
  </>
);
export default Loader;
