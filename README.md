ANONTER WAY. Here we use formidable insted multer to save image in server.
This way give us oportunity save image only if text params are verified, but we can't use express-validator well vecause express-validator  cant't wotk with any object, only some template. we should pass some object wich contains key "body", wich contains list of fields

So we create custom req with field body wich contains our fields

Reagister and login with mongoBD with opportunity add image in server and pass the path into the data base
STACK:
    * express
    * React
    * mongoDb + mongoose
    * jsonwebtoken and bcrypt
    * formidable for upload image and save them on server 