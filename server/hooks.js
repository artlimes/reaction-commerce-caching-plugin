import { Meteor } from "meteor/meteor";
import { MethodHooks } from "/server/api";

MethodHooks.after("revisions/publish", (options) => {
  if (options.result) {
    const result = options.result;

    let productId;
    if (result.previousDocuments[0]) {
      if (result.previousDocuments[0].ancestors && result.previousDocuments[0].ancestors[0]) {
        productId = result.previousDocuments[0].ancestors[0];
      } else {
        productId = result.previousDocuments[0]._id;
      }
    } else {
      productId = result.arguments[0] && result.arguments[0][0];
    }

    if (productId) {
      Meteor.call("caching/product", productId);
    }
    return options.result;
  }
});
