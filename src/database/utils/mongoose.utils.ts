import { Query, Types } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';


export const toMongooseId = (s?: string | number): Types.ObjectId => {
    if (!s) return;
    return Types.ObjectId(s);
};
export interface ISearchRegexOptions {
    ignoreCase: boolean;
    globalSearch: boolean;
}
export function getStringSearchRegex(
    value: string,
    options: ISearchRegexOptions = { ignoreCase: true, globalSearch: false },
): RegExp {
    let flags = '';
    if (options.ignoreCase === true) flags += 'i';
    if (options.globalSearch === true) flags += 'g';

    const regex = new RegExp(value, flags);

    return regex;
}

const find: Query<any[], any, any, any> = {
    sort: () => find,
    exec: () => {
        //
    },
    skip: () => find,
    limit: () => find,
} as any;

const findOne: Query<any, any, any, any> = {
    exec: async (): Promise<any> => true,
} as any;

export const modelMock = {
    find: () => find,
    countDocuments: async () => 0,
    findOne: () => findOne,
    create: () => null,
    findOneAndUpdate: () => null,
    deleteOne: () => null,
};

let mongod: MongoMemoryServer;

export const getMongooseTestModule = (options: MongooseModuleOptions = {}) =>
    MongooseModule.forRootAsync({
        useFactory: async () => {
            const mongo = await MongoMemoryServer.create();
            const uri = await mongo.getUri();

            const configs: MongooseModuleOptions = {
                uri: uri,
                dbName: 'testdb',
                useCreateIndex: true,
                useFindAndModify: false,
                ...options,
            };

            return configs;
        },
    });

export const closeMongooseTestModule = async () => {
    if (mongod) await mongod.stop();
};