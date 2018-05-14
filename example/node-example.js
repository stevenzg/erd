const erd = require('../index.js')

erd(`
# Entities
[Player] {bgcolor: "#d0e0d0"}
*_id {label: "_id "}
+idid {label: "idid  (username), not null, Index"}
firstname {label: "firstname , not null, Index"}
lastname {label: "lastname , Index"}
+email {label: "email , not null, Index"}
avatar {label: "avatar "}
password {label: "password "}
active {label: "active "}
coverImage {label: "coverImage "}
tempuuid {label: "tempuuid "}
tempuuiddate {label: "tempuuiddate "}
updated {label: "updated , [function now() { [native code] }]"}
created {label: "created , [function now() { [native code] }]"}

[Post] {bgcolor: "#d0e0d0"}
*_id {label: "_id "}
player {label: "player , not null"}
content {label: "content , not null"}
photos {label: "photos "}
likes {label: "likes "}
updated {label: "updated , [function now() { [native code] }]"}
created {label: "created , [function now() { [native code] }]"}

# Relationships
Post *--* Player {label: "Post"}
`)