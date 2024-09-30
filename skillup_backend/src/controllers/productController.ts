import { NextFunction, Request, Response } from "express";
import ClassErrorHandler from "../utils/ClassErrorHandler.js";
import { Product } from "../models/productModel.js";
import { NewProductRequest, SearchRequestQuery } from "../types/types.js";
import { rm } from "fs";
import { nodeCache } from "../index.js";
import { invalidCache } from "../utils/features.js";


//  Create Product

export const createNewProduct = async (req: Request<{}, {}, NewProductRequest>, res: Response, next: NextFunction) => {
  try {
    const { name, price, stock, category, description } = req.body;
    const photo = req.files as any;


    console.log("photo", photo);

    if (!photo) {
      return next(new ClassErrorHandler("Invalid Photo", 500));
    }

    if (!name || !price || !stock || !category || !description) {
      rm(photo.path, () => {
        console.log("Photo Deleted Successfully");
      });

      return next(new ClassErrorHandler("Please fill All Fields", 501));
    };

    const product = await Product.create(
      {
        name,
        price: Number(price),
        stock: Number(price),
        category: category.toLowerCase(),
        photo: photo?.path,
        description
      }
    )

    //  this are Cache  delete data after create new product
    await invalidCache({ product: true, order: false, admin: true })

    if (!product) {
      return next(new ClassErrorHandler("Product Not Upload", 500));
    };

    if (product) {
      res.json({
        status: true,
        product: product,
        message: "Product Created Successfully"
      }).status(201);
    }

  } catch (error: any) {
    return next(new ClassErrorHandler(error?.message, 501));
  }
};


//  get Latest Product

export const getLatesteProdcuts = async (req: Request, res: Response, next: NextFunction) => {
  try {

    let product = [];

    if (nodeCache.has("latest_product")) {
      product = JSON.parse(nodeCache.get<any>("latest_product"));
    } else {

      product = await Product.find().sort({ createdAt: -1 }).limit(5);
      if (!product) {
        return next(new ClassErrorHandler("No found Data", 501));
      }
      //  set a data caching on ram memory store 
      nodeCache.set("latest_product", JSON.stringify(product));
    }


    if (product) {
      return res.json({
        status: true,
        product: product,
      }).status(200);

    }

  } catch (error: any) {
    return next(new ClassErrorHandler(error?.message, 501));
  }
};

//  Get ALl categories

export const getCategoriesProdcuts = async (req: Request, res: Response, next: NextFunction) => {
  try {

    let categories = [];

    if (nodeCache.has("categories")) {
      categories = JSON.parse(nodeCache.get<any>("categories"));
    } else {
      categories = await Product.distinct("category");
      if (!categories) {
        return next(new ClassErrorHandler("No found Data", 501));
      }
      nodeCache.set("categories", JSON.stringify(categories));

    }




    if (!categories) {
      return next(new ClassErrorHandler("Not Categories Found", 501));
    };

    if (categories) {
      return res.json({
        status: true,
        category: categories,
      }).status(200);

    }

  } catch (error: any) {
    return next(new ClassErrorHandler(error?.message, 501));
  }
};

// get All Products Admin


//  get Latest Product

export const getAdminProdcuts = async (req: Request, res: Response, next: NextFunction) => {
  try {

    let products = [];

    //  set a data chaching on ram store memory 
    if (nodeCache.has("products")) {
      products = JSON.parse(nodeCache.get<any>("products"));
    } else {
      products = await Product.find();
      if (!products) {
        return next(new ClassErrorHandler("No found Data", 501));
      }
      nodeCache.set("products", JSON.stringify(products));
    }


    if (products) {
      return res.json({
        status: true,
        product: products,
      }).status(200);

    }

  } catch (error: any) {
    return next(new ClassErrorHandler(error?.message, 501));
  }
};



//   Get Single Product 
export const getSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {

    let singleProduct = [] as any;
    const { id } = req.params;


    if (!id) {
      return next(new ClassErrorHandler("Invalied Id", 501));
    };

    if (nodeCache.has(`single_product-${id}`)) {
      singleProduct = JSON.parse(nodeCache.get<any>(`single_product-${id}`));
    } else {
      singleProduct = await Product.findById(id);

      if (!singleProduct) {
        return next(new ClassErrorHandler("No found Data", 501));
      }
      nodeCache.set(`single_product-${id}`, JSON.stringify(singleProduct));
    }


    if (singleProduct) {
      return res.json({
        status: true,
        product: singleProduct,
      });
    }

  } catch (error: any) {
    return next(new ClassErrorHandler(error?.message, 501));
  }
};



//   Save Update Product 




