import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://localhost:27017/test',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
  ],
})
export class AppModule {}
