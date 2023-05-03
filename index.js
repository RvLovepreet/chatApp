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
import { CometChat } from '@cometchat-pro/react-native-chat';
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

//new code for comet chat
const appID = '2381371d08b63f32';
const region = 'US';
const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build();
CometChat.init(appID, appSetting).then(
  () => {
    console.log('Initialization completed successfully');
    // You can now call login function.
  },
  error => {
    console.log('Initialization failed with error:', error);
    // Check the reason for error and take appropriate action.
  },
);

//new code for cometChat
AppRegistry.registerComponent(appName, () => App);
