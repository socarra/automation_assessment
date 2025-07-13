# Test Plan

## System overview

- The site under test is located at https://automationintesting.online/  and there is an admin portal at https://automationintesting.online/admin 
- Additionally there is an API collection at https://www.postman.com/automation-in-testing/restful-booker-collections/collection/55eh7vh/restful-booker


## Functional and Exploratory Testing

Initial exploratory testing was conducted to determine what functionality existed on the site.

### Website
The public facing web site allows users to book or make enquiries for stays at the Shady Meadows B&B. 
Users can 
- Find information about the B&B
- Send an enquiry
- Book a room

### Admin
The admin site allows 
- Creating, editing and deletion of rooms
- Editing or removal of bookings
- View of a booking calendar
- Receipt of emails for bookings and enquiries

### Expectations
As well as the functionality mentioned above, we can reasonably have some expectations as to the site. It should: 
- Perform under load
- Meet accessibility standards
- Be secure (Whilst not asking for payment details - people still need to provide name, email and phone number.) 

Functional tests should be created to cover all of these paths.  We would want cover the "happy day" scenarios and ensure that needed validation is present and provides informative messages so that the user can correct any errors they may have made. Critical paths will be identified and would be the candidates for automation. 



## Bug reporting
For this project, bugs / defects encountered will be logged in the GitHub project - in [Issues](https://github.com/socarra/automation_assessment/issues). Comments will bee added to any issues which will cause an automated test to fail. 

Bugs can be assigned a severity and a priority to help determine which need to be addressed before a product/service can be released, and which may be addressed later. The table below gives an overview of how we can label bugs.

| **Severity**                                            | **Priority**                                  |
|---------------------------------------------------------|-----------------------------------------------|
| Critical: Breaks core functionality or causes data loss | P1: Needs immediate fix before release        |
| High: Blocks a major feature                            | P2: Should be fixed soon, but not blocking    |
| Medium: Affects usability or a key user action          | P3: Can be fixed later or in the next cycle   |
| Low: Minor issue                                        | -                                             |

Additionally, labelling bugs by their type can help in investigating how they've been introduced.  For example, bugs can be a result of integration issues, incorrect requirements as well as code, and being able to determine the root cause can help improve the standard of the product as a whole. 


##  Automation

Automation of this site should concentrate on the main user flows which we can expect to be used on a regular basis and which would impact the user experience if they broke.  For this site I would expect to automate
1. Booking a room
2. Sending a message
3. Verification that validation messages are present at the correct time
4. That the admin room creation is functioning. 

Being able to run these tests across a selection of devices, operating systems and browsers will save time when the site is under development and testing. We would be able to integrate automated tests into a pipeline so that they would run with each new code release - providing a timely regression test to pinpoint issues quickly for resolution. 

Any part of the service that were noted to be temperamental in the exploratory testing are also candidates. 
Automated visual  testing can ensure that we maintain a consistent appearance across browsers and screen sizes. 


## Non-functional Testing 

### Accessibility
Accessibility will be tested with a combination of manual and automated testing. 

Automated testing will enable us to run tests on a pipeline to pick up issues early in development.  There is an `accessibility` folder nested under `tests` which provides some sample automated tests. 

A guided manual accessibility test will be executed - The [Accessibility Insights for Web](https://accessibilityinsights.io/docs/web/overview/) plugin for Chrome provides good coverage and the ability to export a report. The report can be found under `documentation`

#### Manual Tools 
- The axe Dev Tools plug in can be used to run a quick check for accessibility on a page. It has proved to be useful in ensuring that accessibility issues are detected quickly, and provides useful information as to how the errors can be corrected.

#### Additional Check
- Tools and checklists provide us with a firm foundation for accessibility testing, however for some sites I would recommend additional testing by a specialist to uncover other issues.  Specialists will have access and competence in more tools and devices such as screen readers, voice control tools


### Performance
 - Playwright allows us to run some performance tests. A `performance` folder is nested under `tests` which provides a first performance test.  The output of this test is written to the console and also to a file in the current working directory with a filename starting `navigation-timing`. 
 - The Lighthouse tool can be used within the Chrome dev to run an audit for performance and SEO, which would provide useful information 

### Security
Basic security testing will be executed via ZAP.  Reports for the customer and admin sites can be found in the `documentation` folder.
Ahead of a release of a product, I would recommend that a more details scan was executed using a tool such as BurpSuite. 


## API
- Whilst there is an API available for this site, it is out of scope for the moment. 









