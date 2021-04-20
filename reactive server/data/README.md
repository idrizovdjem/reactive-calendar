# Data Models
## Information
SQLite3 database is used for data storage. The database is also hosted together with the Back-End on [Glitch.com](https://glitch.com/).

## Models
### User 
```
{
    id : Primary key UUID,
    email : STRING,
    username : STRING,
    password : STRING
}
```

### Todo
```
{
    id : Primary key INTEGER,
    userId : Foreign key UUID,
    date : INTEGER,
    title: STRING,
    description : STRING,
    isChecked : BOOLEAN,
    labelId : Foreign key INTEGER
}
```

### Label
```
{
    id : Primary key INTEGER,
    backgroundColor : STRING,
    color : STRING,
    text : STRING
}
```

### DateMood
```
{
    id : Primary key INTEGER,
    userId : Foreign Key UUID,
    date : INTEGER,
    mood : STRING
}
```

### Session
```
{
    id : Primary key INTEGER,
    userId : Foreign key UUID,
    token : STRING
}
```

## Context
Context initializes the data models, sync or create the database and calls seeder service.

## Seeder
The seeder contains only one seed method:
- **seedLabels** : Checks if hardcoded labels are present in the database and if not, then creates the label objects before the server starts