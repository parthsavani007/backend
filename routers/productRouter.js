
import mongoose from 'mongoose';
import express from 'express';
import Product from '../models/productModel.js';
const productRouter = express.Router();
import data from '../data.js';


productRouter.get('/seed',async (req, res) => {
  console.log(data.products)
  try {
    const createdProducts = await Product.insertMany(data.products);
  console.log(createdProducts);
  if (createdProducts) {
  res
      .status(500)
      .send({ message: {createdProducts }});
  }
  else{
    res
      .status(500)
      .send({ message: 'No seller found. first run /api/users/seed' });
  }
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send({ message: {error}});
  }
//  const createdProducts = await Product.insertMany(data.products);
 // res.send({ createdProducts });
  // const seller = await User.findOne({ isSeller: true });
  // if (seller) {
  //   const products = data.products.map((product) => ({
  //     ...product,
  //     seller: seller._id,
  //   }));
  //   const createdProducts = await Product.insertMany(products);
  //   res.send({ createdProducts });
  // } 
  // else {
    res
      .status(500)
      .send({ message: 'No seller found. first run /api/users/seed' });
  //}
}
);

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  console.log(products);
  res.send( products );
}
);
productRouter.get('/:id', async (req, res) => {
  console.log(req.params.id)
  const productId = req.params.id;
  try {
   const product = await Product.findById(productId)
   console.log(product.length);
   if (product) {
     res.send(product);
   } else {
     res.status(404).send({ message: 'Product Not Found.' });
   }
   
  } catch (error) {
   res.status(404).send({ message: error });
  }
 
 
});
 productRouter.get('/det/:code', async (req, res) => {
   console.log(req.params.id)
    //  const nameFilter = req.params.id ? { name: { $regex: req.params.id.split("")[0], $options: 'i' } } : {};

   try {
    const product = await Product.find({ code: { $regex:req.params.code.split("-").join(""), $options: 'i' } }  )
    console.log(product.length);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found.' });
    }
    
   } catch (error) {
    res.status(404).send({ message: error });
   }
  
  
});
productRouter.delete('/:id',async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: 'Product Deleted' });
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});



productRouter.post(
  '/',async (req, res) => {
    console.log(req.body);
    const product = new Product({
          name: req.body.name,
          price: req.body.price,
          image: req.body.image,
          priceSale: req.body.priceSale,
          description: req.body.description,
         });
        const newProduct = await product.save();
    const createdProduct = await product.save();
    res.send({ message: 'Product Created', product: createdProduct });
  }
);



export default productRouter;
