## Getting Started

#### You can run the application in two ways.
1) Run with locally installed json-server and use the db.json file for api queries.
2) Use in env variable the url of the database moc deploy url

### First Variant

If you use the first option, you need to install json-server on your device, if you don't have it installed already. To do this, use the command:

```bash
npm i -g json-server
# or
yarn global add json-server
# or
pnpm i -g json-server
```

Next, create an .env file like the .env.example file. in the `NEXT_PUBLIC_SERVER_URL` variable put the local url where your moc server will start (by default it is `http://localhost:3001`).
Also, add `http://localhost:3000/api` to the `NEXT_PUBLIC_API_URL` variable.
And after that, start the local server using the command:

```bash
npm run mock
# or
yarn mock
# or
pnpm mock
```
##### This will start you local server.

Next, run the application with the command and test:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Second Variant

If you are using the second option, then all you need to do is add the database deploy address that you will be provided with to the `NEXT_PUBLIC_SERVER_URL` env variable and start the Next.js dev server of the application with the command above.
