# gulp-file

normal stream to gulp stream

```js
const file = require('gulp-file');

const users = [
  {username: 'taro'},
  {username: 'jiro'},
  {username: 'saburo'}
];

array(users)
.pipe(file('{{username}}.json'))
.pipe(map(function(file, next){
  
}))

```