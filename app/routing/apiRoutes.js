var friends = require('../data/friends.js');

module.exports = function(app) {
	console.log("API route")
	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	app.post('/api/friends', function(req, res) {
		var srvyRequest = req.body;
		console.log('srvyRequest = ' + JSON.stringify(srvyRequest));

		var srvyResp = srvyRequest.scores;
		console.log('srvyResp = ' + srvyResp);

		var firstTime = true;
		var prevDiff = 0;
		var friendpic = '';
		var friendName = '';

		for (var i = 0; i < friends.length; i++) {
			console.log('friend = ' + JSON.stringify(friends[i]));
			var curDiff = 0;
			for (var j = 0; j < srvyResp.length; j++) {
				curDiff += Math.abs(friends[i].scores[j] - srvyResp[j]);
			}
			console.log('Current calculated difference = ' + curDiff);

			if (firstTime) {
				firstTime = false;
				prevDiff = curDiff;
				friendName = friends[i].name;
				friendpic = friends[i].photo;
			}

			if (curDiff < prevDiff) {
				console.log('Closest match found so far = ' + curDiff);
				console.log('Friend name = ' + friends[i].name);
				console.log('Friend image = ' + friends[i].photo);

				prevDiff = curDiff;
				friendName = friends[i].name;
				friendpic = friends[i].photo;
			}
		}

		friends.push(srvyRequest);
		res.json({status: 'OK', friendName: friendName, friendpic: friendpic});
	});
};
