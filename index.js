var hashids = require('hashids')
var front = require('hexo-front-matter');
var fs = require('hexo-fs');

var hexo = hexo || {}
var config = hexo.config;

hexo.extend.filter.register('before_post_render', function (data) {
  if (!config.hash_title || !config.url || data.layout !== 'post') {
    return data;
  }

  var digits = config.hash_title.digits || 8
  var article = front.parse(data.raw)
  var title = data.title

  // 使用当前秒数作为种子创建hash值
  var hash = new hashids(Date.now().toString(),digits)
  article.permalink = hash.encode(1)

  fs.writeFileSync(data.full_source, '---\n' + front.stringify(article), 'utf-8');
  return data
})
