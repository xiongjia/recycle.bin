recycle.bin
===========
* Recycle.bin is just my personal Wiki site.
* It's based on VimWiki + my templates.

Usage
======
Prepare:
* ```npm install``` for install the node modules.
* ```bower install``` for downlaod the js components.

VIM settings: 
* Add the "_content" to VimWiki list.
* Add the templates to VimWiki.
* Update the HTML output path.

Example:  
```VimL
let g:vimwiki_list = [{'path':'$HOME/recycle.bin/_content', 
                    \  'path_html':'$HOME/recycle.bin/output', 
                    \  'template_path': '$HOME/recycle.bin/_config/', 
                    \  'template_default': 'vimwiki', 
                    \  'template_ext': '.tpl', 
                    \  'auto_export':0}] 
```

Grunt options:
* ```grunt dist``` - Exports all the js, css, html and other files to 'dist' folder.

 NOTE: 
  You must export the VimWiki content to the output folder before your run this grunt command.
