import { Model, data } from '@heleonix/core';

export class ModelOne extends Model {
  @data numberField = 123;

  @data stringField = 'str';

  @data obj = {
      num: 1,
      str: 'str'
  }
}
