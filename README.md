This project helps you build maps with a jQuery UI slider that will change the year of data the map displays.

The vars near the top of the javascript file must be updated to add your own data files. If you are hosting your data with Google Fusion Tables, use the googft.js file. If you are hosting your data with CartoDB, use the cartodb.js file.

Also, note that in the index.html file, the googft.js file is currently commented out, while the cartodb.js file is not. If you are using Google Fusion Tables, simply comment out the cartodb.js file and use the googft.js file.

NOTES ON DATA STRUCTURE

If you are hosting your data with CartoDB, the program expects you to have made a different map for each year or date you want to display. Simply grab the map IDs from the URL and paste them into the appropriate var in the javascript file.

If you are hosting your data with Google Fusion Tables, you should make new maps in succeeding tabs in your Google Fusion Tables file.