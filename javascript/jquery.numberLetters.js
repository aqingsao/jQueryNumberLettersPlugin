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
		// var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.?$|^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.?$|^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.?$|^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
		var basic = "([1-9]|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
		var firstSection = basic;
		var secondSection = basic + "\\." + basic;
		var thirdSection = basic + "\\." + basic + "\\." + basic;
		var fourthSection = basic + "\\." + basic + "\\." + basic + "\\." + basic;
		var reg = new RegExp("^" + firstSection +"\\.?|" + secondSection +"\\.?|" + thirdSection + "\\.?|" + fourthSection + "$");
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
		input.keypress(function (e) {
            var key = e.which;
            if (isSpecialKey(key) || (e.metaKey || e.ctrlKey)) {
                return;
            }
			if(!reg.test(e.target.value)){
				// Should handle this case
			}
			var newVal = getNewVal(e.target, String.fromCharCode(key));
			if(reg.test(newVal)){
				return;
			}
				
            e.preventDefault();
        });
        input.bind('contextmenu', function () {
          	return false;
        });
	};
	
	function getNewVal(target, newChar){
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
        return key == 0 || key == 8 || key == 13 || key == 9;
    }

})(jQuery);
