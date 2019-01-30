# apptrack-universityPage
a page for adding universities for college application process

### Architecture:
Frontend: React, Apollo Server
<br>
Backend: NodeJS, GraphQL
<br>
Database: MongoDB

### Pre-requisite:
Please have docker installed in your computer.
<br>
https://www.docker.com/get-started

### Instructions:
Download the file onto your computer.
<br>
Duplicate __config_sample.json__ file and name it
__config.json__. Change the empty string to the value of 
corresponding fields wrapped by "".
<br>
For this config, you should put (just for demo use)
<br>
__"dbName": "test"__ and __"dbPassword": "test123"__
<br>
Open terminal and change to the current directory
<br>
Type the following command to open the React App
__(Note: This may take you a while)__
<br>
`cd local`
<br>
`sh deploy.sh`

### To-Do:
- [ ] Authentication with JWT
- [ ] Add more fields to university
- [ ] Collapse/ Expand view

### Completed:
- [x] Display universities
- [x] Add new university
- [x] Update exisitng universities