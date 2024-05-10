import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from "@nestjs/common";
import { QueryRunner as QR } from "typeorm";

export const QueryRunner = createParamDecorator(
  (data, context: ExecutionContext): QR => {
    const req = context.switchToHttp().getRequest();

    if (!req.queryRunner) {
      throw new InternalServerErrorException(
        "queryRunner decorator를 사용하려면 queryRunner Interceptor와 함께 사용해야합니다. Request에 queryRunner 프로퍼티가 존재하지 않습니다!"
      );
    }

    return req.queryRunner as QR;
  }
);
