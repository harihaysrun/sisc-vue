# SI(S)C.sg
![SI(S)C](/src/assets/images/readme.jpg)

For some, skincare is a chore. But for some others, skincare is a hobby… a pretty expensive one. With that, comes the piles of free samples that more often than not, end up unused. What better way is there than to spread the love and pass it on to someone else who wants it?

SI(S)C, an abbreviation of Sharing is (Skin)Caring, aims to be a local skincare community inspired by subreddits like AsianBeauty, SkincareAddiction, SkincareExchange (and more), where users can safely sell, give away unwanted samples, request and even provide reviews.


**You may ask, Why SI(S)C even though platforms like Carousell exists?**

SI(S)C is actually inspired by Carousell’s selling & ‘looking for’ system, minus all the troublesome filtering you'll have to go through to reach a certain section. It's a site purely dedicated to skincare! (Plus it's always nice to know that you're dealing with people who share the same interest as you).


**As the site owner, I want to:**
- build a safe community for local skincare enthusiasts
- allow users to interact, sell, request and provide reviews(which will be especially helpful since we're all living in the same country and experiencing the same weather! Having a similar factor can help people determine whether a product might or might not work for them)


**As the end user, I want to:**
- be a part of a local skincare community
- sell or give away unwanted samples or products
- request for products
- contribute reviews on products I've tried before



Visit SI(S)C [here](https://agitated-visvesvaraya-94d773.netlify.app/)!



## UI/UX
![Flow](/src/assets/images/flow.jpg)
'Recently Added' and 'Recent Requests' are derived from the ProductsList and RequestList components.

Logic-wise, only Reviews is intentionally missing the edit and delete function because it's not a personal listing – everyone shares their opinion on it, so no one has the 'right' to remove it. (Also imagine having hundreds of useful reviews on it only to have someone remove it by accident...!)


### Visual Inspiration
I find myself visiting [Glossier](https://www.glossier.com/) and [Good Molecules](https://www.goodmolecules.com/)’ websites quite often. I do so just out of pure liking for the UI and not to actually browse the actual catalogs. The modern look, simple colour palette and layouts were part of my visual moodboard.


### Wireframes
[Here](https://www.figma.com/file/th9IcPkY20TucZrka24hoT/Skincare-UI?node-id=0%3A1) are the wireframes for the website. Colours used here are not finalised.

### Colours
Looking at the wireframes, pink was my initial choice of accent colour, but I decided to change it up because it added a touch of femininity to the branding, which is not what I'm going for.

**SI(S)C uses:**
- Neutral colours (black, white, and mediumslateblue as the accent colour) because skincare is for everyone, regardless of genders!
- The black line design to give it an element of fun

### Font
[Manrope](https://fonts.google.com/specimen/Manrope?preview.text_type=custom&preview.text=A) works great as both headers and body text. Also very modern-looking.


## Features

### Major Features & Algorithms Used
1. Post/edit/delete listings & comments (CRUD), using API connected to a MongoDB database (view the API for this project [here](https://github.com/harihaysrun/skincare-api))
2. Server-side search for products page (MongoDB)
3. Client-side search on request & reviews page (using filter function)

### Limitations & Bugs
1. I tried to make the individual products accessible from the home page (using props) but so far I've only managed to make it switch to the Products page

### Features pending implementing
1. Use ‘chat’ instead of comment to make interactions more personal
2. Implement a more interactive star rating system as shown in this [codepen](https://codepen.io/Kradek/pen/VpezNR)


## Technologies Used
1. Figma – used to create wireframes 
2. Photoshop & Illustrator to create some of the icons
3. Express – set up the API connected to the Mongo database
4. VueJS – front end framework used to make the single page web app
5. Axios – used to call the API endpoint
6. Heroku – used to host the API
7. Netlify – host the Vue application to generate a live link for people to visit


## Use & Test cases:
1. Add new product
2. Update and Delete listings and comments
3. Add comment or review
4. Search products

### Adding A New Product (to sell or give away) or Request
| Description | Expected Result |
| ----------- | --------------- |
| Click on "Add New" button | Page changes to show a form |
| Select what you want to do <br> - sell/give product away <br> - request product| The appropriate input boxes will show or hide depending on user's choice  |
| Click on "Add Product" or "Add Request" | If user did not fill in all the boxes, an alert will pop up to warn them to do so |
| After filling everything up, click on "Add Product" or "Add Request" | When they’ve successfully submitted the form, a green message will appear at the top so they'll know that the product has been added  |

### Adding a new product to the reviews board
| Description | Expected Result |
| ----------- | --------------- |
| Click on "Add New" button | Page changes to show a form |
| Select 'add product to reviews board' | The appropriate input boxes will show or hide depending on user's choice  |
| Check if product already exists by clicking the "Check if product exists" button | If product exists in the mongo collection, the appropriate message will appear accordingly(If products exists, it will say it already exists, etc. to avoid overlap of products) |
| Click on "Add New Product" | If user did not fill in all the boxes, an alert will pop up to warn them to do so |
| After filling everything up, click on "Add New Product" | When they’ve successfully submitted the form, a green message will appear at the top so they'll know that the product has been added  |

### Edit or delete product
| Description | Expected Result |
| ----------- | --------------- |
| Click on product to be edited | See product information & comments section |
| Click on "Edit Product" | Page changes to show a form where user can update the fields |
| Once done editing, click on "Done" | A green message will appear at the top so they'll know that the product info has been edited |
| If user wants to delete product (e.g product has been sold or found), click on 'Delete product' | Upon deleting, they will be redirected to the respective general listings tab |

### Leave a comment or review
| Description | Expected Result |
| ----------- | --------------- |
| In the comments section, fill in the appropriate fields | If the required fields are empty, an alert will prompt them to fill them up. Otherwise the comments section will update immediately upon posting.  |
| To leave a reply, click on 'reply' | The name of the person the user is replying to will appear in the comments input box with an '@' |
| Click on 'post comment' | If the name of the person who's commenting/replying matches the name of the poster, an [OP] tag will appear in front of their names |
| To remove a comment, click 'delete' | Comments section will update immediately upon deleting  |

### Search for products
| Description | Expected Result |
| ----------- | --------------- |
| **Products page:** <br> For products page, select the filters. User doesn't have to use all filters | User has to click on search to see the results |
| Click on search | Related products will appear |
| Click on 'Reset Search Filters' to reset | Previously selected fields will be removed and all products will be shown again |
| **Request & Review pages:** <br> Type in the brand or product name | Results will automatically be filtered and shown |
| Delete everything in the search field to "reset" results | All products will be shown again |



## Test products
Here are some products you can use to add to the site!

| Brand | Product Name | Image Link | Category |
| ----- | ------------ | ---------- | -------- |
| Aestura | Atobarrier 365 Cream | [Link](https://cf.shopee.sg/file/0ec2bba0a81c5bab64b93d7703b5d634) | Moisturiser |
| Aestura | Atobarrier 365 Hydro Essence | [Link](https://image.globaloliveyoungshop.com/mig/prdtImg/c2aebbc46c205de05b24236fb3317b6a.jpg?RS=500x500&AR=0) | Essence |
| Kiehl's | Ultra Facial Cream | [Link](https://www.sephora.com/productimages/product/p421996-av-06-zoom.jpg?imwidth=315) | Moisturiser |
| Kiehl's | Ultra Facial Cleanser | [Link](https://static3.sabinacdn.com/11613-thickbox_default/ultra-facial-cleanser.jpg) | Second Cleanser |
| Innisfree | Green Tea Seed Serum | [Link](https://www.sephora.com/productimages/sku/s2500122-main-zoom.jpg?imwidth=315) | Serum |
| Innisfree | Jeju Orchid Enriched Cream | [Link](https://s3.images-iherb.com/inf/inf86154/l/8.jpg) | Moisturiser |
| B.LAB | Matcha Hydrating Cleanser | [Link](https://d1flfk77wl2xk4.cloudfront.net/Assets/12/565/XXL_p0142756512.jpg) | Second Cleanser |
| Purito | Foam Green Cleansing Oil | [Link](https://m.puritoen.com/web/product/big/202109/021441d385a43153093f00a96a400d66.jpg) | First Cleanser |
| Dr.Jart+ | Cicapair Cream | [Link](https://www.watsons.com.sg/medias/Cicapair-Cream-50ml-70674.jpg?context=bWFzdGVyfGZyb250L3pvb218NDM2OTR8aW1hZ2UvanBlZ3xmcm9udC96b29tL2g5Yi9oZjMvODg1ODQxOTU2MDQ3OC5qcGd8NWRiYWM4NzBkOGE2MmY4MjZmYWFmY2FkODM2OGNjZGM3MDkxY2E3M2QwYzM0Y2FjMTZjNmQ1MGJmZTIxYzg3NA) | Moisturiser |
| Paula's Choice | Skin Perfecting 2% BHA | [Link](https://static.thcdn.com/images/large/original//productimg/1600/1600/11174178-1044909106371632.jpg) | Chemical Exfoliant |



## This project has been tested on:
| MacOS | Windows 10 | Other devices |
| ----- | ---------- | ------------- |
| Google Chrome | Google Chrome | iPhone 12 Mini (iOS 15) |
| Safari | | Samsung Galaxy A22 ||
| Microsoft Edge | | 11" iPad Pro 2018 |
| Mozilla Firefox | | |


## Credits
1. [Flaticon](https://www.flaticon.com/)
2. [Pexels](https://www.pexels.com/) and [Unsplash](https://unsplash.com/) for the photos
3. [Vue documentation](https://v2.vuejs.org/v2/guide/)
4. [MongoDB documentation](https://docs.mongodb.com/)
5. [Stack Overflow](https://stackoverflow.com/)