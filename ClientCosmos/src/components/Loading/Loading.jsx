import React from "react";
import { tailspin } from "ldrs";

function Loading() {
  tailspin.register();

  return (
    <div>
      <l-tailspin size="40" stroke="5" speed="0.9" color="black"></l-tailspin>
    </div>
  );
}

export default Loading;
