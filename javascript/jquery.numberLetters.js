(function($) {

    $.fn.letters = function(options) {
		return this.each(function(){limitInput($(this), options, /^[a-zA-Z]*$/)});
    };
    $.fn.lettersAndSpace = function(options) {
		return this.each(function(){limitInput($(this), options, /^[a-zA-Z\s]*$/)});
    };
    $.fn.numberLetters = function(options) {
		return this.each(function(){limitInput($(this), options, /^[0-9a-zA-Z]*$/)});
    };
    $.fn.numberLettersAndSpace = function(options) {
		return this.each(function(){limitInput($(this), options, /^[0-9a-zA-Z\s]*$/)});
    };
    $.fn.numbers = function(options) {
		return this.each(function(){limitInput($(this), options, /^[0-9]*$/)});
    };

	$.fn.integer = function(options){
		return this.each(function(){limitInput($(this), options, /^-?\d*$/)});
	}
	
    $.fn.decimal = function(options) {		
        return this.each(function(){limitInput($(this), options, /^[-]$|^([-]){0,1}([0-9]){1,}([.]){0,1}([0-9]){0,}$/)});
	};

    $.fn.email = function(options) {				
		var firstSection = "^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@?$";//a, a@
		var secondSection = "^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\\.]?$";//a@b, a@b.
		var thirdSection = "^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\\.][a-z]{1,3}$";a@b.com
		var fourthSection = "^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\\.][a-z]{2,3}[\\.]?$";//a@b.com, a@b.com.
		var fifthSection = "^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\\.][a-z]{2,3}([\\.][a-z]{1,2})?$";//a@b.com.cn
		var reg = new RegExp(firstSection +"|" + secondSection +"|" + thirdSection + "|" + fourthSection + "|" + fifthSection, "i");
		return this.each(function(){limitInput($(this), options, reg)});
    };
    $.fn.ip = function(options) {
		var basic = "([1-9]|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
		var empty = "^$";
		var firstSection = basic;
		var secondSection = basic + "\\." + basic;
		var thirdSection = basic + "\\." + basic + "\\." + basic;
		var fourthSection = basic + "\\." + basic + "\\." + basic + "\\." + basic;
		var reg = new RegExp(empty + "|^" + firstSection +"\\.?$|^" + secondSection +"\\.?$|^" + thirdSection + "\\.?$|^" + fourthSection + "$");
		
		return this.each(function(){limitInput($(this), options, reg)});
    };
    $.fn.money = function(options) {		
        return this.each(function(){limitInput($(this), options, /^[-]$|^([-]){0,1}([0-9]){1,}([.]){0,1}([0-9]){0,2}$/)});
	};

    $.fn.custom = function(regexp, options) {		
        return this.each(function(){limitInput($(this), options, new RegExp(regexp))});
	};

	function limitInput(input, options, reg){
		var defaultOptions = {
			pasteAllowed: false, 
			validationOnDelete: true
		};
		var options = $.extend(defaultOptions, options);
		input.keypress(function (e) {
            var key = e.which;

            if (isCtrlOrMetaKey(e)) {
				if(isPasteKey(e, key) && !options.pasteAllowed){
					e.preventDefault();
				}
                return;
            }

            if (isSpecialKey(key)){
				return;
            }

			if(isDeleteKey(key)){
				if(options.validationOnDelete){
					var newVal = getValAfterDelete(e.target);
					if(notValid(reg, newVal)){
			            e.preventDefault();
					}
				}
				return;
			}
				
			if(!reg.test(e.target.value)){
				// Should handle this case
			}
			var newVal = getNewVal(e.target, key);
			if(notValid(reg, newVal)){
	            e.preventDefault();
			}
        });

		if(!options.pasteAllowed){
			input.bind('contextmenu', function () {
	          	return false;
	        });
		}
 		input.css('ime-mode', 'disabled');  
	};
	
	function notValid(reg, newVal){
		return newVal != "" && !reg.test(newVal);
	}	
	
	function getNewVal(target, key){
		var newChar = String.fromCharCode(key);
		if(target.selectionStart == target.selectionEnd && target.selectionStart == 0){
				return newChar + target.value;
	 	}
		else if(target.selectionStart == target.selectionEnd && target.selectionStart == target.textLength){
			return target.value + newChar;
		}
		return target.value.substring(0, target.selectionStart) + newChar + target.value.substring(target.selectionEnd, target.textLength);
	}
	
	function getValAfterDelete(target){
		 return target.value.substring(0, target.selectionStart - 1) + target.value.substring(target.selectionEnd, target.textLength);
	}
	
    function isSpecialKey(key) {
        return key == 0 || key == 13 || key == 9;
    }
    function isDeleteKey(key) {
        return key == 8;
    }
	function isCtrlOrMetaKey(e){
		return e.metaKey || e.ctrlKey;
	}
	function isPasteKey(e, key){
		return (e.metaKey || e.ctrlKey) && (key == 86 || key == 118);
	}

})(jQuery);
