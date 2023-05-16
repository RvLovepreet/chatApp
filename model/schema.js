import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'user',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'password', type: 'string' },
        { name: 'mobile', type: 'string' },
        { name: 'image', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'chat',
      columns: [
        { name: 'message', type: 'string' },
        { name: 'sender', type: 'string' },
        { name: 'messageid', type: 'string' },
        { name: 'date', type: 'string' },
        { name: 'hours', type: 'number' },
        { name: 'minutes', type: 'number' },
        { name: 'sentAt', type: 'number' },
      ],
    }),
  ],
});
