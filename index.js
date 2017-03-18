var hashids = require('hashids')
var front = require('hexo-front-matter');
var fs = require('hexo-fs');

var hexo = hexo || {}
var config = hexo.config;

hexo.extend.filter.register('before_post_render', function (data) {
  if (!config.hash_title || !config.url || data.layout !== 'post') {
    return data;
  }

  var digits = config.hash_title.digits
  var article = front.parse(data.raw)
  // console.log("原始data:"+postStr);
  var title = data.title

  var hash = new hashids('',digits)
  article.permalink = hash.encode(title)
  var postStr = front.stringify(article);
  // postStr = '---\n' + postStr;
  fs.writeFileSync(data.full_source, article, 'utf-8');

  return data
})
