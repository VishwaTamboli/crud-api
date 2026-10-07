import { IsIn, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { TodoPriority } from '../todo.interface';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsString()
  @IsIn([ 'low', 'medium', 'high' ])
  priority?: TodoPriority;
}
