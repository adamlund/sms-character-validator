Character Highlighter for SMS Messages
=====
Using a textarea Highlights characters out of the safe range for SMS messages to avoid splitting messages and problems sending and receiving messages.

===

### Character sets allowed or flagged
1. Allowable characters include standard ASCII set (1-122)
1. GSM 03.38 and unicode characters are flagged because often this results in splitting messages because characters take up double the space, reducing character count
1. References: [GSM spec], [SMS character sets]

===

### Dependencies
* At present depends on JQuery, at 1.7 or higher
* Relies on using an ID within a textarea, in future will make this a data- attribute

===

### Add to your project using bower

Add the project to your bower dependencies. All you need is js/validate_sms.js.

You may use a specific version by [specifying a tag](http://dev-scm.office.gdi/adam.lund/sms-character-validator/tags):
    
    "sms-character-validator": "git@dev-scm.office.gdi:adam.lund/sms-character-validator.git#0.1"

===

### Applying the highlighter to a text area
Include the javascript file. Use a textarea in your document. Pass the ID of the textarea to initialize the highlighter.
#### Basic with defaults
```html
<textarea id='sms_body' maxlength='250'></textarea>
<script>
  new ValidateSMS({"input_textarea":"sms_body"}).init();
</script>
```
#### Providing custom options (example)
```html
<textarea id='sms_body' maxlength='250'></textarea>
<script>
  var input_opts = {
    "input_textarea":"sms_body",                            // provide the ID for the textarea
    "sms_warning_message_class":"sms-custom-warning-css",   // custom CSS class to style warning message
    "highlight_color":"#FF9904",                            // color for the text highlight hex or RGB
    "height":"150",                                         // customize height, number only
    "width":"500"                                           // customize width, number only
   };
  new ValidateSMS(input_opts).init();
</script>
```

### Config Options
Put these in a key/value object like in the above example.

**input_textarea** default "sms_body"
> Provide the ID for the textarea element.

**highlight_color** default "#fff835"
> Change the background color for highlighted characters.

**z_index_start** default "1"
> Set higher if you have elements with z-index above 1.

**width** default "400",
> Customize width. Set numeric value, do not include units. Automatically set to pixels.

**height** default "120",
> Customize height. Set numeric value, do not include units. Automatically set to pixels.

**sms_warning_message_class** no default
> Provide a CSS class name to style the warning message box. 

**sms_warning_message** default (long message)
> Customize the text copy for the warning message. Can include HTML characters.


[SMS character sets]: <https://www.csoft.co.uk/support/character-sets>
[GSM spec]: https://en.wikipedia.org/wiki/GSM_03.38
