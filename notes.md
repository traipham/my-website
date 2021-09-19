*8/5/2021*
- Use React reference: React.createRef() in constructor to create a reference attribute value for the attribute 'ref' for an html element. Access it by creating a variable and calling the 'current' property: 'const node = some_component.ref_name.current

*8/25/2021*
- Fix Date schema in order to save previous dates 
  - Pass in current date for routes and frontend calls
- Remove route is slow, requires 2 reload NEED FIX ASAP
- Loading posts is slow, takes 3 seconds for 5 imgs 
- ADDITIONAL FEATURE: 
  - Add notes on blog post:
    1. Click on single post 
    2. Zooms in on specific note
    3. Specific notes appears on left side (at most half of page)
    4. 
    5. Have comment/note section on right side appear
    6. Type notes on bottom right, and pin on top right

*8/31/2021*
- Exit out of interest interface when user don't want to input
- Exit out of goal interface
- Exit out of blog interface
- Remove upload and download button for resume
- Loading screen
- Click me welcome message on home

*9/19/2021*
- Fix Database structure
  - Right now it's a singlue document for each collection: blogs, goals, interests, and wishlists
  - If document reaches a certain number, create a new document
  - document _id will increase by 1