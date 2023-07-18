// ! winner Jest Success
// const React = require("react");
// const {
//   render,
//   screen,
//   fireEvent,
//   waitFor,
// } = require("@testing-library/react");
// import Products from "./Components/products";
// const userEvent = require("@testing-library/user-event");
// const products = require("./mocks/products");

// const axios = require("axios");
// jest.mock("axios");

// describe("Products component", () => {
//   beforeEach(() => {
//     render(<Products />);
//   });

//   it("should display the products", async () => {
//     const restockButton = screen.getByText(/ReStock Products/i);
//     fireEvent.click(restockButton);

//     await waitFor(() => screen.getByRole("heading", { name: /Product List/i }));

//     const apples = screen.getByRole("button", { name: /apples/i });
//     const oranges = screen.getByRole("button", { name: /oranges/i });
//     const beans = screen.getByRole("button", { name: /beans/i });
//     const cabbage = screen.getByRole("button", { name: /cabbage/i });

//     expect(apples).toBeInTheDocument();
//     expect(oranges).toBeInTheDocument();
//     expect(beans).toBeInTheDocument();
//     expect(cabbage).toBeInTheDocument();
//   });
// });
// import { getProducts } from "../__mocks__/axios";

// let mockData = {
//   data: [
//     {
//       id: 1,
//       attributes: {
//         name: "apples",
//         country: "italy",
//         cost: 3,
//         instock: 10,
//       },
//     },
//     {
//       id: 2,
//       attributes: {
//         name: "oranges",
//         country: "spain",
//         cost: 4,
//         instock: 3,
//       },
//     },
//     {
//       id: 3,
//       attributes: {
//         name: "beans",
//         country: "usa",
//         cost: 2,
//         instock: 5,
//       },
//     },
//     {
//       id: 4,
//       attributes: {
//         name: "cabbage",
//         country: "usa",
//         cost: 1,
//         instock: 8,
//       },
//     },
//   ],
// };

// beforeEach(() => {
//   let mock = jest.spyOn(global, "fetch");
//   mock.mockImplementation(() =>
//     Promise.resolve({
//       json: () => Promise.resolve(mockData),
//     })
//   );
// });

// afterEach(() => {
//   jest.restoreAllMocks();
// });

// test("Making call to fetch", async () => {
//   let products = await getProducts();
//   expect(products).toEqual({
//     name: "apples",
//     country: "italy",
//     cost: 3,
//     instock: 10,
//   });
// });

// expect(fetch).toHaveBeenCalledTimes(1);
// * * * * * * * * * * * * * * * * * *
// * * * * * * * * * * * * * * * * * *
// * * * * * * * * * * * * * * * * * *
// * new code to work with
import { getProducts } from "../__mocks__/axios";
import { render } from "@testing-library/react";

jest.mock("axios", () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        data: [
          {
            id: 1,
            attributes: {
              name: "apples",
              country: "italy",
              cost: 3,
              instock: 10,
            },
          },
          {
            id: 2,
            attributes: {
              name: "oranges",
              country: "spain",
              cost: 4,
              instock: 3,
            },
          },
          {
            id: 3,
            attributes: {
              name: "beans",
              country: "usa",
              cost: 2,
              instock: 5,
            },
          },
          {
            id: 4,
            attributes: {
              name: "cabbage",
              country: "usa",
              cost: 1,
              instock: 8,
            },
          },
        ],
      },
    })
  ),
}));

test("Making call to fetch", async () => {
  let products = await getProducts();
  expect(products).toEqual([
    {
      id: 1,
      attributes: {
        name: "apples",
        country: "italy",
        cost: 3,
        instock: 10,
      },
    },
    {
      id: 2,
      attributes: {
        name: "oranges",
        country: "spain",
        cost: 4,
        instock: 3,
      },
    },
    {
      id: 3,
      attributes: {
        name: "beans",
        country: "usa",
        cost: 2,
        instock: 5,
      },
    },
    {
      id: 4,
      attributes: {
        name: "cabbage",
        country: "usa",
        cost: 1,
        instock: 8,
      },
    },
  ]);
});
