import {createServer, Model, RestSerializer} from "miragejs";
import faker from "faker";

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer,
    },

    models: {
      item: Model,
      wishList: Model,
      cartList: Model,
    },

    routes() {
      this.namespace = "api";
      this.timing = 700;
      this.resource("items");
      this.patch("/items/:id", (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let item = schema.items.find(id);
        return item.update(newAttrs);
      });

      this.resource("wishLists");
      this.post("/wishLists", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        attrs.id = faker.random.uuid();
        return schema.wishLists.create(attrs);
      });
      this.delete("/wishLists/:id", (schema, request) => {
        let id = request.params.id;
        return schema.wishLists.find(id).destroy();
      });

      this.resource("cartLists");
      this.post("/cartLists", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        attrs.id = faker.random.uuid();
        return schema.cartLists.create(attrs);
      });
      this.delete("/cartLists/:id", (schema, request) => {
        let id = request.params.id;
        return schema.cartLists.find(id).destroy();
      });
      this.patch("/cartLists/:id", (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let item = schema.cartLists.find(id);

        return item.update(newAttrs);
      });
    },

    seeds(server) {
      [...Array(50)].forEach((_) => {
        server.create("item", {
          id: faker.random.uuid(),
          name: faker.commerce.productName(),
          image: faker.random.image(),
          price: faker.commerce.price(),
          material: faker.commerce.productMaterial(),
          brand: faker.lorem.word(),
          inStock: faker.random.boolean(),
          inCart: false,
          fastDelivery: faker.random.boolean(),
          ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
          offer: faker.random.arrayElement([
            "Save 50",
            "70% bonanza",
            "Republic Day Sale",
          ]),
          inWishlist: false,
          idealFor: faker.random.arrayElement([
            "Men",
            "Women",
            "Girl",
            "Boy",
            "Senior",
          ]),
          level: faker.random.arrayElement([
            "beginner",
            "amateur",
            "intermediate",
            "advanced",
            "professional",
          ]),
          color: faker.commerce.color(),
        });
      });
    },
  });
}
