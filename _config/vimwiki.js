/* vimwik.js */
(function vimwiki() {
  'use strict';
  $(document).ready(function() {
    var toc, tocToggler;

    /* TOC menu */
    tocToggler = $('<div class="toggler" title="TOC">Table of contents</div>');
    toc = $('.toc');
    toc.wrap('<div class="vw-toc">');
    $('.vw-toc').prepend(tocToggler)
      .delay(300)
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

    /* update syntax */
    SyntaxHighlighter.all();
  });
})();

