# Hypervion - Fake News Detection System

## Frontend Design
React.js is used to implement frontend. We have used Material UI for majority of our UI task, since it provides majority of components pre made. We obviously have made few changes in it. There are 2 main pages in our web application. 

### Login Page:
We used OAuth provided by Firebase Authentication for secure login. Currently it only supports OAuth from Google and Facebook. In future we might integrate OAuth of other 3rd party providers or create our own login. So users with Google or Facebook account can login easily. We used Firebase because it is a really easy to implement, secure, reliable and scalable service. It helps in really fast development as well.
![Screenshot 2024-06-15 142113](https://github.com/asquare004/Fake-News-Detection-System/assets/126737709/187bf3a6-93b9-43d1-acfa-831890842262)

### Home Page:
The Home page has navigation drawer along with a space to enter prompt and see results. User can view their profile. Users can also save responses of news and view them in History tab. History tab can be accessed from Navigation drawer. We have stored all history in firebase real time database.  
![Screenshot 2024-06-15 142140](https://github.com/asquare004/Fake-News-Detection-System/assets/126737709/476aba78-03ed-442d-82c3-ab742e9fc8ad)
