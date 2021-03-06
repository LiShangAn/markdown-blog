const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routers/articles');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
});

app.set('view engine', 'ejs');
// ?
app.use(express.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));

app.use('/articles', articleRouter);

app.get('/', async (req, res) => {
  console.log('get /');
  const articles = await Article.find().sort({createdAt: 'desc'});
  res.render('articles/index', {articles: articles});
  // res.send('hello');
});

app.listen(3000);
