import { Spiderable } from "meteor/artlimes:meteor-chrome-headless-spiderable";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Logger } from "/server/api";
import { Products } from "/lib/collections";


const methods = {
  "caching/product"(productId) {
    check(productId, String);
    let product;

    if (productId.match(/^[23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz]{17}$/)) {
      product = Products.findOne({ _id: productId });
    } else {
      product = Products.findOne({
        handle: {
          $regex: productId,
          $options: "i"
        }
      });
    }

    if (product && product.type === "simple" && product.isVisible) {
      const pdpPath = "/product/" + product.handle;
      Meteor.setTimeout(() => {
        Spiderable.makeCacheOfPage(pdpPath);
      }, 5000);
    }
  },

  "caching/allProducts"() {
    const productHandles = Products.find({
      type: "simple",
      isVisible: true
    }, {
      fields: { handle: 1 }
    }).fetch();

    Logger.info(`Caching of all products will take ${productHandles.length * 20} seconds, approximately`);

    let timer = 0;
    productHandles.forEach(prod => {
      const pdpPath = "/product/" + prod.handle;
      Meteor.setTimeout(() => {
        Spiderable.makeCacheOfPage(pdpPath);
      }, timer);
      timer += 20000;
    });
  }

  //,
  // "caching/page"(urlPath) {
  //   check(urlPath, String);
  //   Meteor.setTimeout(() => {
  //     Spiderable.makeCacheOfPage(urlPath);
  //   }, 5000);
  // }

};

Meteor.methods(methods);
