import { MongoMemoryServer } from 'mongodb-memory-server';

import { Module } from '@nestjs/common';
import { MongooseModule as NestMongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';


const mongoMemoryServer = new MongoMemoryServer();

@Module({
    imports: [
        NestMongooseModule.forRootAsync({
            useFactory: async () => {
                const dbName = await mongoMemoryServer.instanceInfo.dbName;
                const uri = await mongoMemoryServer.getUri();

                const configs: MongooseModuleOptions = {
                    uri: uri,
                    dbName: dbName,
                    useCreateIndex: true,
                    useFindAndModify: false,
                };

                return configs;
            },
        }),
    ],
})
export class MongooseTestModule { }
