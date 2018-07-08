# 1. User Operation

## 1.1 Create

```HTTP Request
POST /user HTTP/1.1
Authorization: [Basic Auth with app credentials]
Content-Type: application/json

{
  "username": "ivan",
  "password": "123456",
  "city": "Boston",
  "interests": "Skiing"
}
```

```HTTP Respond
HTTP/1.1 201 Created
Location: /user/:id
Content-Type: application/json

{
  "id": "example-id",
  "username": "example-username",
  "password": "example-password-clear",
  "field1" "additional-field-passed-in",
  "fieldN" "additional-field-passed-in",
  "_kmd": {
    "lmt": "2018-01-04T12:12:44.886Z",
    "ect": "2018-01-04T12:12:44.886Z",
    "authtoken":"368c9f15-01b4-4a49-9b8d-989f4b2d30ed.Vai/mloxDgUUiSwiRkA9kDvoBu5NvlZaEkGXrREY8G9="
  }
}
```

## 1.2 Retrieve

```HTTP Request
GET /user/:id HTTP/1.1
Authorization: [user credentials]
```

## 1.3 Update

```HTTP Request
PUT /user/:id HTTP/1.1
Authorization: [user credentials]
Content-Type: application/json

{
  "field1": "new-field",
  "field2": "field-to-be-updated"
}
```

## 1.4 Delete

```HTTP request
DELETE /user/:id HTTP/1.1
Authorization: [user credentials]
```

```HTTP response
HTTP/1.1 204 No Content
```
