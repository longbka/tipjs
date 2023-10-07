"use strict";
const express = require("express");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");
const productController = require("../../controllers/product.controller");

const router = express.Router();

router.get("", asyncHandler(productController.findAllProducts));
router.get("/:product_id", asyncHandler(productController.findProduct));
router.get(
  "/search/:keySearch",
  asyncHandler(productController.getListSearchProduct)
);

//authentication
router.use(authentication);
////////////////
router.post("", asyncHandler(productController.createProduct));
router.patch("/:productId", asyncHandler(productController.updateProduct));
router.post(
  "/unPublish/:id",
  asyncHandler(productController.unPublishProductByShop)
);
router.post(
  "/publish/:id",
  asyncHandler(productController.publishProductByShop)
);

//QUERY
router.get("/drafts/all", asyncHandler(productController.getAllDraftsForShop));
router.get(
  "/published/all",
  asyncHandler(productController.getAllPublishedForShop)
);
module.exports = router;
