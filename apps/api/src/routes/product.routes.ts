import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/product.controller.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router: Router = Router();

router.get("/", getProducts);
router.get('/:id', getProductById);

router.post("/",requireAdmin, createProduct);
router.put("/:id",requireAdmin, updateProduct);
router.delete("/:id",requireAdmin, deleteProduct);

export default router;