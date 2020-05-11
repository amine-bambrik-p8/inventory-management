import { JwtAuth } from './app/utils/auth/jwt.auth';
import { environment } from './environments/environment';
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { setup } from "./app/resources";
import { connect } from "./app/utils/db/db";
import { json , urlencoded} from "body-parser"

export const app = express();

app.use(json());
app.use(urlencoded({
  extended:true,
}));

connect(environment.mongoose.uri,environment.mongoose.options);
const auth = new JwtAuth();
app.post("/sign-in",auth.signIn);
app.use(auth.authenticate);
setup(app);
export const start = ()=>{
  const port = process.env.port || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
  });
  server.on('error', console.error);
}
