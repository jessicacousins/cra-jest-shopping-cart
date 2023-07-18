Dependenacies in project: React, Bootstap, Axios, Strapi, and GraphQL.

For React server: npm start
npm install axios
npm install bootstrap
npm install bootstrap-react
Strapi Server: npx create-strapi-app cartDB --quickstart was used use: npm run develop
Strapi server: Server: npx create-strapi-app restaurants --quickstart was used use: npm run develop

On both strapi databases GraphQL was added into each project separately: npm run Strapi install graphql
Validate it by going to: http://localhost:1337/graphql
Example query for Strapi Restaurant database in GraphQL:
query {
products {
data {
id
attributes {
name
country
cost
instock
}
}
}
}


// jest test:
// import { render } from "@testing-library/react";
// import products from "./mocks/products";

// test("should get a list of products", async () => {
//   const productList = await products.getProducts();
//   expect(productList.length).toBe(4);
//   expect(productList[0].instock).toBe(10);
// });