This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It also utilises Tailwind and DaisyUI.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Getting Started

To run the development server:

```bash
ncd next-app
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Layout
The app contains collections, products and product types. 

For each catagory, users can add, edit and delete items in order to continue expanding the LUSH catalogue.

### Collections
This is used in conjunction with products in order to help catagorise groups of products that were either released at the same time, or share a common theme. e.g. christmas. The list of collections are contained within collections.json and any new collections added via the app are also added to collections.json.

### Products
This is the where the products that LUSH produces/previously produced are compiled. It details the name, product type, weight, price and collection of each product, alongside an image of the product.

### Product Types
This is also used in conjunction with products in order to help catagorise the types of products that LUSH produces/previously produced. e.g. Shower gel. The list of product types are contained within types.json and any new product types added via the app are also added to types.json.

### Search
On the Nav Bar there is a search box where a user can search for a product name, collection name or product type to more easily find the product they are looking for. 