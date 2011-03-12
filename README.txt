I have to say, there's no perfect input box when you want to limit user from inputting illegal characters, especially when we are writing a plugin.
But here I am trying to write such one, providing a simple way to do it: $("my input box").numbers(). Result is that only numbers are allowed to be typed into your input box. Here I simply categorize the usages into several ways:
1. Only care about characters(numbers or letters or spaces):
 $("#id").letters(), $("#id").lettersAndSpace(), $("#id").numberLetters(), $("#id").numberLettersAndSpace(), $("#id").numbers()

2. Special usage:
$("#id").integer(), $("#id").decimal(), $("#id").email(), $("#id").ip(), $("#id").money() 

3. If none of above could not meet your requirement, of course, you could create your own one:
$("#id").custom("Your regexp here"), 


Hope you could get better usability for your input box