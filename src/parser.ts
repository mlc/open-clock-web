import Ajv, { ErrorObject } from 'ajv/dist/jtd';

import { ClockWrapper } from './open-clock';
import schema from '../schemas/ClockWrapper.jtd.json';

const ajv = new Ajv({ strict: false });
const validate = ajv.compile<ClockWrapper>(schema);

export type ParseResult =
  | { clock: ClockWrapper }
  | { errors: readonly ErrorObject[] }
  | { exception: string };

const parser = (json: string): ParseResult => {
  try {
    const clock = JSON.parse(json);
    if (validate(clock)) {
      return { clock };
    } else {
      return { errors: validate.errors ?? [] };
    }
  } catch (e) {
    return { exception: e.message };
  }
};

export default parser;
