import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoPriority } from './todo.interface';

@Injectable()
export class TodosService {
  private readonly todos = new Map<string, Todo>();

  create(createTodoDto: CreateTodoDto): Todo {
    const now = new Date().toISOString();
    const todo: Todo = {
      id: randomUUID(),
      ...createTodoDto,
      description: createTodoDto.description ?? '',
      priority: createTodoDto.priority ?? 'medium',
      createdAt: now,
      updatedAt: now,
    };

    this.todos.set(todo.id, todo);
    return todo;
  }

  findAll(): Todo[] {
    return [...this.todos.values()];
  }

  findOne(id: string): Todo {
    const todo = this.todos.get(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID "${id}" was not found`);
    }
    return todo;
  }

  update(id: string, updateTodoDto: UpdateTodoDto): Todo {
    const todo = this.findOne(id);
    const { additionalDetails, description, ...fields } = updateTodoDto;
    const detailsToAppend = additionalDetails?.trim();
    const currentDescription = description ?? todo.description;
    const updatedTodo: Todo = {
      ...todo,
      ...fields,
      description: detailsToAppend
        ? [currentDescription, detailsToAppend].filter(Boolean).join('\n')
        : currentDescription,
      updatedAt: new Date().toISOString(),
    };

    this.todos.set(id, updatedTodo);
    return updatedTodo;
  }

  remove(id: string): Todo {
    const todo = this.findOne(id);
    this.todos.delete(id);
    return todo;
  }
}
