# Routers

## Important
### Note that some request bodies has **userId**. This userId is added from the specific router middleware. There is no need for passing userId to the request body

# Users router endpoints
### Login user 
### POST /users/login
```
request body
{
    email : STRING,
    password : STRING
}
```
### Register user
### POST /users/register
```
request body
{
    email : STRING,
    username : STRING,
    password : STRING
}
```

# Todo router endpoints
### Create todo
### POST /todo/
```
request body
{
    title : STRING, 
    description : STRING, 
    date : INTEGER, 
    labelText : STRING
}
```

### Get todos for date
### GET /todo/date/:date
```
request params
{
    date : INTEGER
}
```

### Get todos for range of dates
### GET /todo/range?startDate=[some date]&endDate=[some date]
```
request query
{
    startDate : INTEGER,
    endDate : INTEGER
}
```

### Change todo check state
### PATCH /todo/:todoId/check
```
request params
{
    todoId : INTEGER
}

request body
{
    newCheckState : BOOLEAN
}
```

### Delete todo
### DELETE /todo/:todoId
```
request params
{
    todoId : INTEGER
}
```

### Edit todo
### PATCH /todo/:todoId
```
request params
{
    todoId : INTEGER
}

request body
{
    title : STRING,
    description : STRING
}
```

# Mood router endpoints
### Get moods for range of dates
### GET /mood/range?startDate=[some date]&endDate=[some date]
```
request query
{
    startDate : STRING, 
    endDate : STRING
}
```

### Change mood for date
### PATCH /mood/:date
```
request params
{
    date : INTEGER
}

request body
{
    mood : STRING
}
```

### Get mood for date
### GET /mood/:date
```
request params
{
    date : INTEGER
}
```

# Labels router endpoints
### Get all labels
### GET /labels/all
```
no body or params required
```