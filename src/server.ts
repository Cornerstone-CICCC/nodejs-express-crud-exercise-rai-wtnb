import express, { Request, Response } from "express";

interface Product {
  id: number;
  product_name: string;
  product_description: string;
  product_price: number;
}

const app = express();
app.use(express.json());

const products: Product[] = [];
let nextId = 1;

app.get("/products", (req: Request, res: Response) => {
  res.json(products);
});

app.get("/products/:id", (req: Request, res: Response) => {
  const product = products.find(
    (p) => p.id === parseInt(req.params.id as string),
  );
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  res.json(product);
});

app.post("/products", (req: Request, res: Response) => {
  const { product_name, product_description, product_price } = req.body;
  const newProduct: Product = {
    id: nextId++,
    product_name,
    product_description,
    product_price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put("/products/:id", (req: Request, res: Response) => {
  const index = products.findIndex(
    (p) => p.id === parseInt(req.params.id as string),
  );
  if (index === -1) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  const { product_name, product_description, product_price } = req.body;
  products[index] = {
    ...products[index],
    product_name,
    product_description,
    product_price,
  };
  res.json(products[index]);
});

app.delete("/products/:id", (req: Request, res: Response) => {
  const index = products.findIndex(
    (p) => p.id === parseInt(req.params.id as string),
  );
  if (index === -1) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  const deleted = products.splice(index, 1);
  res.json(deleted[0]);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
