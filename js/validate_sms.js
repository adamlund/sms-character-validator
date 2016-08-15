(function ($) {
    ValidateSMS = function (opts) {

      // In options, pass the id of the element you want set to
      // filter on characters outside of the acceptable character set
      // pass it as "input_textarea"
      var settings = {
        "input_textarea":"sms_body",  // ID attribute name of the text input area
        "highlight_color":"#fff835",
        "z_index_start":"1",
        "width":"400",
        "height":"120",
        "sms_warning_message_class":"sms_warning_message", // provide a css class to style error message
        "sms_warning_message":"<h2>Warning!</h2>You have entered characters that are outside of the valid SMS character set. These characters may not display correctly on the recipients handset, or be removed once sent. Remove the highlighted characters to clear this warning.",
      };
      var options = $.extend(settings, opts);
      var that = this;
      var input_textarea,
        sms_outer_container,
        highlighter_container,
        highlighter,
        input_container,
        sms_character_warning,
        highlight_css;

      function highlightNonGSMChars(str){
        var msg = str;
        var errchars = [];

        if(typeof(str)!=='string'){
            return false;
        }

        for(var i=0;i<str.length;i++){
            //var re = new RegExp(/[\000-\172]/);

            if(str.charCodeAt(i)>122 && $.inArray(str.charCodeAt(i), errchars) < 0){
              errchars.push(str.charCodeAt(i));
              msg = replaceAll(msg,str.charAt(i),'<span style="' + highlight_css + '">'+str.charAt(i)+'</span>');
            }
        }

        numberOfErrors(errchars.length);

        return msg;
      }

      function replaceAll(txt, replace, with_this) {
          if(replace.charCodeAt(0) == 124){
              replace = '\\|';
          }
          return txt.replace(new RegExp(replace, 'g'),with_this);
      }

      function numberOfErrors(howmany){
        if(howmany === 0){
          if(sms_outer_container.parentNode.contains(sms_character_warning)){
            sms_outer_container.parentNode.removeChild(sms_character_warning);
          }
        }
        else if(howmany > 0) {
          if(sms_outer_container.parentNode.contains(sms_character_warning) === false){
            sms_outer_container.parentNode.appendChild(sms_character_warning);
          }
        }
      }

      var sms_body_handler = function() {
        var text = $(input_textarea).val();
        text = highlightNonGSMChars(text);
        text = replaceAll(text,'\n','<br/>');
        text = replaceAll(text,'  ','&nbsp;&nbsp;');
        //text = replaceAll(text,' ','&nbsp;');

        $(highlighter).html(text);
      };

      this.init = function() {

        var zindex = parseInt(options.z_index_start);
        // TODO: improve DOM creation
        sms_outer_container = document.createElement("div");
        highlighter_container = document.createElement("div");
        highlighter = document.createElement("div");
        input_container = document.createElement("div");
        sms_character_warning = document.createElement("div");
        sms_character_warning.innerHTML = options.sms_warning_message;
        sms_character_warning.classList.add(options.sms_warning_message_class);

        input_textarea = document.getElementById(options.input_textarea);
        input_textarea.parentNode.appendChild(sms_outer_container);
        input_textarea.parentNode.appendChild(sms_character_warning);

        sms_outer_container.appendChild(highlighter_container);
        highlighter_container.appendChild(highlighter);
        sms_outer_container.appendChild(input_container);
        input_container.appendChild(input_textarea);

        highlight_css = "background-color:" + options.highlight_color + ";";
        highlight_css += "color:" + options.highlight_color;

        try {
            $(sms_outer_container).css({
                'position':'relative',
                'margin-top':'20px',
                'margin-bottom':'20px',
                'height': (parseInt(options.height, 10) + 22) + "px",
                'width': (parseInt(options.width, 10) + 19) + "px"
            });

            $(highlighter_container).css({
                'position':         'absolute',
                'left':             '0px',
                'top':              '0px',
                'width':            options.width + "px",
                'height':           options.height + "px",
                'border':           '1px dashed #ccc',
                'cursor':           'text',
                'z-index': new String(zindex + 1)
            });

            $(input_container).css({
                'position':         'absolute',
                'left':             '0',
                'top':              '0',
                'border':           '0px solid #000000',
                'z-index': new String(zindex + 2),
                'background':   'none repeat scroll 0 0 transparent'
            });

            var isWebKit = navigator.userAgent.indexOf("WebKit") > -1,
                isOpera = navigator.userAgent.indexOf("Opera") > -1,
                isIE /*@cc_on = true @*/,
                isIE6 = isIE && !window.XMLHttpRequest; // Despite the variable name, this means if IE lower than v7

            if (isIE || isOpera){
                var padding = '6px 5px';
            }
            else {
                var padding = '4px 4px';
            }

            $(highlighter).css({
                'padding':          padding,
                'overflow-wrap':    'break-word',
                'word-wrap':        'break-word',
                '-ms-word-break':   'break-all',
                'word-break':       'break-word',
                'display':          'inline-block',
                'overflow':         'hidden',
                'color':            '#fff',
                'background-color': '#fff',
                'margin':           '0px',
                'width':            options.width + "px",
                'height':           options.height + "px",
                'font-size':        '14px' ,
                'line-height':      '16px' ,
                'font-family':      '"courier new", courier, monaco, monspace,sans-serif'
                //  'font-family':      '"lucida grande",tahoma,verdana,arial,sans-serif'
            });

            $(input_textarea).css({
                'background-color': 'transparent',
                'background-image': 'none',
                'overflow':         'hidden',
                'color':             '#333',
                'padding':          '5px',
                'margin':           '0px',
                'width':            options.width + "px",
                'height':           options.height + "px",
                'font-size':        '14px',
                'line-height':      '16px' ,
                'resize':           'none',
                'font-family':      '"courier new", courier, monaco, monspace,sans-serif',
                //'font-family':      '"lucida grande",tahoma,verdana,arial,sans-serif',
                'border':           '1px solid #cccccc'
            });

            $(highlighter_container).bind('click', function() {
                $(input_textarea).focus();
            });
            $(input_textarea).bind('keyup', sms_body_handler);

            sms_body_handler();

          } catch (err) {
            console.log(err);
          }
          return this;
      }

      this.deinitialize = function() {
        $(highlighter_container).unbind();
        $(input_textarea).unbind('keyup', sms_body_handler);
      }
    };

})(jQuery);
