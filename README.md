## Task for the candidate  
Create a single-page web application - Getflix - that allows a user to enter criteria into a search input field and display matching titles on the page. For each search result, show the title, the poster, and year it released.  
Clicking on a title should bring up a detailed view of the title - plot, cast, etc.  
Have a look at the API documentation from the OMDB API https://www.omdbapi.com/ to fetch movie data.  
You can create your own API key or use: **320f6ab2** (for example http://www.omdbapi.com/?i=tt3896198&apikey=320f6ab2)  
- The app should be responsive, i.e. compatible with different screen sizes.
- Don't worry about trying to be IE9 compatible - use as modern a framework/JS/CSS/HTML as is sensible (i.e. works on a popular browser I downloaded today).
- Feel free to use whatever libraries you think are necessary (CSS/JSS component providers, state management, routing).
- Writing tests is always a plus.
- This scaffolding supports Typescript if you prefer, but it's not required for this exercise.
Stretch goals:
- The API currently returns titles in lots of 10 - if you can, use the page parameter to request more as you scroll.
- If you have time, we'd love to see any embellishments (e.g. animations, transitions, dynamic fetching/loading).
When you're done, please provide the recruiter with the source code in a way that makes sense - zip file is fine, a link to a public repository like GitHub works too. Please provide some instructions for us to run the app (and the tests).