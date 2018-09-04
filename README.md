BNP-Twitter-App

It is single-page application using React / Redux(client side) + nodejs(server side).The app is Twitter node module to fetch and post new tweets.

Specs:

The app doesn't require any kind of authentication.
The app contains one home page where you can see the tweets has been posted 100miles around your location.
In order to see tweets posted around your location you must let browser know your location.
The app has feature of infinite scrolling (it can access last 7 days of tweets).

Technologies Used:
WWW
React is used at the client side.
Axios is used for api calls from client side.

API
Express for the creating server and handling requests.
Twitter node module for communicating with twitter api.


Getting Started

*Assuming that Node is already installed on your PC.

To get the project running on your PC you have to first get the clone url: https://github.com/muraree/bnp-twitter-app.git

Then you have to do "npm install" inside the project directory.

Export your twitter authorization keys in process env such as:
CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET

Then "yarn dev" to start the project.

Note- Any feedbacks for improvement are appreciated.
