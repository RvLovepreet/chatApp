import { Model } from '@nozbe/watermelondb';
import { field, date, children } from '@nozbe/watermelondb/decorators';

export default class User extends Model {
  static table = 'user';

  @field('name') name;
  @field('email') email;
  @field('password') password;
  @field('mobile') mobile;
}
