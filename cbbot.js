var _           = require('lodash');
var Client      = require('node-rest-client').Client;
var Twit        = require('twit');
var async       = require('async');
var wordFilter  = require('wordfilter');

var t = new Twit({
    consumer_key:         process.env.CBBOT_TWIT_CONSUMER_KEY
  , consumer_secret:      process.env.CBBOT_TWIT_CONSUMER_SECRET
  , access_token:         process.env.CBBOT_TWIT_ACCESS_TOKEN
  , access_token_secret:  process.env.CBBOT_TWIT_ACCESS_TOKEN_SECRET
});

getPublicTweet = function(cb) {

    t.get('search/tweets', { q: '#CarteBlanche2015', count: 1 }, function(err, data, response) {
      cb(data);
    });

};

postTweet = function(botData, cb) {
    var list = [
        'Turn up the love.',
        'Turn up the volume, close your eyes and let the music take over your soul.',
        'Keep calm and wait for the drop.',
        '1, 2, 3, JUMP!',
        'We came. We raved. We loved.',
        'Turn off your brain and turn on your heart.',
        'Live life intensely. You\'re only here once.',
        'Don\'t judge it \'till you have experienced it.',
        'This is where I feel alive.',
        'Music is life.',
        'Good music, good friends, good vibes.',
        'LET\'S DANCE!',
        'It\'s more than music to us!',
        'WE LOSE OURSELVES IN THE ARMS OF THIS CROWD.',
        'And I say to my heart: RAVE ON!',
        'BRING ON THE NIGHT',
        'MUSIC IS OUR FREEDOM',
        'We. Are. All. Mad. Here.',
        'WE ARE YOUR FRIENDS!',
        'If I lose myself tonight, I will be by your side.',
        'BE FREE',
        'May the BASS be with you.',
        'good FUCKING vibes',
        'Free your mind.',
        'Where the dreamers go.',
        'We\'re the therapists pumping through your speakers.',
        'WATCH YOUR DUBSTEP',
        'E. D. M.',
        'Inhale music. Exhale problems.',
        'See heaven\'s got a plan for you~',
        'I made you a bass, but I dropped it.',
        'MAKE THESE NIGHTS LAST FOREVER',
        'F**k genres, lets DANCE',
        'LET IT ALL OUT',
        'Play it f**kin LOUD!',
        'Get dressed up to get messed up!',
        'Show us what you got when the BEAT DROPS',
        'IT\'S TRUE, I CRAVE YOU',
        'Eat. Sleep. Rave. Repeat.',
        'Thousands of people sharing the same HAPPINESS.',
        'Life is better under the ELECTRIC SKY',
        'WE LIVE IN A STATE OF TRANCE',
        'You cant overdose on music',
        'DROP THE BASS. NOT BOMBS.',
        'EUPHORIA',
        'PARTY TIME!'

    ];
    var rn = _.random(0, (list.length - 1));
    t.post('statuses/update', {status: list[rn].concat(' #CarteBlanche2015 #CarteBlancheDavao #CBMMF')}, function(err, data, response) {
      console.log('Tweet posted.');
    });
};

run = function() {
  async.waterfall([
    getPublicTweet
  ],
  function(err, botData) {
    if (err) {
        _.forEach(err.statuses, function(n, key) {
          var tid = n.id_str;
            if (n.retweeted === false) {
                t.post('statuses/retweet/:id', { id: tid }, function (err, data, response) {
                    console.log(data);
                });
            }
        });
    }
  });
};

tweetQuote = function() {
  async.waterfall([
    postTweet
  ],
  function(err, botData) {

  });
};

setInterval(function() {
  try {
    run();
  }
  catch (e) {
    console.log(e);
  }
}, 60000 * 3); // run every 3 minutes

setInterval(function() {
  try {
    tweetQuote();
  }
  catch (e) {
    console.log(e);
  }
}, 60000 * 30); // run every 30 minutes
