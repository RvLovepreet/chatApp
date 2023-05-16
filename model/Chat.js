import { Model } from '@nozbe/watermelondb';
import { field, date, children } from '@nozbe/watermelondb/decorators';

export default class Chat extends Model {
  static table = 'chat';

  @field('message') message;
  @field('sender') sender;
  @field('messageid') messageid;
  @field('date') date;
  @field('hours') hours;
  @field('minutes') minutes;
  @field('sentAt') sentAt;
}
