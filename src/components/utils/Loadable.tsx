import { Suspense } from "react";
import Loading from "../Loading/Loading";

interface LoadableProps {
  Component: React.FC;
}

const Loadable = ({ Component }: LoadableProps) => (
  <Suspense fallback={<Loading fullPage text="Please wait..." />}>
    <Component />
  </Suspense>
);

export default Loadable;
