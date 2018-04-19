const Koa = require("koa");
const logger = require("koa-logger");
const IO = require("koa-socket");
const Router = require("koa-router");
const serve = require("koa-static");
const bodyParser = require("koa-bodyparser");
const send = require("koa-send");
const path = require("path");
const bluebird = require("bluebird");
const mysql = require("mysql");

const db = bluebird.promisifyAll(mysql.createPool({
    host: "localhost",
    user: "catawarning",
    password: "Cata_warning1",
    database: "catawarning"
}));

const app = new Koa();
const io = new IO();
const router = new Router();

app.use(logger());
app.use(bodyParser());

app.use(serve(path.join(__dirname, "public")));

router.get("/", async (ctx, next) => {
    await send(ctx, "public/html/index.html");
});

router.post("/message", async (ctx, next) => {
    const result = await db.queryAsync("SELECT verify(?) AS isApproved;", [ctx.request.body.key]);
    console.log(result[0].isApproved);
});

app.use(router.routes());
app.use(router.allowedMethods());

io.attach(app);

app.listen(3000);
