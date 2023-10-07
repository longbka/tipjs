const redisPubsubService = require("../services/redisPubsub.service");

class InventoryServiceTest {
  constructor() {
    redisPubsubService.subscribe("purchase_event", (message) => {
      console.log("message", message);
      InventoryServiceTest.updateInventory(message);
    });
  }
  static updateInventory(productId, quantity) {
    console.log(`Updated inventory ${productId} with quantity ${quantity}`);
  }
}

module.exports = new InventoryServiceTest();
