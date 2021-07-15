import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger';


@Schema()
export class User {
    @ApiProperty()
    _id: Types.ObjectId | string

    @ApiProperty()
    @Prop({
        required: true,
    })
    name: string;

    @ApiProperty()
    @Prop({
        required: true,
    })
    lastname: string;

    @ApiProperty()
    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    email: string;

    @ApiProperty()
    @Prop({
        type: String,
        required: true,
        select: false
    })
    password: string;

    @ApiProperty()
    @Prop({
        type: [String],
        required: true,

    })
    roles: string[];

    @ApiProperty()
    @Prop({
        default: Date.now(),
    })
    createdAt: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);