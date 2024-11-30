## Component Paths

### DropdownMenu.vue
- import MenuData from "../assets/menu_items/MenuItems.json"; ✅

### Footer.vue
- None 

### Header.vue
- import WordPressCircle from "../assets/WordPressCircle.png"; ✅

### HomeMenuItem.vue
- URL(`../assets/example_pics/menu/${props.item.Picture}` ✅

### ItemCard.vue
- URL(`../assets/example_pics/menu/${props.item.Image}` ✅

### MenuCard.vue
- URL(`../assets/example_pics/menu/${props.item.Image}` ✅

### MobileNavBar.vue
- import logoTwo from "../assets/crumbs-logo.png"; ✅
- import MenuData from "../assets/menu_items/MenuItems.json"; ✅

### NavBar.vue
- import logo from "../assets/purple-logo.png"; ✅


### ResultCard.vue
- URL(`../assets/example_pics/menu/${props.item.Image}` ✅


### SideItemView.vue
- import MenuItems from "../assets/menu_items/MenuItems.json"; ✅
- URL(`../assets/example_pics/menu/${menuItem.value.Image}` ✅


# Views paths 

### About.vue
- import Carly1 from "../assets/real_menu_pics/CarlyPics/Carly1.jpg"; ✅
- import Carly2 from "../assets/real_menu_pics/CarlyPics/Carly2.jpg"; ✅
- import Carly3 from "../assets/real_menu_pics/CarlyPics/Carly3.jpg"; ✅

### Cart.vue
- import logoTwo from "../assets/crumbs-logo.png"; ✅

### Checkout.vue
- import VenmoLogo from "../assets/Venmo.png"; ✅
- import GrayVenmoLogo from "../assets/real_menu_pics/logos/GrayVenmo.png"; ✅

### Contact.vue
- None

### Home.vue
- import HomeCookies from "../assets/HomeCookies.png"; ✅
- import MenuData from "../assets/menu_items/HomePage.json"; ✅

### ImageView.vue
- None

### Item.vue
- import MenuItems from "../assets/menu_items/MenuItems.json"; ✅
- ../assets/example_pics/menu/${menuItem.value.Image} ✅

### Order.vue
- import AllData from "../assets/menu_items/MenuItems.json"; ✅
- import TagData from "../assets/test_menu/Tags.json"; ✅

### SearchResults.vue
- import ShrugGuy from "../assets/Shrug.png"; ✅
- import MenuItems from "../assets/menu_items/MenuItems.json"; ✅

# All Paths 

### These are all common paths 
- "../assets/menu_items/MenuItems.json";
- ../assets/WordPressCircle.png"
- ../assets/example_pics/menu/ THEN URL
- ../assets/crumbs-logo.png"
- ../assets/real_menu_pics/CarlyPics/Carly (1,2,3)
- import ShrugGuy from "../assets/Shrug.png";
- "../assets/menu_items/HomePage.json";
- "../assets/HomeCookies.png";
- "../assets/Venmo.png";
- "../assets/real_menu_pics/logos/GrayVenmo.png"
- "../assets/purple-logo.png"

### Sorted Paths
- "../assets/Venmo.png";
- "../assets/HomeCookies.png";
- "../assets/purple-logo.png"
- ../assets/crumbs-logo.png"
- ../assets/WordPressCircle.png"
- import ShrugGuy from "../assets/Shrug.png";

- "../assets/menu_items/HomePage.json";
- "../assets/menu_items/MenuItems.json";

- ../assets/example_pics/menu/ THEN URL

- ../assets/real_menu_pics/CarlyPics/Carly (1,2,3)
- "../assets/real_menu_pics/logos/GrayVenmo.png"


# Sort the files like this 

- assets/
    - Other/
        - WordPressCircle.png
        - Shrug.png
        - CarlyPics/
            - Carly1.jpg
            - Carly2.jpg
            - Carly3.jpg
    - real_menu/
        - pics/
        - MenuItems.json
        - Tags.json
    - test_menu/
        - pics/
        - MenuItems.json
        - Tags.json
    - unused 
        - circleLogo.png
        - logotwo.png (rename: white-square-logo.png)
    - logos/
        - crumbs-logo.png (rename: yellow-square-logo.png)
        - Venmo.png
        - purple-logo.png
        - crumbs-logo.png
        - GrayVenmo.png
    - Home/ 
        - HomeCookies.png
        - HomePage.json

        




- ../assets/example_pics/menu/ THEN URL


