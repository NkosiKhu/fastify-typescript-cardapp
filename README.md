Simple card app created with Typescript Stack
[Context](https://github.com/TimMurnaghan/card-app-typescript-test/tree/master)

### Development set-up

Open in VSCode and follow the prompts to open in a devcontainer

# Features

- Mutiple Routes for each action.
- Local Backend Database
- You can View, Create, Update, Delete simple cards.

# Stack

## Front End

- React ⚛
- React Router DOM 🔀
- Tailwind CSS 🐦

## Back End

- Fastify 🚀
- Prisma ORM 🅿
- SQLite ▪

# Deploy

Git hooks are used to automatically format committed files. To setup the hooks run:

```bash
npm i
```

The front end works in port 3000 and the backend works in the port 3001.

## Back End

```bash
npm install

npm run prisma-setup

npm start
```

To have the backend restart when changes have been made to `.ts`, `.prisma` and `.sql` files:

Replace `npm start` with `npm run dev`

To run the tests:

```bash
npm run test
```

## Front End

```bash
npm install

npm start
```

To deploy a final build with static files:

```bash
npm run build

cd ./dist

npx serve -p 3000 -s
```


## Summary of Changes

#### 1. Dark Mode Implementation
I utilised React's Context API to manage and distribute the theme setting across components. This approach ensures that the current mode (light or dark) can be easily accessed and modified. The preference is saved in local storage, so users' chosen theme persists between sessions.  I used CSS variables, allowing theme switching without the need to restructure component-level styles. I used the ShadCN Dropdown component for the theme selector

#### 2. Scheduled Date Feature
I extended the cards to include an optional "Scheduled For" date. This required a database migration to add a `scheduled_for` column, and I updated both the backend and frontend to support this new field. On the UI side, I introduced a checkbox  that allows users to optionally set a scheduled_for date for a task. The card display was also updated to show this information when present. I removed the created_at date picker as I thought it was confusing for the user

#### 3. Backend Testing
For backend testing, I implemented a dedicated testing database to enable integration testing instead of relying on mocking. This allows us to validate real database interactions, potentially catching issues related to data integrity or schema changes. Such testing helps uncover subtle bugs that might be missed if the focus were only on unit tests with mocked data.

#### 4. Deployment and Dockerization
I deployed the application using Ngrok for public access and Caddy for routing requests. The backend routes were handled based on URL path patterns, routing `/api` requests to the backend. This setup allowed the use of only one Ngrok instance.

I also included a basic deployment script to run the backend tests; build the frontend and backend containers; and push the images to DockerHub. This process could be further improved by using tools like Traefik to automatically pull the new images and restart the containers on the server.

#### 5. Environment Variables and Devcontainer
I made use of environment variables to handle settings such as ports and the choice of which database to use. I also set up a devcontainer configuration, which ensures consistency across different environments, making it easier for team members or future developers to set up and run the application without issues.

#### Future Extensions
If given more time, I would extend the application by adding user authentication, allowing tasks and settings to be personalised for individual users;  include a more comprehensive test suite, including model tests such as to ensure todos cannot be scheduled in the past and end-to-end tests to ensure the functionality of user interactions; and finally I would improve the deployment scheme to use a proper CI/CD pipeline
