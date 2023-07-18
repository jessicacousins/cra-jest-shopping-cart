// ! Winner Jest working code:
// const mockResponse = {
//   data: {
//     data: [
//       {
//         attributes: {
//           name: "apples",
//           country: "italy",
//           cost: 3,
//           instock: 10,
//         },
//       },
//       {
//         attributes: {
//           name: "oranges",
//           country: "spain",
//           cost: 4,
//           instock: 3,
//         },
//       },
//       {
//         attributes: {
//           name: "beans",
//           country: "usa",
//           cost: 2,
//           instock: 5,
//         },
//       },
//       {
//         attributes: {
//           name: "cabbage",
//           country: "usa",
//           cost: 1,
//           instock: 8,
//         },
//       },
//     ],
//   },
// };

// module.exports = {
//   get: jest.fn().mockResolvedValue(mockResponse),
// };

// * new code to work with
export const getProducts = () => {
  return new Promise((resolve) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:1337/api/products", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let data = result.data;
        resolve(data);
      })
      .catch((error) => console.log("error", error));
  });
};
