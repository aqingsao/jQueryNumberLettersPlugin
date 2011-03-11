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
		return this.each(function(){checkByReg($(this), options, /^[0-9a-zA-Z\s]*$/)});
    };
    $.fn.numbers = function(options) {
		return this.each(function(){checkByReg($(this), options, /^[0-9]*$/)});
    };

	$.fn.integer = function(options){
		return this.each(function(){checkByReg($(this), options, /^-?\d+$/)});
	}
	
    $.fn.decimal = function(options) {		
        return this.each(function(){checkByReg($(this), options, /^[-]$|^([-]){0,1}([0-9]){1,}([.]){0,1}([0-9]){0,}$/)});
	};

    $.fn.email = function(options) {				
		var firstSection = "^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@?$";//a, a@
		var secondSection = "^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\\.]?$";//a@b, a@b.
		var thirdSection = "^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\\.][a-z]{1,3}$";
		var fourthSection = "^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\\.][a-z]{2,3}[\\.]?$";
		var fifthSection = "^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\\.][a-z]{2,3}([\\.][a-z]{1,2})?$";
		var reg = new RegExp(firstSection +"|" + secondSection +"|" + thirdSection + "|" + fourthSection + "|" + fifthSection, "i");
		return this.each(function(){checkByReg($(this), {}, reg)});
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
    $.fn.money = function(options) {		
        return this.each(function(){checkByReg($(this), options, /^[-]$|^([-]){0,1}([0-9]){1,}([.]){0,1}([0-9]){0,2}$/)});
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
			if(newVal == "" || reg.test(newVal)){
				return;
			}
				
            e.preventDefault();
        });
		input.bind('contextmenu', function () {
          	return false;
        });
 		input.css('ime-mode', 'disabled');  
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
