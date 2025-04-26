import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({ timestamps: true })

export class User {
    @Prop({ required: true, unique: true })
    email: String;

    @Prop({ required: true })
    username: String

    @Prop({ required: true })
    password: String
}

export const UserSchema = SchemaFactory?.createForClass(User);
