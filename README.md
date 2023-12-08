# BusRoots

## 1. Project Description
BusRoots encourages everyone to take transit by rewarding users points for every trip they take. Trees are planted based on accumulated points.

## 2. Names of Contributors
List team members and/or short bio's here... 
* Kevin Nguyen
* Sunwoo Baek
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* Translink API https://www.translink.ca/about-us/doing-business-with-translink/app-developer-resources/rtti
* Team images from https://oldschool.runescape.wiki/
* Default profile image from https://en.wikipedia.org/wiki/File:Default_pfp.svg 

## 4. Complete setup/installation/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* The app is hosted on firebase at busroots-420df.web.app
* Can live serve on Visual Studio Code

## 5. Known Bugs and Limitations
Here are some known bugs:
* The feature that allows users to upload their own profile picture works on liveserve, but not when hosted on firebase.

## 6. Features for Future
What we'd like to build in the future:
* Friends list / adding friends.
* Ability to select bus stop from a Maps interface.
* Show more info about how they're helping the environment by taking the bus / metrics.
* Include visuals at specific tiers depending on how many trees that have been planted.
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── aboutus.html             # about us HTML file, includes background information of the app.
├── index.html               # landing HTML file, this is what users see when you come to url.
├── leaderboard.html         # leaderboard HTML file, you can see how you rank against other users.
├── login.html               # login HTML file, login to an existing user account.
├── main.html                # main HTML file, with the function to earn points.
├── profile.html             # profile HTML file, see and change user profile data.
├── README.md                #
├── signup.html              # signup HTML file, sign up for a user account.
├── team.html                # team HTML file, user selects which team to join.
└── template.html            # template HTML file to easily create new pages with the same skeleton

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /bronze-tree.png         # Created by Kevin
    /Connected.jpg           # 
    /Connected.png           # Edited by Kevin
    /defaultPic.png          # from https://en.wikipedia.org/wiki/File:Default_pfp.svg
    /evergreen-tree.png      # from https://oldschool.runescape.wiki/
    /gold-tree.png           # created by Kevin
    /maple-tree.png          # from https://oldschool.runescape.wiki/
    /mhrxXPKq6Xfwy6jHIH9hBwSPP0k2.jpg
    /oak-tree.png            # from https://oldschool.runescape.wiki/
    /silver-tree.png         # created by Kevin
    /treelogo.png            # created by Sunwoo
    /TreePlant.png           # created by Sunwoo
├── scripts                  # Folder for scripts
    /authentication.js       # 
    /authLogin.js            # 
    /authSignUp.js           # 
    /leaderboard.js          # script for leaderboard.html
    /main.js                 # script for main.html, fetches location from translink API and converts distance to points, rewarded points are written to firebase
    /profile.js              # script for profile.html
    /script.js               # logout script
    /skeleton.js             # script for insterting navbar and footer to each page
    /team.js                 # script for team.html, user selects a team from 3 choices
├── styles                   # Folder for styles
    /aboutus.css             # css for aboutus.html
    /bigContent.css          # snaps footer to bottom of the page
    /index.css               # css for landing page index.html
    /leaderboard.css         # css for leaderboard.html
    /main.css                # css for main.html
    /nav.css                 # css for navbars
    /profile.css             # css for profile.html
    /style.css               # general css for every page
    /team.css                # css for team.html
├── text                     # Folder for skeleton HTML files
    /footer.html             # skeleton html for footerbar
    /nav_after_login.html    # skeleton html for navbar when user is logged in
    /nav_before_login.html   # skeleton html for navbar when user is not logged in
├── archive                  # Archived files from old project idea.




```


