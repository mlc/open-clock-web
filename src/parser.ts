import { validate, Schema, ValidationError } from 'jtd';
import { ClockWrapper } from './open-clock';
import schema from '../schemas/ClockWrapper.jtd.json';

export type ParseResult =
  | { clock: ClockWrapper }
  | { errors: readonly ValidationError[] }
  | { exception: string };

const parser = (json: string): ParseResult => {
  try {
    const clock = JSON.parse(json);
    const errors = validate(schema as Schema, clock);
    if (errors.length === 0) {
      return { clock };
    } else {
      return { errors };
    }
  } catch (e) {
    return { exception: e.message };
  }
};

export default parser;
