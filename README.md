erd

Generate entity-relationship diagram according to model text

## How to use

Browser

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>ERD</title>
    <link rel="stylesheet" href="path/to/dist/erd.css" />
  </head>
  <body>
    <div id="erd"> 
      {{ modelsText }}
    </div>
    <script src="path/to/dist/erd.js"></script>
    <script>
      window.generateERD()
    </script>
  </body>
</html>
```

Node.js
```
let erd = require('erd')
erd({modelsText, outputType})
```

## Parameters
**modelsText**

models text like below format
```
# Entities
[Player] {bgcolor: "#d0e0d0"}
*_id [ ObjectId ]
+idid [ String  (username), not null , Index]
firstname [ String , not null , Index]
lastname [ String , Index]
+email [ String , not null , Index]
avatar [ String ]
password [ String ]
active [ Boolean ]
coverImage [ String ]
tempuuid [ String ]
tempuuiddate [ Date ]
updated [ Date ]
created [ Date ]

[Post] {bgcolor: "#d0e0d0"}
*_id [ ObjectId ]
player [ String , not null ]
content [ Object , not null ]
photos [ Array<String> ]
likes [ Array<ObjectId> ]
updated [ Date ]
created [ Date ]

# Relationships
Post *--* Player
```

**outputType**

* png
* pdf