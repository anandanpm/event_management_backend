import { validate } from 'class-validator';

export const validates = async (type: any, body: any) => {
  const instance = Object.assign(new type(), body);
  const errors = await validate(instance);
  if (errors.length > 0) {
    throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
  }
  return instance;
};