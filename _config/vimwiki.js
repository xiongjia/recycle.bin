/* vimwik.js */
(function () {
  'use strict';
  $(document).ready(function() {
    var ctx;
   
    /* vim wiki context */
    ctx = (typeof vimwikiCtx !== 'undefined') ? vimwikiCtx : {
      enableRightBar: true,
      enableSyntax: true,
      enableDisqus: true
    };

    /* install disqus */
    function installDisqus(commentsElement) {
      var disqus;
      disqus = '<div id="vw-disqus">' +
        '<div id="disqus_thread"></div>' +
        '<script type="text/javascript">' +
          'var disqus_shortname = \'myvimwiki\';' +
          '(function() { ' +
          '  var dsq = document.createElement(\'script\');' +
          '  dsq.type = \'text/javascript\';' +
          '  dsq.async = true;' +
          '  dsq.src = \'//\' + disqus_shortname + \'.disqus.com/embed.js\';' +
          '  (document.getElementsByTagName(\'head\')[0] || ' +
          '   document.getElementsByTagName(\'body\')[0]).appendChild(dsq);' +
          '})();' +
        '</script>' +
        '<noscript>Please enable JavaScript to view the ' +
        '<a href="http://disqus.com/?ref_noscript">' +
        'comments powered by Disqus.</a></noscript>' +
        '<a href="http://disqus.com" class="dsq-brlink">' +
        'comments powered by <span class="logo-disqus">Disqus</span></a>' +
        '</div>';
      commentsElement.prepend(disqus);
    }

    /* right bar */
    function showRightBar() {
      var toc, tocToggler, comments;

      /* create the TOC Menu */
      tocToggler = $('<div class="vw-tocHdr"/>' +
        '<div class="toggler" title="TOC">Table of contents</div>');
      toc = $('.toc');
      toc.wrap('<div class="vw-right">');
      $('.vw-right').prepend(tocToggler)
        .delay(100)
        .fadeTo(500, '0.5')
        .hover(function() {
          $(this).stop().fadeTo(300, '0.9');
        }, function() {
          $(this).stop().fadeTo(300, '0.5');
        });
      $('div.toc').slideToggle(300);
      tocToggler.click(function() {
          $('div.toc').slideToggle(300);
        });

      /* install disqus */
      comments = $('#vw-comments');
      if (ctx.enableDisqus && comments && comments.length) {
        installDisqus(comments);
        $('.toc').after('<br><br>' +
          '<a href="#vw-disqus">&gt; 留言(Post Your Comments)</a>');
      }

      /* create google cse */
      $('.vw-tocHdr').before('<div style="width: 100%;">' +
        '<gcse:search></gcse:search></div><br>');
      /* update gcse */
      (function() {
        var cx = '008101672356870034238:sapwemkcsbs';
        var gcse = document.createElement('script');
        gcse.type = 'text/javascript';
        gcse.async = true;
        gcse.src = 'https://www.google.com/cse/cse.js?cx=' + cx;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gcse, s);
      })();
    }

    /* image lazy load */
    $('img.lazy').lazyload();

    if (ctx.enableSyntax) {
      /* update syntax */
      SyntaxHighlighter.highlight();
    }

    /* update external links */
    $('a[href]').each(function() {
      if (this.href.indexOf(window.location.host) === -1) {
        $(this).attr({ target: '_blank', title: this.href });
      }
    });

    if (ctx.enableRightBar && window.innerWidth >= 450) {
      /* show right bar */
      showRightBar();
    }
  });
})();

