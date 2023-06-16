# POMODORO TODO APP

- A web-based to-do list app that implements the Pomodoro Technique, along with an analytics dashboard to track task completion and productivity.
- The Pomodoro Technique is a time management method that uses a timer to break work into intervals, typically 25 minutes of focused work called a "tomato", followed by a 5-minute break.

## Installation Guide

- Clone the repository and open in an editor of choice.
- run the following comand
  - npm install
  - npm run build
  - npm run start

## FOLDER STRUCTURE

- Components - contains all the components

  - Alarm - To play the alarm when timer is up
  - DashboardModal - To show the analytics Modal
  - dropDownMenu - dropdown to delete/mark_as_done a task
  - ModalSetting - settings(in navbar) modal
  - Task - components which contains all the task cards
  - Tasklist - each task components

- Pages
  - API - all the backend services
    - Auth - for Auth0
    - Task - CRUD operations for task data
    - Tasks - GET Route to get all the tasks
    - User - Routes to manipulate data in user table
  - Index - Home Page (which contains all the components)
  - Prisma - contains the db schema
  - Public - contains the assets
  - Styles - contains all global styles
