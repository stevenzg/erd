const erd = require('../index.js')

erd({
  modelsText: `
# Entities
[Action] {bgcolor: "#d0e0d0"}
*_id [ ObjectId ]
struct [ ObjectId ]
type [ String ]
label [ String , not null ]
name [ String , not null ]
description [ String , not null ]
behavior [ String , not null ]
content [ String ]
successMessage [ String ]
successPage [ ObjectId ]
icon [ String ]

[exception] {bgcolor: "#d0e0d0"}
*_id [ ObjectId ]
name [ String , not null ]
type [ ObjectId ]

[namespace] {bgcolor: "#d0e0d0"}
*_id [ ObjectId ]
serviceName [ String , not null ]

[Struct] {bgcolor: "#d0e0d0"}
*_id [ ObjectId ]
name [ String , not null ]
fields [ ObjectId ]

[thrift] {bgcolor: "#d0e0d0"}
*_id [ ObjectId ]
name [ String , not null ]

[typedef] {bgcolor: "#d0e0d0"}
*_id [ ObjectId ]
name [ String , not null ]
type [ String , not null ]

[Layout] {bgcolor: "#d0e0d0"}
*_id [ ObjectId ]
name [ String , not null ]
title [ String , not null ]
type [ String , not null ]
fields [ ObjectId ]
struct [ ObjectId ]
api [ String ]
actions [ ObjectId ]

[Menu] {bgcolor: "#d0e0d0"}
*_id [ ObjectId ]
name [ String , not null ]
type [ String , not null ]
page [ ObjectId ]
content [ String , not null ]
project [ ObjectId ]

[Page] {bgcolor: "#d0e0d0"}
*_id [ ObjectId ]
title [ String ]
layouts [ ObjectId ]
params [ ObjectId ]
queryString [ String ]

[Project] {bgcolor: "#d0e0d0"}
*_id [ ObjectId ]
name [ String , not null ]
description [ String ]
logo [ String ]
collaborators [ Array<ObjectId> ]
teams [ Array<ObjectId> ]

[Team] {bgcolor: "#d0e0d0"}
*_id [ ObjectId ]
+name [ String , not null ]
description [ String ]
logo [ String ]
createdBy [ ObjectId , not null ]
members [ Array<ObjectId> ]

[User] {bgcolor: "#d0e0d0"}
*_id [ ObjectId ]
ssoId [ Number , not null ]
avatar [ String ]
username [ String , not null ]
role [ ObjectId ]
email [ String ]
teams [ ObjectId ]

# Relationships
Action *--* Struct
Action *--* Page
Exception *--* Exception
Layout *--* Struct
Layout *--* Action
Menu *--* Page
Menu *--* Project
Page *--* Layout
Team *--* User
User *--* Team
`})