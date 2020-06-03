// Imports
const express = require('express');
// Instantiate server
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
//Connection with MySQL
const connection = require('./config/database');

//import routes
const users = require('./routes/users');
const categories = require('./routes/categories');
const comments = require('./routes/comments');
const posts = require('./routes/posts');
const types = require('./routes/types');
const auth = require('./routes/auth');


app.use(cors());
// Body Parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
    type: 'application/*+json'
}))
app.use(bodyParser.raw({
    type: 'application/vnd.custom-type'
}))
app.use(bodyParser.text({
    type: 'text/html'
}))


// Importing Models
const Category = require('./models/category');
const Comment = require('./models/comment');
const Post = require('./models/post');
const Tag = require('./models/tag');
const Type = require('./models/type')
const User = require('./models/user');

// Configure routes
app.get('/', (req, res) =>{
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>hello my test</h1>');
});

//Usage of routes
app.use('/categories', categories)
app.use('/comments', comments)
app.use('/users', users)
app.use('/posts', posts)
app.use('/types', types)
app.use(auth)

// Associations
User.belongsTo(Type)
Type.hasMany(User)

Post.belongsTo(Category)
Post.belongsTo(User)

Category.hasMany(Post)
User.hasMany(Post)



Comment.belongsTo(User)
Comment.belongsTo(Post)


Post.hasMany(Comment)
User.hasMany(Comment)

//     Users.belongsToMany(models.Groups, {
//       through: 'GroupUsers',
//       as: 'groups',
//       foreignKey: 'userId'
//     });


Post.belongsToMany(Tag, {
    through: 'Post_Tag',
    as: 'items'


})
Tag.belongsToMany(Post, {
    through: 'Post_Tag',
    as: 'items'
})

// Relation between User and Type table
User.belongsTo(Type)
Type.hasMany(User)

// Relation between Post and User table
Post.belongsTo(Category)
Post.belongsTo(User)

// Relation between Category and User table
Category.hasMany(Post)
User.hasMany(Post)

// Relation between Post and USER table
Comment.belongsTo(User)
Comment.belongsTo(Post)

// Relation between post and tag table
Post.hasMany(Comment)
User.hasMany(Comment)


// Relation between user and type table
Post.belongsToMany(Tag, {
    through: 'Post_Tag'
})
Tag.belongsToMany(Post, {
    through: 'Post_Tag'
})

// Lunching the server
const PORT = process.env.PORT || '5000';
connection.sync()
    .then(result => {

        app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));
    })
    .catch((err) => {
        console.log('error: ', err)
    });

    
/*         User.create({
            name: "Aymane",
            email: "aymane@email.com",
            password: "123456"
        })
        Category.create({
            title: "dev",
            active: true,
        })
        Comment.create({
            commentaire: "creating some content to my comment",
            active: true,
        })
        Post.create({
            title: "myImg",
            urlImage: "__dirImg",
            description: "invalid img",
            active: true,
        })

        Tag.create({
            name: "tech",
            active: true,
        })
        Type.create({
            name: "development",
            active: true,
        }) */