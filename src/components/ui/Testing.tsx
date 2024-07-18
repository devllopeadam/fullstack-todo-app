import { useState } from "react";
type Props = {
  children: React.ReactNode;
};

const Testing = ({ children }: Props) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <h1>Jeniah Adam</h1>
      <button onClick={() => setShow(!show)}>Click Me Please</button>
      {children}
    </div>
  );
};

export default Testing;
