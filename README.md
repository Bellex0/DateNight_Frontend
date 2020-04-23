# Date Night

### [App](http://datenight.surge.sh)
### [Demo](https://youtu.be/RtuMEX19Wo0)

A lifestyle app that helps users decide whether they should cook at home or go out to eat. Users can find recipes based on ingredients they already own, search for places to eat, and maintain a meal schedule.

Upon logging on/signing up, users are prompted to the main page


![main page](https://live.staticflickr.com/65535/49347708313_4d0bea6713_k.jpg/200x150) 

Users can choose:
 * **Eat In**
     * Enter ingredients they already have at home.  App generates recipes based on those ingredients.
      * View recipe details including prep & cook time and instructions
    * Add recipe to "Favorite Recipes" and "Events"
* **Go Out**
  * Search for restaurants based by specific keywords, category, and/or location
  * View each restaurant's info including Google Map location, Yelp page, price, rating. Restaurants are sorted by distance.  
  * Add restaurant to "Favorite Places" and "Events"
* **Favorite Recipes**
  * View all favorite recipes & details for each recipe
  * Delete recipe from favorites list
* **Favorite Places**
  * View all favorite places & details for each place
  * Delete restaurant from favorites list
* **Events**
  * Serves as a  schedule for users to organize what recipe they will cook or what restaurant they will go to for the upcoming days  
  * Update date & time for each event
  * Delete event from list
* **Profile**
  * View account information & avatar
  * Delete account

## Backend Repository
[Date Night API](https://github.com/Bellex0/DateNight-API)

## Technologies Used
* React.js 
* React-Router
* Ruby on Rails for backend
* Cloudinary 
* Yelp API
* Spoonacular API
* Google Maps API
* JSON Web Tokens (JWT)
* Semantic UI React
* HTML5(JSX)
* CSS (customized)
* Animate.css
 
## Installation
1) Install and run [Date Night API](https://github.com/Bellex0/DateNight-API)
2) Clone or download this repository to local system
3) Use preferred text editor and/or terminal to navigate into `DateNight_Frontend` directory
4) Run `npm install` (or `npm i`) in terminal
5) Run `npm start` in terminal to launch the app in browser

*Note: If backend (Rails) server is already running, it will be running on http://localhost:3000/. After running `npm start`, follow prompt and type `y` in terminal to run frontend on alternate port.
