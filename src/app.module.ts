import { join } from 'path';

import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import Modules from './api/module';

import { MongooseModule } from './database/mongoose.module';
import { LoggerModule } from './shared/logger/logger.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    CacheModule.register(),
    ConfigModule.forRoot(),
    MongooseModule,
    LoggerModule,
    ...Modules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
