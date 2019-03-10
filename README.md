# [WIP] Mongoose Plugin - Express
Mongoose plugin to mount express routes. It allows express routes to be defined in mongoose schema or plugin and later mounted in the application.

# Installation
```
npm install -S github:abskmj/mongoose-plugin-express
```

# Usage
```javascript
let plugin = require('@abskmj/mongoose-plugin-express');
let userSchema = new mongoose.Schema('User', {...});

userSchema.plugin(plugin);
```

# Functions

## Model.router()
returns an `express.Router` instance with all the model routes

```javascript
let User = mongoose.model('User');

app.use(User.router());
```

## Model.router.attach(router)
registers an `express.Router` instance or a single route on the model router

```javascript
let router = express.Router();

router.get('/model', (req, res, nxt) => {
    let model = req.model; // req.model is an instance of mongoose.Model
    
    res.json({ name: model.modelName });
});

User.router.attach(router);

// or inside a plugin
schema.statics.router.attach(router);
```