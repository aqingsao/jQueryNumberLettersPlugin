(function($) {

    $.fn.letters = function(options) {
		return this.each(function(){checkByReg($(this), options, /^\w*$/)});
    };
    $.fn.lettersAndSpace = function(options) {
		return this.each(function(){checkByReg($(this), options, /^[\w\s]*$/)});
    };
    $.fn.numberLetters = function(options) {
		return this.each(function(){checkByReg($(this), options, /^[0-9a-zA-Z]*$/)});
    };
    $.fn.numberLettersAndSpace = function(options) {
		return this.each(function(){checkByReg($(this), options, /^[0-9a-zA-Z ]*$/)});
    };
    $.fn.numbers = function(options) {
		return this.each(function(){checkByReg($(this), options, /^[0-9]*$/)});
    };

    $.fn.email = function(options) {
		return this.each(function(){checkByReg($(this), options, /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)});
    };
    $.fn.url = function(options) {
		return this.each(function(){checkByReg($(this), options, /^[a-zA-z]+:\/\/[^\s]*$/)});
    };
    $.fn.ip = function(options) {
		var basic = "([1-9]|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
		var empty = "^$";
		var firstSection = basic;
		var secondSection = basic + "\\." + basic;
		var thirdSection = basic + "\\." + basic + "\\." + basic;
		var fourthSection = basic + "\\." + basic + "\\." + basic + "\\." + basic;
		var reg = new RegExp(empty + "|^" + firstSection +"\\.?$|^" + secondSection +"\\.?$|^" + thirdSection + "\\.?$|^" + fourthSection + "$");
		
		var options = {_specialKeyRevalidated : [8]};//Delete key must be revalidated, as will might violate reg
		return this.each(function(){checkByReg($(this), options, reg)});
    };

	$.fn.integer = function(options){
		return this.each(function(){checkByReg($(this), options, /^-?\d+$/)});
	}
	$.fn.positiveInteger = function(options){
		return this.each(function(){checkByReg($(this), options, /^[0-9]*[1-9][0-9]*$/)});
	}
    $.fn.decimal = function(options) {		
        return this.each(function(){checkByReg($(this), options, /^[-]$|^([-]){0,1}([0-9]){1,}([.]){0,1}([0-9]){0,}$/)});
	};

	function checkByReg(input, options, reg){
		var defaultOptions = {
			_specialKeyRevalidated : []
		};
		var options = $.extend(defaultOptions, options);
		input.keypress(function (e) {
            var key = e.which;
            if (e.metaKey || e.ctrlKey) {
                return;
            }

            if (isSpecialKey(key)){
				return;
            }

			if(!reg.test(e.target.value)){
				// Should handle this case
			}
			var newVal = getNewVal(e.target, key);
			if(reg.test(newVal)){
				return;
			}
				
            e.preventDefault();
        });
        input.bind('contextmenu', function () {
          	return false;
        });
	};
	
	function getNewVal(target, key){
		if(key == 8){//delete key
			return target.value.substring(0, target.selectionStart - 1) + target.value.substring(target.selectionEnd, target.textLength);
		}
		var newChar = String.fromCharCode(key);
		if(target.selectionStart == target.selectionEnd && target.selectionStart == 0){
				return newChar + target.value;
	 	}
		else if(target.selectionStart == target.selectionEnd && target.selectionStart == target.textLength){
			return target.value + newChar;
		}
		else{
			return target.value.substring(0, target.selectionStart) + newChar + target.value.substring(target.selectionEnd, target.textLength);
		}
	}
	
    function isNumber(key) {
        return key >= 48 && key <= 57;
    }

    function isLetter(key) {
        return (key >= 65 && key <= 90) || (key >= 97 && key <= 122);
    }

    function isSpecialKey(key) {
        return key == 0 || key == 13 || key == 9;
    }

})(jQuery);
