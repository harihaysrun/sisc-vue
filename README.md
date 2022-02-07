# SI(S)C.sg
![SI(S)C](/src/assets/images/readme2.jpg)

For some, skincare is a chore. But for some others, skincare is a hobby… a pretty expensive one. With that, comes the piles of free samples that more often than not, end up unused. This results in a huge collection of (unused) products at the back of our cabinets, and what better way is there than to spread the love and pass it on to someone else who wants it?

SI(S)C, an abbreviation of Sharing is (Skin)Caring, aims to be a local skincare community inspired by subreddits like AsianBeauty, SkincareAddiction, SkincareExchange (and more), where users can safely sell, give away unwanted samples, request and even provide reviews.

Visit SI(S)C [here](https://agitated-visvesvaraya-94d773.netlify.app/)!


**You may ask, Why SI(S)C even though platforms like Carousell exists?**

SI(S)C is actually inspired by Carousell’s selling & ‘looking for’ system, minus all the troublesome filtering you'll have to go through to reach a certain section. It's a site dedicated to purely skincare! (Plus it's always nice to know that you're dealing with people who share the same interest as you).


**As the site owner, I want to:**
- build a safe community for local skincare enthusiasts
- allow users to interact, sell, request and provide reviews(which will be especially helpful since we're all living in the same country and experiencing the same weather! Having a same factor helps people to determine whether a product might or might work for them)


**As the end user, I want to:**
- be a part of a local skincare community
- sell or give away unwanted samples or products
- request for products
- contribute reviews on products I've tried before


## UI/UX
![Flow](/src/assets/images/flow.jpg)
As shown in this flow, 'Recently Added' and 'Recent Requests' are the ProductInfo and RequestInfo components.

Logic-wise, only Reviews is intentionally missing the edit and delete function because it's not a personal listing – everyone shares their opinion on it, so no one has the 'right' to remove it. (Also imagine having hundreds of useful reviews on it only to have someone remove it by accident...!)


### Visual Inspiration
I find myself visiting [Glossier](https://www.glossier.com/) and [Good Molecules](https://www.goodmolecules.com/)’ websites quite often. I do so just out of pure liking for the UI and not to actually browse the actual catalogs. The modern look, simple colour palette and layouts were part of my visual moodboard.


### Wireframes
[Here](https://www.figma.com/file/th9IcPkY20TucZrka24hoT/Skincare-UI?node-id=0%3A1) are the wireframes for the website. Colours used here are not finalised.

### Colours
Looking at the wireframes, pink was my initial choice of accent colour, but I decided to change it up because it adds a touch of femininity to the branding, which is not what I'm going for.

**SI(S)C uses:**
- Neutral colours (black, white, and mediumslateblue as the accent colour) because skincare is for everyone, regardless of genders!
- The retro line design to give it an element of fun

### Font
[Manrope](https://fonts.google.com/specimen/Manrope?preview.text_type=custom&preview.text=A) works great as both headers and body text. Also very modern-looking.


## Features

### Major Features & Algorithms Used
1. Post/edit/delete listings & comments (CRUD), using Express API connected to MongoDB
2. Use server-side search for products page (MongoDB)
3. Use client-side search on request & reviews page (using filter function)

### Limitations, Bugs, Features pending implementing
1. Tried to make the individual products accesible from the home page (using props) but so far I only managed to make it switch to the Products page
2. Other features I have in mind:
    - Use ‘chat’ instead of comment to make interactions more personal
    - Use a more intuitive star rating system as shown in this [codepen](https://codepen.io/Kradek/pen/VpezNR)


## Use & Test Cases

### Use cases:
1. Add new product
2. Search products
3. Add comment or review
4. Update and Delete listings and comments

### Test Cases

#### Adding A New Product (to sell or give away)
| Description | Expected Result |
| ----------- | --------------- |
| Click on "Add New" button | Page changes to show a form |
| Select what you want to do <br> - sell/give product away <br> - request product <br> - add product to reviews board | The appropriate input boxes will show or hide depending on user's choice  |
| Once done, click on "Add Product" | If user didn't fill in all the boxes, an alert will pop up to warn them to do so |
| After filling everything up, click on "Add Product" | When they’ve successfully submitted the form, a green message will appear at the top so they'll know that the product has been added  |

#### Adding a new product to the reviews board
| Description | Expected Result |
| ----------- | --------------- |
| Click on "Add New" button | Page changes to show a form |
| Select 'add product to reviews board' | The appropriate input boxes will show or hide depending on user's choice  |
| Check if product already exists by clicking the button | If product exists in the mongo collection, the appropriate message will appear accordingly(If products exists, it will say it already exists, etc. to avoid overlap of products) |
| Once done, click on "Add Product" | If user didn't fill in all the boxes, an alert will pop up to warn them to do so |
| After filling everything up, click on "Add Product" | When they’ve successfully submitted the form, a green message will appear at the top so they'll know that the product has been added  |

#### Edit or delete product
| Description | Expected Result |
| ----------- | --------------- |
| Click on product to be edited | See product information & comments section |
| Click on "Edit Product" | Page changes to show a form where user can update the fields |
| Once done editing, click on "Done" | A green message will appear at the top so they'll know that the product info has been edited |
| If user wants to delete product (e.g product has been sold or found), click on 'Delete product' | Upon deleting, they will be redirected to the respective general listings tab |

#### Leave a comment or review
| Description | Expected Result |
| ----------- | --------------- |
| In the comments section, fill in the appropriate fields | Comments section will update immediately upon posting |
| To leave a reply, click on 'reply' | Name of person user is replying to will appear in the comments input box |
| Click on 'post comment' | If the name of the person commenting/replying matches the name of the poster, an [OP] tag will appear in front of their names |
| To remove a comment, click 'delete' | Comments section will update immediately upon deleting  |



## Technologies Used
1. Figma – used to create wireframes 
3. Express – set up the API connected to the Mongo database
2. VueJS – front end framewwork used to make the single page web app
4. Axios – used to call the API endpoint
5. Heroku – used to host the Express API
6. Netlify – host the Vue application so that there's a live link for people to visit
7. Photoshop/Illustrator to create some of the icons



## This project has been tested on:



## Credits
1. [Flaticon](https://www.flaticon.com/)
2. [Pexels](https://www.pexels.com/) and [Unsplash](https://unsplash.com/) for the photos