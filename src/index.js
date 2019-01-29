import path from "path";

import express from "express";
import sassMiddleware from "node-sass-middleware";

import consola from "consola";

const app = express();
const port = process.env.PORT || 3000;

app.use(sassMiddleware({
    src: "scss",
    dest: path.join(__dirname, "public"),
    debug: false,
    response: true,
    outputStyle: "compressed",
    prefix:  "/public"
}));
app.use('/public', express.static("public"));
app.use('/', express.static("public"));

app.listen(port, () => {
    consola.info(`App started on port ${port}!`);
})