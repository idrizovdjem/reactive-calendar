# Back-End Docs

## Contents
- **[Data Models](https://github.com/idrizovdjem/reactive-calendar/tree/main/reactive%20server/data)**
- **[Routers](https://github.com/idrizovdjem/reactive-calendar/tree/main/reactive%20server/routers)**
- **[Services](https://github.com/idrizovdjem/reactive-calendar/tree/main/reactive%20server/services)**

## Important information
Because the application has free hosting tier, the initial load of the application may take little more time than usual. That is because the server needs to wake up. After that the loading times must be in reasonable range.

## Additional information
### Response example
Every response from the server is in this format
```
{
    ok: BOOLEAN,
    errorMessages: ARRAY OF STRINGS,
    data: OBJECT
}
```

### Authentication Header
Most of the endpoints for the server requires custom authentication header
```
    x-authorization: [authToken]
```