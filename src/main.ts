import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as passport from "passport"
import * as session from "express-session"

async function bootstrap() {

  console.log(process.env.FRONT_API_URL)

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONT_API_URL,
    credentials: true
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000
    }
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(3000);

}
bootstrap();
