import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    ConfigModule?.forRoot({ isGlobal: true }),
    MongooseModule?.forRoot(process?.env?.MONGODB_URI as string),
    UsersModule,
    BookModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
