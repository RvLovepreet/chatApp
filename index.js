/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

//new code
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { mySchema } from './model/schema';
import { dbModels } from './model/index.js';

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  dbName: 'WatermelonDemo',
  schema: mySchema,
});

// Then, make a Watermelon database from it!
export const database = new Database({
  adapter,
  modelClasses: dbModels,
});
//new code
AppRegistry.registerComponent(appName, () => App);
