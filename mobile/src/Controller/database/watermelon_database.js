import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import schema from "../../model/schema";
// import Post from './model/Post' // ⬅️ You'll import your Models here
import Client from "../../model/Client";
import PaymentMethod from "../../model/PaymentMethod";
import Product from "../../model/Product";
import ProductType from "../../model/ProductType";
import Sale from "../../model/Sale";
import SaleItem from "../../model/SaleItem";
import User from "../../model/User";
// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  // dbName: 'myapp', // optional database name or file system path
  // migrations, // optional migrations
  synchronous: true, // synchronous mode only works on iOS. improves performance and reduces glitches in most cases, but also has some downsides - test with and without it
  // experimentalUseJSI: true, // experimental JSI mode, use only if you're brave
});

// Then, make a Watermelon database from it!
export default database = new Database({
  adapter,
  modelClasses: [
    Client,
    PaymentMethod,
    Product,
    ProductType,
    Sale,
    SaleItem,
    User,
  ],
  actionsEnabled: true,
});
