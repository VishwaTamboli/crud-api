# Todo List API

A simple NestJS Todo CRUD API with a browser-based frontend. Todos are stored in memory, so they reset whenever the server restarts.

## Run locally

```bash
npm install
npm run start:dev
```

Open [http://localhost:3000](http://localhost:3000) for the Todo List frontend.

## API endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/todos` | Create a todo |
| `GET` | `/todos` | Read all todos | 
| `GET` | `/todos/:id` | Read one todo |
| `PATCH` | `/todos/:id` | Update a todo |
| `DELETE` | `/todos/:id` | Delete a todo |

Create request example:

```json
{
  "title": "Buy groceries",
  "description": "Milk, bread, and fruit"
}
```

Todos have an ID, title, description, and creation/update timestamps. Titles are required (up to 120 characters); descriptions are optional (up to 500 characters).

On the webpage, click **Read** to show todos, then select one to update or delete it. The form has only a title and description; for a selected todo, text entered in Description is appended without replacing the saved description.

When calling the API directly, omit fields you want to keep unchanged. To add information without replacing the current description, pass `additionalDetails` to `PATCH /todos/:id`:

```json
{
  "title": "Buy groceries today",
  "additionalDetails": "Also pick up coffee"
}
```

New details are added on a new line; the saved description stays intact.

## Thunder Client

Import [`thunder-collection_todos.json`](./thunder-collection_todos.json) into Thunder Client to get ready-made requests. For requests that include an ID, replace `REPLACE_WITH_TODO_ID` with the ID returned by the create request.
