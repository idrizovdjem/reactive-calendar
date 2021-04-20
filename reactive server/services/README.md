# Services

# authService
```js
register(email: STRING, username: STRING, password: STRING)
```

```js
login(email: STRING, password: STRING)
```

```js
isEmailAvailable(email: STRING)
```

```js
isUsernameAvailabale(username: STRING)
```

```js
authenticateUser(authToken: STRING)
```

# todoService
```js
create(userId: STRING, title: STRING, description: STRING, date: INTEGER, labelText: STRING)
```

```js
getForDate(userId: STRING, date: INTEGER)
```

```js
getForRange(userId: STRING, startDate: INTEGER, endDate: INTEGER)
```

```js
changeTodoCheckedState(todoId: INTEGER, newCheckState: BOOLEAN)
```

```js
deleteTodo(todoId: INTEGER)
```

```js
updateTodo(todoId: INTEGER, title: STRING, description: STRING)
```

# moodService
```js
updateMood(userId: STRING, date: INTEGER, mood: STRING)
```

```js
getMood(userId: STRING, date: INTEGER)
```

```js
getForRange(userId: STRING, startDate: INTEGER, endDate: INTEGER)
```

# labelService
```js
getByText(text: STRING)
```

```js
create(backgroundColor: STRING, color: STRING, text: STRING)
```

```js
getById(id: INTEGER)
```

```js
getAll()
```

# utilityService
```js
addErrorMessage(response: RESPONSE OBJECT, message: STRING)
```

```js
createResponse()
```

```js
hashPassword(password: STRING)
```