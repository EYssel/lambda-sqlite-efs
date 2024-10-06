import SQLLite = require("better-sqlite3");
import { ApiContext } from "./common/types";

const EFS_PATH = process.env.EFS_PATH;

export default function bootstrap(): ApiContext {
    const db = new SQLLite(EFS_PATH + "/lambda-efs.db", {});
    setupDB(db);

    return { db };
}

function setupDB(db: SQLLite.Database) {
    db.prepare(
        "create table if not exists users (name TEXT, age INTEGER)"
    ).run();
}
