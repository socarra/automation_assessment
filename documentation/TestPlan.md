# Test Plan
This is where the test plan will be written


## System overview

The site under test is located at https://automationintesting.online/  and there is an admin portal at https://automationintesting.online/admin 
Additionally there is an API collection at https://www.postman.com/automation-in-testing/restful-booker-collections/collection/55eh7vh/restful-booker

### Website
The public facing web site allows users to book or make enquiries for stays at the Shady Meadows B&B. 
Users can 
- Find information about the B&B
- Send an enquiry
- Book a room
- Cancel a booking
- Perform under load
- Meet accessibility standards
- Be secure (Whilst not asking for payment details - people still need to provide name, email and phone number.) 



### Admin
The admin site allows 
- Creating, editing and deletion of rooms
- View of a booking calendar
- Receipt of emails for bookings and enquiries


## Exploratory Testing
Do first to get a handle for the application and what it needs to do - should inform later work 
What have we found that might cause issues for autmation



## Bug reporting

## Functional


##  Automation
- what and why things are automated - main user flows, things that have been shown to be tempremental
- user of the Page Object Model - why this is being used
- playwright visual testing as well 
- cross browser testing - use of BrowerStack for this
- A11y where possible to catch regressions / quickly locate issues when guidelines are updated. 


## Accessibility
Accessibility will be tested with a siombination of manual and automated testing. Automated testing will enable us to run tests on a pipeline to pick up issues early in development. Manual testing will allow us to uncover more issues. 
Manual and automated tools
### Reporting


## Performance
 - tools - probably not being done but what would I do
 Lighthouse some performance savings 


## API

## Security
ZAP for some bacsic testing - exporting the results into the folder here
- insecure username and password being used - can be found online in a web search

### Reporting




