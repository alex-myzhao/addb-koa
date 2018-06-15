# API (Rebuilt)

POST '/query'

```javascript
req = {
  "id": Number,
  "condition": {
    "disease": String,
    "country": String,
    "year": String,
    "doubleClick": "Yes" | "No"
  },
  "authority": Number
}

res.data = {
  "result": [{
    "ReportID": String,
    "Title": String,
    "Authors": String,
    "Disease": String,
    "Reporter": String,
    "YearOfPub": String
  }, ...]
}
```
