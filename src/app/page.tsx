import React from "react";
import { styled } from "../../styled-system/jsx";
import { css } from "../../styled-system/css";
import { circle } from "../../styled-system/patterns";

const HomePage = async () => {
  const res = await fetch("http://localhost:3000/api");
  const { skaters } = await res.json();

  return (
    <>
      <styled.header display="flex" bg="palegoldenrod">
        <styled.h1
          fontSize={{
            base: "lg",
            md: "xl",
          }}
        >
          hello world
        </styled.h1>
      </styled.header>
      <table
        className={css({
          "& td": {
            pt: 4,
            pb: 4,
          },
        })}
      >
        <thead>
          <tr>
            <th>avatar</th>
            <th>name</th>
            <th>cost</th>
          </tr>
        </thead>
        <tbody>
          {skaters.map((skater) => {
            return (
              <tr key={skater.id}>
                <td>
                  <img
                    className={circle({
                      size: 10,
                      borderStyle: "solid",
                      borderWidth: 3,
                      borderColor: "blue.500",
                    })}
                    src={skater.avatar}
                    alt={skater.name}
                  />
                </td>
                <td>{skater.name}</td>
                <td>${skater.score * 100}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default HomePage;
