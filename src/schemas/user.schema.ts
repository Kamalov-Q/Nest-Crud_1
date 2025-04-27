import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    email: String;

    @Prop({ required: true })
    username: String

    @Prop({ required: true })
    password: String

    @Prop({ enum: UserRole, default: UserRole?.USER as string })
    role: string
}

export const UserSchema = SchemaFactory?.createForClass(User);
