import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
//addBearerAuth kullanırsak tokenin önünde Bearer keyini de gönderecektir. addApiKey kullanırsak sadece tokeni gönderecektir.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('PDR API')
  .setDescription('API documentation')
  .setVersion('1.0')
  .addApiKey(
    {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
    'access-token',
  )
  .build();


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document); 

  await app.listen(3000);
}
bootstrap();
