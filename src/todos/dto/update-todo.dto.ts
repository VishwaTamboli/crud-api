import { IsOptional, IsString, MaxLength, MinLength, IsIn } from 'class-validator';
import { TodoPriority } from '../todo.interface';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  additionalDetails?: string;

  @IsOptional()
  @IsString()
  @IsIn([ 'low', 'medium', 'high' ])
  priority?: TodoPriority;
}
