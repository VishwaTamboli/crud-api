import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { NotFoundException } from '@nestjs/common';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  describe('create', () => {
    it('should create a todo with provided priority', () => {
      const dto = { title: 'Test Todo', priority: 'high' as any };
      const result = service.create(dto);
      expect(result.title).toBe('Test Todo');
      expect(result.priority).toBe('high');
      expect(result.id).toBeDefined();
    });

    it('should use default priority "medium" if none provided', () => {
      const dto = { title: 'Test Todo' };
      const result = service.create(dto as any);
      expect(result.priority).toBe('medium');
    });

    it('should initialize description as empty string if not provided', () => {
      const dto = { title: 'Test Todo' };
      const result = service.create(dto as any);
      expect(result.description).toBe('');
    });
  });

  describe('update', () => {
    it('should update priority', () => {
      const created = service.create({ title: 'Update Me', priority: 'low' as any });
      const updated = service.update(created.id, { priority: 'high' as any });
      expect(updated.priority).toBe('high');
    });

    it('should append additionalDetails to description', () => {
      const created = service.create({ title: 'Append Me', description: 'Initial' as any });
      const updated = service.update(created.id, { additionalDetails: 'More details' as any });
      expect(updated.description).toBe('Initial\nMore details');
    });

    it('should replace description if provided', () => {
      const created = service.create({ title: 'Replace Me', description: 'Initial' as any });
      const updated = service.update(created.id, { description: 'New' as any });
      expect(updated.description).toBe('New');
    });

    it('should throw NotFoundException for non-existent todo', () => {
      expect(() => service.update('invalid-id', { title: 'Fail' as any })).toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all todos', () => {
      service.create({ title: 'T1' } as any);
      service.create({ title: 'T2' } as any);
      expect(service.findAll().length).toBe(2);
    });
  });

  describe('remove', () => {
    it('should remove the todo and return it', () => {
      const created = service.create({ title: 'Delete Me' } as any);
      const removed = service.remove(created.id);
      expect(removed.id).toBe(created.id);
      expect(service.findAll().length).toBe(0);
    });
  });
});
