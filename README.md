# Ajax-example

Please write the code for an object that allows us to register several different functions to execute a single common callback function. 

The purpose of the object is to execute all the registered functions and then, once ALL of them are finished, It should execute the defined callback function.

Once I call syncFuncs.start(), the syncFuncs object would start to execute all the registered functions asynchronously. Once the last one returns, it would finally execute the callback function.

I should also be able to define a maxmium time before the callback function executes. For example, if I define that as 3000 and it takes more than 3 seconds for all the registered ajax functions to return (after calling start()), it should proceed to execute the callback function even though the ajax functions have not finished returning.

To be clear, this code needs to be flexible, standalone, and reuseable. 

As a hint, you could do something along the following to register a function that makes an AJAX call to CouponDunia.

syncFuncs.register(function () {
	$.ajax({
 		url: "http://www.google.co.in"
	})
 	 .always(function(){ 
	  syncFuncs.markDone();
     });
})

As you see above the function that is being registered communicates with the syncFuncs object to tell the syncFuncs object that it (the registered function) has finished executing (through the use of markDone).

You can assume that any function that we register will implement a call to markDone at some point within it.
