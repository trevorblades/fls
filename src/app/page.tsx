import React from "react";
import { styled } from "../../styled-system/jsx";

const HomePage = () => {
  return (
    <styled.div bg="palegoldenrod">
      <styled.h1
        fontSize={{
          base: "lg",
          md: "xl",
        }}
      >
        hello world
      </styled.h1>
    </styled.div>
  );
};

export default HomePage;
