# Playwright Automation Assessment

This project is set up for end-to-end testing using [Playwright](https://playwright.dev/) with TypeScript.

## Getting Started

1. **Install dependencies and Playwright:**
   ```sh
   npm run setup
   ```

2. **Run tests:**
   ```sh
   npx playwright test
   ```

## Project Structure
- ` documentation` - Test plan
- `pages/` -  Page Object Model classes
- `tests/` - Test specifications - broken down by type
- - `accessibility` 
- - `admin` 
- - `customer` 
- - `performance` 
- - `utilities`  
- `playwright.config.ts` - Playwright configuration

## Technologies

- Playwright – Browser automation framework
- TypeScript – Static typing for JavaScript
- Page Object Model – Design pattern for test maintainability


## Troubleshooting
- Ensure you are using Node.js v18 or higher for Playwright compatibility.
- If you encounter errors during setup, upgrade your Node.js version.

- The site is public accessible and used as testing ground - it resets to a default state every 10 minutes which may happen during a test execution. - Additionally others may add / delete / amend data causing errors when tests are executing. 

## Resources
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Faker Documentation](https://fakerjs.dev/)

## Setup script mentioned above will install specific versions of the following
- npm install --save-dev @faker-js/faker
- npm install @axe-core/playwright
- npm install dotenv
- npm install --save-dev @types/node
