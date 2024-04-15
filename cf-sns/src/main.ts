import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // dto 기본값허용
      transformOptions: {
        enableImplicitConversion: true, // class-validator를 사용시 임의로 변환되는 것을 허용
      },
    })
  );

  await app.listen(3000);
}
bootstrap();
