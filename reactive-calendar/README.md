# Front-End Docs

## Contents
    - Services

# Services
# authService
```js
register(data: OBJECT { email, username, password })
```

```js
login(data: OBJECT { email, password })
```

```js
persistUserData(authToken: STRING)
```

```js
logout()
```

```js
isUserAuthenticated()
```

# calendarService
```js
getCalendarDays(year: INTEGER, month: INTEGER)
```

```js
transformToArray(dateObject: OBJECT)
```

```js
getCurrentDate()
```

```js
getMonthRange(year: INTEGER, month: INTEGER)
```

```js
getCurrentYear()
```

```js
getMonthData(year: INTEGER, month: INTEGER)
```

```js
convertFromNumber(date: INTEGER)
```

# labelSerivce
```js
getAll()
```

# moodService
```js
getForDay(date: INTEGER)
```

```js
updateMood(date: INTEGER, mood: STRING)
```

```js
getForRange(startDate: INTEGER, endDate: INTEGER)
```

```js
getMoodColor(mood: STRING)
```

# todoService
```js
getDailyTodos(date: INTEGER)
```

```js
getTodosForDates(startDate: INTEGER, endDate: INTEGER) 
```

```js
create(data: OBJECT)
```

```js
changeTodoCheckedState(todoId: STRING, newCheckState: BOOLEAN)
```

```js
deleteTodo(todoId: STRING)
```

```js
updateTodo(todoId: STRING, title: STRING, description: STRING)
```