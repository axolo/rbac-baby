function addTab(el, tab) {
  if($(el).tabs('exists', tab.title)) {
    $(el).tabs('select', tab.title);
  } else {
    $(el).tabs('add', {
      title: tab.title,
      iconCls: tab.iconCls,
      closable: true,
      href: Config.partials.path + tab.href + Config.partials.ext
    });
  }
}