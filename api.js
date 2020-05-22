function getContests(method, callbackFunction) {
	const baseUrl = 'https://codeforces.com/api/';
	const https = new XMLHttpRequest();
	https.open("GET", baseUrl + method);
	https.onload = () => callbackFunction(JSON.parse(https.responseText));
	https.send();	
}