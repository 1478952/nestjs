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
      whitelist: true, // validator가 validation decorator가 적용되어 있지않으면 거부함.
      forbidNonWhitelisted: true, // 정의되어 있지 않은 decorator를 전송하면 에러를 던진다.
    })
  );

  await app.listen(3000);
}
bootstrap();
