import { IsInt, IsDefined, IsString, IsOptional, IsBoolean } from "class-validator";
import { User } from "./";

export class Post {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    title!: string;

    @IsOptional()
    @IsString()
    content?: string;

    @IsDefined()
    @IsBoolean()
    published!: boolean;

    @IsDefined()
    author!: User;

    @IsDefined()
    @IsInt()
    authorId!: number;
}
