import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from "bcrypt"
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User?.name) private readonly userModel: Model<User>) { }
  async hashPassword(password: string): Promise<string> {
    return await bcrypt?.hash(password, 10);
  }

  async create(createUserDto: CreateUserDto) {
    const { email, password: db_password } = createUserDto;
    const password = await this.hashPassword(db_password);

    const existingUser = await this?.userModel?.findOne({ email });

    if (existingUser) throw new HttpException("User already exists", HttpStatus?.BAD_REQUEST);

    const user = await this?.userModel?.create({ ...createUserDto, password })

    return { user, message: "User successfully created", success: true }
  }

  async findAll() {
    const users = await this?.userModel?.find({});
    return { users, message: "All Users", count: users?.length, success: true };
  }

  async findOne(id: number) {

    if (!Types?.ObjectId?.isValid(id)) throw new BadRequestException("Invalid User Id");

    const userOne = await this?.userModel?.findById(id);

    if (!userOne) throw new NotFoundException();

    return { user: userOne, message: "User By Id", success: true }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    if (!Types?.ObjectId?.isValid(id)) throw new BadRequestException("Invalid User Id");

    const user = await this?.userModel?.findById(id);

    if (!user) throw new NotFoundException();

    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true }
    );

    if (!updatedUser) throw new BadRequestException();

    return { user: updatedUser, message: "User successfully updated", success: true }

  }

  async remove(id: number) {
    if (!Types?.ObjectId?.isValid(id)) throw new BadRequestException("Invalid User Id");

    const user = await this?.userModel?.findById(id);

    if (!user) throw new NotFoundException();

    const deletedUser = await this?.userModel?.findByIdAndDelete(id);

    if (!deletedUser) throw new BadRequestException();

    return { user: deletedUser, message: "User successfully deleted", success: true }

  }
}
