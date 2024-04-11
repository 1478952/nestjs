import { ValidationArguments } from "class-validator";

export const stringValidationMessage = (args: ValidationArguments) => {
  return `${args.property}를 입력해주세요!`;
};
