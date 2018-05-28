# Change Log

## 0.35.0 (May 28, 2018)
- Add Inventory Devices: create / edit / delete ([@pumano](https://github.com/pumano) in [#84](https://github.com/test-storage/test-storage/pull/84))
- Add Basic Test Runs CRUD
- Refactoring
- Attachments API for upload
- Add tests for some backend and for front end directives
- Multiple bug fixes and enhancements

## 0.34.0 (May 16, 2018)
- Update backend to Nest 5 ([@pumano](https://github.com/pumano) in [#83](https://github.com/test-storage/test-storage/pull/83))
- Add better UI for test case steps
- Add priority for test cases
- Add test case type (positive / negative)
- Multiple UI improvements
- Multiple bug fixes

## 0.33.0 (May 09, 2018)
- Update to Angular 6 ([@pumano](https://github.com/pumano) in [#82](https://github.com/test-storage/test-storage/pull/82))
- Add sign up page
- Add modal autofocus
- Add user auto generated photo placeholders
- Multiple UI improvements
- Multiple bug fixes

## 0.32.0 (May 03, 2018)
- Add create / edit / delete devices inventory ([@pumano](https://github.com/pumano) in [#81](https://github.com/test-storage/test-storage/pull/81))
- Add test cases management
- Add test suites management
- Add Empty state screens
- Add create / edit / delete Users management
- Add create / edit / delete Roles management
- Add Language switch with saving settings to local storage
- Multiple changes for proper Continuous Delivery to Heroku
- Multiple UI improvements
- Multiple bug fixes

## 0.31.0 (April 23, 2018)
- Add devices inventory ([@pumano](https://github.com/pumano) in [#80](https://github.com/test-storage/test-storage/pull/80))
- Add Projects
- Add Test executions
- Add Users management
- Add Roles management
- Add User Profile
- Add animations
- Add i18n
- Multiple UI improvements
- Multiple bug fixes

## 0.30.0 (February 26, 2018)
- Refactoring: server ([@pumano](https://github.com/pumano) in [#79](https://github.com/test-storage/test-storage/pull/79))
- Migrate backend from pure express to NestJS
- Add Swagger documentation in dev mode
- Remove refresh tokens
- Migrate tests according to NestJS (WIP)
- UI improvements
- Drop bootstrap and use Clarity UI
- Remove unused dependecies

## 0.28.0 (October 28, 2017)
- Refactoring: server ([@pumano](https://github.com/pumano) in [#76](https://github.com/test-storage/test-storage/pull/76))
- Authentication: add refresh tokens, strong JWT secret, refactoring

## 0.27.1 (September 30, 2017)
- Refactoring: ([@pumano](https://github.com/pumano) in [#75](https://github.com/test-storage/test-storage/pull/75))
- Test Steps

## 0.27.0 (August 28, 2017)
- User list UI: ([@pumano](https://github.com/pumano) in [#74](https://github.com/test-storage/test-storage/pull/74))
- Test Execution cards UI
- Small changes in Project Card list
- Minor UI improvements
- Popups on delete projects and users
- Layout: sticky header
- Scroll to top on navigate fix
- Align to bottom in cards fix

## 0.26.0 (August 16, 2017)
- Project Details UI: ([@pumano](https://github.com/pumano) in [#73](https://github.com/test-storage/test-storage/pull/73))
- Translations for few pages
- Bugfixes
- Minor UI improvements

## 0.25.0 (August 07, 2017)
- Test runs added: ([@pumano](https://github.com/pumano) in [#57](https://github.com/test-storage/test-storage/pull/57))
- Test result added
- Test plans update
- Test suites tree component implemented
- Minor UI improvements

## 0.24.1 (July 31, 2017)
- e2e tests added: ([@pumano](https://github.com/pumano) in [#56](https://github.com/test-storage/test-storage/pull/56))
- Backend integrations tests (small refactoring)
- Mongo model tests rewritten with db helper and moved to ts
- Fresh tslint styles added
- Minor UI improvements

## 0.24.0 (July 19, 2017)
- UI improvements: ([@pumano](https://github.com/pumano) in [#53](https://github.com/test-storage/test-storage/pull/53))
- Testcases: Possibility to create testcases
- Development: Hot Module Replacement added

## 0.23.0 (July 17, 2017)
- Overall UI improvements: ([@pumano](https://github.com/pumano) in [#52](https://github.com/test-storage/test-storage/pull/52))
- Password hashing
- Authentication enhancements and bug fixes
- Users: Possible to add / check details / delete users via UI
- 404 error page UI
- fix routing issues to details pages
- gzip encoding settings via config file (gzip enabled by default)
- Toast Notifications

## 0.22.0 (July 12, 2017)
- Projects UI: ([@pumano](https://github.com/pumano) in [#51](https://github.com/test-storage/test-storage/pull/51))
- Notifications UI
- Profile UI
- i18n support for multiple pages
- Themes (bright / dark)
- /users/me API
- Multiple API changes
- Default routing root changed from / to /dashboard
- bootstrap updated to 4

## 0.21.5 (June 28, 2017)
- Notifications API implemented: ([@pumano](https://github.com/pumano) in [#50](https://github.com/test-storage/test-storage/pull/50))
- Fixes for production deployment
- Better error handling
- UI Layout fixes

## 0.20.3 (June 09, 2017)
- Migration of backend to typescript: ([@pumano](https://github.com/pumano) in [#49](https://github.com/test-storage/test-storage/pull/49))
- Fixes for production deployment

## 0.20.0 (May 30, 2017)
- Migration of backend to typescript: ([@pumano](https://github.com/pumano) in [#48](https://github.com/test-storage/test-storage/pull/48))
- Migration of backend autotests to typescript
- Basic UI for Projects and Testcases
- Fixes for production deployment

## 0.16.52 (May 24, 2017)
- Fixes for fetching data from backend: ([@pumano](https://github.com/pumano) in [#47](https://github.com/test-storage/test-storage/pull/47))
- Unit tests added, small improvements
- Configured for nodejs production installation
- Configured for Heroku Deploy

## 0.15.50 (April 26, 2017)
- Services added (fetching data from backend): ([@pumano](https://github.com/pumano) in [#45](https://github.com/test-storage/test-storage/pull/45))
- Client models added
- Unit tests added, small improvements

## 0.13.46 (April 21, 2017)
- Unit tests execution added: ([@pumano](https://github.com/pumano) in [#43](https://github.com/test-storage/test-storage/pull/43))
- Chrome Headless support added for execution unit and e2e tests, small improvements

## 0.12.43 (April 19, 2017)
- i18n (internationalization added), small improvements: ([@pumano](https://github.com/pumano) in [#40](https://github.com/test-storage/test-storage/pull/40))

## 0.11.42 (April 17, 2017)
- Migrate to modules, 404 error page added, small improvements: ([@pumano](https://github.com/pumano) in [#38](https://github.com/test-storage/test-storage/pull/38))

## 0.9.42 (April 14, 2017)
- Migrate to angular-cli: ([@pumano](https://github.com/pumano) in [1f8a1fc39573b4530e1aa2dc5f74df3f05d854c6](https://github.com/test-storage/test-storage/commit/1f8a1fc39573b4530e1aa2dc5f74df3f05d854c6))

## 0.7.41 (April 10, 2017)
- Migrate to random ID from mongo's ObjectID: ([@pumano](https://github.com/pumano) in [f1a6296329fb4c2f653fdaab8042351dc035110a](https://github.com/test-storage/test-storage/commit/f1a6296329fb4c2f653fdaab8042351dc035110a))
- Testcase status added: ([@pumano](https://github.com/pumano) in [8d5280e1527dfad69fabc228f1b8aaa8435130ca](https://github.com/test-storage/test-storage/commit/8d5280e1527dfad69fabc228f1b8aaa8435130ca))

## 0.5.40 (March 26, 2017)
- Moved to Angular 4.0.0: ([@pumano](https://github.com/pumano) in [1f1e003e36928d3098bcd92b7c5b0229b8f65617](https://github.com/test-storage/test-storage/commit/1f1e003e36928d3098bcd92b7c5b0229b8f65617))
- Testcase tags added: ([@pumano](https://github.com/pumano) in [d67145728c61b115f567a50436b310ff54a6dc1e](https://github.com/test-storage/test-storage/commit/d67145728c61b115f567a50436b310ff54a6dc1e))

## 0.4.40 (March 01, 2017)
- Moved to Angular 4.0.0-rc.1: ([@pumano](https://github.com/pumano) in [ece0ed4276e6939ce1818e30f4f4d5cfad6f2df9](https://github.com/test-storage/test-storage/commit/ece0ed4276e6939ce1818e30f4f4d5cfad6f2df9))
- Test plans added
- Few changes in test-cases and other entities

## 0.3.40 (November 30, 2016)
  - Main sidebar added, header improved, e2e test for login added: ([@pumano](https://github.com/pumano) in [#20](https://github.com/test-storage/test-storage/pull/20))

## 0.2.38 (October 31, 2016)
  - Login Auth + Basic routing and Basic layout: ([@pumano](https://github.com/pumano) in [#13](https://github.com/test-storage/test-storage/pull/13))

## 0.1.34 (October 04, 2016)
  - Patch: minor changes ([@pumano](https://github.com/pumano) in [670f85877800eed06f1b793b10d0d5774891effb](https://github.com/test-storage/test-storage/commit/670f85877800eed06f1b793b10d0d5774891effb))
  - Enhancement: added integration tests. ([@pumano](https://github.com/pumano) in [#10](https://github.com/test-storage/test-storage/pull/10))
