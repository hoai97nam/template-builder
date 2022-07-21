# Template builder

This prototype depicts a template builder application with 2 elements: Text field and button.

## Getting Started

### Pre-install:

- Git
- node

Open terminal or powershell, run command:

```bash
git clone https://github.com/hoai97nam/template-builder.git
```
to clone whole repo to local

run 
```bash
npm intall
```
to install libraries used in application 

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### Description:

- There are two pages: admin to design template and consumer to show template after designed

#### Admin
 
- ✔ Use drag and drop element from sidebar to content field. Currenly, there are paragraph and button.
- ✔ Admin can change text inside paragraph, `click` on this element to active edit
- ✔ Can change button name and set alert message, `click` on this element to active edit
- ✔ `Save` button to save template to localstorage
- ✔ `View` navigate to consumer page
- ✔ `Export` to download template as html file
- 🔺 `Undo` and `Redo` (not optimizing mechanism)
- ❗ `Import` has not implemented


#### Consumer

- ✔ Show designed template
- ✔ Back to admin page button

#### Screenshoots

![index/home page](https://github.com/hoai97nam/template-builder/blob/main/images/index.png)
UI from home page, click on admin to navigate to admin page
![admin page](https://github.com/hoai97nam/template-builder/blob/main/images/admin.png)
- UI from `admin` page, most main feature from this page. 
- Admin can drag and drop to design template
- Use buttons from header to interact to template

![admin text](https://github.com/hoai97nam/template-builder/blob/main/images/admin-text.png)
- Edit text by click on component
- Text will show instantly admin type in input field
![amdin button](https://github.com/hoai97nam/template-builder/blob/main/images/admin-button.png)
- Change button text 
- Change alert message
- Delete current component
![consumer page](https://github.com/hoai97nam/template-builder/blob/main/images/consumer.png)
- Show full template that designed before
- Back to admin page to continue or interact to template with header button

## What I used

### Libraries or 3rd party
- Ant design library for element like Button, Input, Tooltips, ...
- Use styled-component library for css admin page
- Use Drag and Drop library for drag and drop feature
- Use hmtl js download to export template
- Use uuid for generating uuid code

### Implementations
- Use context to manage state. In case of being scalable, consider Redux in state managament
- For Undo and Redo feature, use the array to save every change of component. Control index of history array to reflect undo and redo.
- Manage component by id with format: <First letter of element name>-<uuid>, for instances:
    - T-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX id of Paragraph component
    - B-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX id of Button component
- 2 different edit components for 2 elements
- Add delete button

## Ideas not include prototype:

- Import template from outside the application using library convert html to React Component
- Feature change order of elements directly by drag and drop
- Use redux for state management in case of more than 2 elements (layout, align, radio button)
- More attributes in every element (margin, padding, color, align, ...)
- Recommend for text by providing key words. Scale to create create Resume application, email template builder application, ...  
- Account management (sign in/sign up) to save individual template. Use backend or Cloud service to store (like firebase, Azure, AWS, ...)  


