ace.define("ace/ext/searchbox",["require","exports","module","ace/lib/dom","ace/lib/lang","ace/lib/event","ace/keyboard/hash_handler","ace/lib/keys"],function(e,t,i){"use strict";var s=e("../lib/dom"),n=e("../lib/lang"),a=e("../lib/event"),c=e("../keyboard/hash_handler").HashHandler,r=e("../lib/keys");s.importCssString('.ace_search {background-color: #ddd;color: #666;border: 1px solid #cbcbcb;border-top: 0 none;overflow: hidden;margin: 0;padding: 4px 6px 0 4px;position: absolute;top: 0;z-index: 99;white-space: normal;}.ace_search.left {border-left: 0 none;border-radius: 0px 0px 5px 0px;left: 0;}.ace_search.right {border-radius: 0px 0px 0px 5px;border-right: 0 none;right: 0;}.ace_search_form, .ace_replace_form {margin: 0 20px 4px 0;overflow: hidden;line-height: 1.9;}.ace_replace_form {margin-right: 0;}.ace_search_form.ace_nomatch {outline: 1px solid red;}.ace_search_field {border-radius: 3px 0 0 3px;background-color: white;color: black;border: 1px solid #cbcbcb;border-right: 0 none;box-sizing: border-box!important;outline: 0;padding: 0;font-size: inherit;margin: 0;line-height: inherit;padding: 0 6px;min-width: 17em;vertical-align: top;}.ace_searchbtn {border: 1px solid #cbcbcb;line-height: inherit;display: inline-block;padding: 0 6px;background: #fff;border-right: 0 none;border-left: 1px solid #dcdcdc;cursor: pointer;margin: 0;position: relative;box-sizing: content-box!important;color: #666;}.ace_searchbtn:last-child {border-radius: 0 3px 3px 0;border-right: 1px solid #cbcbcb;}.ace_searchbtn:disabled {background: none;cursor: default;}.ace_searchbtn:hover {background-color: #eef1f6;}.ace_searchbtn.prev, .ace_searchbtn.next {padding: 0px 0.7em}.ace_searchbtn.prev:after, .ace_searchbtn.next:after {content: "";border: solid 2px #888;width: 0.5em;height: 0.5em;border-width:  2px 0 0 2px;display:inline-block;transform: rotate(-45deg);}.ace_searchbtn.next:after {border-width: 0 2px 2px 0 ;}.ace_searchbtn_close {background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAcCAYAAABRVo5BAAAAZ0lEQVR42u2SUQrAMAhDvazn8OjZBilCkYVVxiis8H4CT0VrAJb4WHT3C5xU2a2IQZXJjiQIRMdkEoJ5Q2yMqpfDIo+XY4k6h+YXOyKqTIj5REaxloNAd0xiKmAtsTHqW8sR2W5f7gCu5nWFUpVjZwAAAABJRU5ErkJggg==) no-repeat 50% 0;border-radius: 50%;border: 0 none;color: #656565;cursor: pointer;font: 16px/16px Arial;padding: 0;height: 14px;width: 14px;top: 9px;right: 7px;position: absolute;}.ace_searchbtn_close:hover {background-color: #656565;background-position: 50% 100%;color: white;}.ace_button {margin-left: 2px;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-o-user-select: none;-ms-user-select: none;user-select: none;overflow: hidden;opacity: 0.7;border: 1px solid rgba(100,100,100,0.23);padding: 1px;box-sizing:    border-box!important;color: black;}.ace_button:hover {background-color: #eee;opacity:1;}.ace_button:active {background-color: #ddd;}.ace_button.checked {border-color: #3399ff;opacity:1;}.ace_search_options{margin-bottom: 3px;text-align: right;-webkit-user-select: none;-moz-user-select: none;-o-user-select: none;-ms-user-select: none;user-select: none;clear: both;}.ace_search_counter {float: left;font-family: arial;padding: 0 8px;}',"ace_searchbox");function o(e,t,i){var n=s.createElement("div");n.innerHTML=h,this.element=n.firstChild,this.setSession=this.setSession.bind(this),this.$init(),this.setEditor(e)}var h='<div class="ace_search right">    <span action="hide" class="ace_searchbtn_close"></span>    <div class="ace_search_form">        <input class="ace_search_field" placeholder="Search for" spellcheck="false"></input>        <span action="findPrev" class="ace_searchbtn prev"></span>        <span action="findNext" class="ace_searchbtn next"></span>        <span action="findAll" class="ace_searchbtn" title="Alt-Enter">All</span>    </div>    <div class="ace_replace_form">        <input class="ace_search_field" placeholder="Replace with" spellcheck="false"></input>        <span action="replaceAndFindNext" class="ace_searchbtn">Replace</span>        <span action="replaceAll" class="ace_searchbtn">All</span>    </div>    <div class="ace_search_options">        <span action="toggleReplace" class="ace_button" title="Toggel Replace mode"            style="float:left;margin-top:-2px;padding:0 5px;">+</span>        <span class="ace_search_counter"></span>        <span action="toggleRegexpMode" class="ace_button" title="RegExp Search">.*</span>        <span action="toggleCaseSensitive" class="ace_button" title="CaseSensitive Search">Aa</span>        <span action="toggleWholeWords" class="ace_button" title="Whole Word Search">\\b</span>        <span action="searchInSelection" class="ace_button" title="Search In Selection">S</span>    </div></div>'.replace(/> +/g,">");(function(){this.setEditor=function(e){e.searchBox=this,e.renderer.scroller.appendChild(this.element),this.editor=e},this.setSession=function(e){this.searchRange=null,this.$syncOptions(!0)},this.$initElements=function(e){this.searchBox=e.querySelector(".ace_search_form"),this.replaceBox=e.querySelector(".ace_replace_form"),this.searchOption=e.querySelector("[action=searchInSelection]"),this.replaceOption=e.querySelector("[action=toggleReplace]"),this.regExpOption=e.querySelector("[action=toggleRegexpMode]"),this.caseSensitiveOption=e.querySelector("[action=toggleCaseSensitive]"),this.wholeWordOption=e.querySelector("[action=toggleWholeWords]"),this.searchInput=this.searchBox.querySelector(".ace_search_field"),this.replaceInput=this.replaceBox.querySelector(".ace_search_field"),this.searchCounter=e.querySelector(".ace_search_counter")},this.$init=function(){var e=this.element;this.$initElements(e);var c=this;a.addListener(e,"mousedown",function(e){setTimeout(function(){c.activeInput&&c.activeInput.focus()},0),a.stopPropagation(e)}),a.addListener(e,"click",function(e){var t=(e.target||e.srcElement).getAttribute("action");t&&c[t]?c[t]():c.$searchBarKb.commands[t]&&c.$searchBarKb.commands[t].exec(c),a.stopPropagation(e)}),a.addCommandKeyListener(e,function(e,t,i){var n=r.keyCodeToString(i),s=c.$searchBarKb.findKeyCommand(t,n);s&&s.exec&&(s.exec(c),a.stopEvent(e))}),this.$onChange=n.delayedCall(function(){c.find(!1,!1)}),a.addListener(this.searchInput,"input",function(){c.$onChange.schedule(20)}),a.addListener(this.searchInput,"focus",function(){c.activeInput=c.searchInput,c.searchInput.value&&c.highlight()}),a.addListener(this.replaceInput,"focus",function(){c.activeInput=c.replaceInput,c.searchInput.value&&c.highlight()})},this.$closeSearchBarKb=new c([{bindKey:"Esc",name:"closeSearchBar",exec:function(e){e.searchBox.hide()}}]),this.$searchBarKb=new c,this.$searchBarKb.bindKeys({"Ctrl-f|Command-f":function(e){var t=e.isReplace=!e.isReplace;e.replaceBox.style.display=t?"":"none",e.replaceOption.checked=!1,e.$syncOptions(),e.searchInput.focus()},"Ctrl-H|Command-Option-F":function(e){e.replaceOption.checked=!0,e.$syncOptions(),e.replaceInput.focus()},"Ctrl-G|Command-G":function(e){e.findNext()},"Ctrl-Shift-G|Command-Shift-G":function(e){e.findPrev()},esc:function(e){setTimeout(function(){e.hide()})},Return:function(e){e.activeInput==e.replaceInput&&e.replace(),e.findNext()},"Shift-Return":function(e){e.activeInput==e.replaceInput&&e.replace(),e.findPrev()},"Alt-Return":function(e){e.activeInput==e.replaceInput&&e.replaceAll(),e.findAll()},Tab:function(e){(e.activeInput==e.replaceInput?e.searchInput:e.replaceInput).focus()}}),this.$searchBarKb.addCommands([{name:"toggleRegexpMode",bindKey:{win:"Alt-R|Alt-/",mac:"Ctrl-Alt-R|Ctrl-Alt-/"},exec:function(e){e.regExpOption.checked=!e.regExpOption.checked,e.$syncOptions()}},{name:"toggleCaseSensitive",bindKey:{win:"Alt-C|Alt-I",mac:"Ctrl-Alt-R|Ctrl-Alt-I"},exec:function(e){e.caseSensitiveOption.checked=!e.caseSensitiveOption.checked,e.$syncOptions()}},{name:"toggleWholeWords",bindKey:{win:"Alt-B|Alt-W",mac:"Ctrl-Alt-B|Ctrl-Alt-W"},exec:function(e){e.wholeWordOption.checked=!e.wholeWordOption.checked,e.$syncOptions()}},{name:"toggleReplace",exec:function(e){e.replaceOption.checked=!e.replaceOption.checked,e.$syncOptions()}},{name:"searchInSelection",exec:function(e){e.searchOption.checked=!e.searchRange,e.setSearchRange(e.searchOption.checked&&e.editor.getSelectionRange()),e.$syncOptions()}}]),this.setSearchRange=function(e){(this.searchRange=e)?this.searchRangeMarker=this.editor.session.addMarker(e,"ace_active-line"):this.searchRangeMarker&&(this.editor.session.removeMarker(this.searchRangeMarker),this.searchRangeMarker=null)},this.$syncOptions=function(e){s.setCssClass(this.replaceOption,"checked",this.searchRange),s.setCssClass(this.searchOption,"checked",this.searchOption.checked),this.replaceOption.textContent=this.replaceOption.checked?"-":"+",s.setCssClass(this.regExpOption,"checked",this.regExpOption.checked),s.setCssClass(this.wholeWordOption,"checked",this.wholeWordOption.checked),s.setCssClass(this.caseSensitiveOption,"checked",this.caseSensitiveOption.checked),this.replaceBox.style.display=this.replaceOption.checked?"":"none",this.find(!1,!1,e)},this.highlight=function(e){this.editor.session.highlight(e||this.editor.$search.$options.re),this.editor.renderer.updateBackMarkers()},this.find=function(e,t,i){var n=!this.editor.find(this.searchInput.value,{skipCurrent:e,backwards:t,wrap:!0,regExp:this.regExpOption.checked,caseSensitive:this.caseSensitiveOption.checked,wholeWord:this.wholeWordOption.checked,preventScroll:i,range:this.searchRange})&&this.searchInput.value;s.setCssClass(this.searchBox,"ace_nomatch",n),this.editor._emit("findSearchBox",{match:!n}),this.highlight(),this.updateCounter()},this.updateCounter=function(){var e=this.editor,t=e.$search.$options.re,i=0,n=0;if(t){var s=this.searchRange?e.session.getTextRange(this.searchRange):e.getValue(),c=e.session.doc.positionToIndex(e.selection.anchor);this.searchRange&&(c-=e.session.doc.positionToIndex(this.searchRange.start));for(var a,r=t.lastIndex=0;(a=t.exec(s))&&(i++,(r=a.index)<=c&&n++,!(999<i))&&(a[0]||(t.lastIndex=r+=1,!(r>=s.length))););}this.searchCounter.textContent=n+" of "+(999<i?"999+":i)},this.findNext=function(){this.find(!0,!1)},this.findPrev=function(){this.find(!0,!0)},this.findAll=function(){var e=!this.editor.findAll(this.searchInput.value,{regExp:this.regExpOption.checked,caseSensitive:this.caseSensitiveOption.checked,wholeWord:this.wholeWordOption.checked})&&this.searchInput.value;s.setCssClass(this.searchBox,"ace_nomatch",e),this.editor._emit("findSearchBox",{match:!e}),this.highlight(),this.hide()},this.replace=function(){this.editor.getReadOnly()||this.editor.replace(this.replaceInput.value)},this.replaceAndFindNext=function(){this.editor.getReadOnly()||(this.editor.replace(this.replaceInput.value),this.findNext())},this.replaceAll=function(){this.editor.getReadOnly()||this.editor.replaceAll(this.replaceInput.value)},this.hide=function(){this.active=!1,this.setSearchRange(null),this.editor.off("changeSession",this.setSession),this.element.style.display="none",this.editor.keyBinding.removeKeyboardHandler(this.$closeSearchBarKb),this.editor.focus()},this.show=function(e,t){this.active=!0,this.editor.on("changeSession",this.setSession),this.element.style.display="",this.replaceOption.checked=t,e&&(this.searchInput.value=e),this.searchInput.focus(),this.searchInput.select(),this.editor.keyBinding.addKeyboardHandler(this.$closeSearchBarKb),this.$syncOptions(!0)},this.isFocused=function(){var e=document.activeElement;return e==this.searchInput||e==this.replaceInput}}).call(o.prototype),t.SearchBox=o,t.Search=function(e,t){(e.searchBox||new o(e)).show(e.session.getTextRange(),t)}}),ace.require(["ace/ext/searchbox"],function(){});