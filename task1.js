var iTotalRequest = 0, // Total number of request 
    iTotalRequestCompleted = 0, // Total number of successful request
    bMarkDone = false,
	timeUp = true;
    syncFuncs = {};

syncFuncs.registeredFunctions = [];
syncFuncs.callBackFunctionName = "";

syncFuncs.register = function (inputFunc) {
    syncFuncs.registeredFunctions.push(inputFunc);
};

syncFuncs.processDataWhenTimeUp = function(){
	if(!bMarkDone){
		bMarkDone = true;
		window[syncFuncs.callBackFunctionName]();
	}
}

// Start function to send requests                  
syncFuncs.start = function (timeLimit, callBackFunctionName) {
    // iterate over syncFuncs.registeredFunctions
    
	syncFuncs.callBackFunctionName = callBackFunctionName;
    iTotalRequest = syncFuncs.registeredFunctions.length;
	// if the response for all requests does not come up in given timeLimit, call the callback function
	setTimeout(function(){syncFuncs.processDataWhenTimeUp()}, timeLimit);
    for (var iter = 0; iter < iTotalRequest; iter++) {
        syncFuncs.registeredFunctions[iter]();
    }    
}

//markDone function to say a response is got
syncFuncs.markDone = function (callBackFunctionName) {
    iTotalRequestCompleted++;
    //====alert(iTotalRequestCompleted);
    if (!bMarkDone && iTotalRequest === iTotalRequestCompleted) {
        bMarkDone = true;
		timeUp = false; // all responses came in time limit
		window[syncFuncs.callBackFunctionName]();
    }
}

function callMe() {
	syncFuncs.registeredFunctions = [];
	syncFuncs.callBackFunctionName = "";
	iTotalRequest = 0, // Total number of request 
    iTotalRequestCompleted = 0, // Total number of successful request
    bMarkDone = false,
	timeUp = true;
	
    // Register different ajax calls with syncFuncs register function
    syncFuncs.register(function () {
        $.ajax({
            url: "http://www.google.co.in",
            type: "GET",
            success: '',
            failure: '',
            complete: function () {				
                syncFuncs.markDone();
            }
        });
    });
    syncFuncs.register(function () {
        $.ajax({
            url: "http://www.coupondunia.in",
            type: "GET",
            success: '',
            failure: '',
            complete: function () {
                syncFuncs.markDone();
            }
        });
    });
	syncFuncs.register(function () {
        $.ajax({
            url: "http://www.google.co.in",
            type: "GET",
            success: '',
            failure: '',
            complete: function () {				
                syncFuncs.markDone();
            }
        });
    });
    syncFuncs.register(function () {
        $.ajax({
            url: "http://www.coupondunia.in",
            type: "GET",
            success: '',
            failure: '',
            complete: function () {
                syncFuncs.markDone();
            }
        });
    });
	syncFuncs.register(function () {
        $.ajax({
            url: "http://www.google.co.in",
            type: "GET",
            success: '',
            failure: '',
            complete: function () {				
                syncFuncs.markDone();
            }
        });
    });
    syncFuncs.register(function () {
        $.ajax({
            url: "http://www.coupondunia.in",
            type: "GET",
            success: '',
            failure: '',
            complete: function () {
                syncFuncs.markDone();
            }
        });
    });
	
	// time out and callback function
    syncFuncs.start(3000, "processResultJSON");
}

function processResultJSON(){
	var resultData = "";
	if(timeUp){
		resultData = "All requests were NOT completed in given time frame and hence shown data from whichever response came up.";
	}
	else{
		resultData = "All requests completed in given time frame and hence shown data from them.";		
	}
	$('#info').html(resultData);
}