export const updateProduct = async (req: Request<{ id: string }, {}, any>, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const { name, stock, price, category, description } = req.body;

    // Check if product exists
    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ status: false, message: "Product Not Found" });
    }

    // Invalidate cache after product update
    await invalidCache({ product: true, order: false, admin: true });

    // Handle missing required fields
    if (!name || !price || !stock || !category || !description) {
      return next(new ClassErrorHandler("Please fill all fields", 400));
    }

    // Check for uploaded photo
    if (req.file) {
      const oldPhotoPath = product?.photo; // Get the current photo path

      // Delete the old photo asynchronously
      if (oldPhotoPath) {
        rm(oldPhotoPath, (err) => {
          if (err) console.error("Error deleting old photo:", err);
          else console.log("Old Photo Deleted Successfully");
        });
      }

      // Set the new photo path to the uploaded file path
      product.photo = req.file.path;
    }

    // Update product fields
    product.name = name || product.name;
    product.stock = stock || product.stock;
    product.price = price || product.price;
    product.category = category || product.category;
    product.description = description || product.description;

    // Save updated product to the database
    const updatedProduct = await product.save();
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file?.filename}`;
    // Send a success response
    return res.status(200).json({
      status: true,
      message: "Product Updated Successfully",
      product: updatedProduct,
      photo: imageUrl
    });
  } catch (error: any) {
    return next(new ClassErrorHandler(error?.message, 500));
  }
};

// export const updateProduct = async (req: Request<{ id: string }, {}, NewProductRequest>, res: Response, next: NextFunction) => {
//   try {

//     const id = req.params.id;
//     console.log("IDes", id);

//     const { name, stock, price, category, description } = req.body;

//     const files = req.files as any | { [fieldname: string]: Express.Multer.File[] } | undefined;
//     console.log("files", files);
//     const photo = files?.photo?.[0]; // Access the first file in the 'photo' array

//     let product = await Product.findById(id);


//     //  this are Cache  delete data after create new product
//     await invalidCache({ product: true, order: false, admin: true })

//     if (!product) {
//       return res.json({
//         status: false,
//         message: "Product Not Found"
//       }).status(500);
//     };


//     if (!name || !price || !stock || !category || !description) {
//       return next(new ClassErrorHandler("Please fill All Fields", 501));
//     };

//     if (photo) {
//       const photoPath = product?.photo;

//       //   this product  deleted are  synchronously
//       rm(photoPath, () => {
//         console.log("Old Photo Deleted Successfully");
//       });
//       product.photo = photo.path || product.photo;
//     };

//     product.name = name || product.name;
//     product.stock = stock || product.stock;
//     product.price = price || product.price
//     product.category = category || product.category
//     product.description = description || product.description

//     const checked = await product.save();

//     if (checked) {
//       return res.json({
//         status: true,
//         message: "Product Updated Successfully",
//         product: checked
//       });
//     }

//   } catch (error: any) {
//     return next(new ClassErrorHandler(error?.message, 501));
//   }
// }


//  Delete product 

export const deleteSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const product = await Product.findByIdAndDelete(req.params.id);

    //  this are Cache  delete data after create new product
    await invalidCache({ product: true, order: false, admin: true })

    if (!product) {
      return res.json({
        status: false,
        message: "Product Not Found"
      }).status(500);
    };
    if (product) {
      return res.json({
        status: true,
        product: product,
      });
    }

  } catch (error: any) {
    return next(new ClassErrorHandler(error?.message, 501));
  }
};



//  Search Products Starts Query to search api 



// api?id=936890640959&name="productName"&category="productCategory" 

export const getSearchProduct = async (
  req: Request<{}, {}, SearchRequestQuery>,
  res: Response,
  next: NextFunction
) => {
  try {

    const { search, price, category, sort, page = 1 } = req.query;

    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (Number(page) - 1) * limit;

    // Build the query dynamically based on the provided filters

    const query: Record<string, any> = {};

    if (search) {
      query.name = { $regex: new RegExp(String(search), "i") };
    }

    if (price) query.price = { $lte: Number(price) };
    if (category) query.category = category;

    // Determine sorting order
    const sortOption: Record<string, 1 | -1> = {};

    if (sort === "asc") sortOption.price = 1;
    if (sort === "desc") sortOption.price = -1;

    // Fetch products with pagination and sorting
    const products = await Product.find(query).sort(sortOption).skip(skip).limit(limit);

    // Get the total count of products matching the query
    const totalProducts = await Product.countDocuments(query);

    // Calculate total pages
    const totalPage = Math.ceil(totalProducts / limit);

    // Return response
    return res.status(200).json({
      status: true,
      products,
      totalPage,
    });
  } catch (error: any) {
    return next(new ClassErrorHandler(error.message, 500));
  }
};
