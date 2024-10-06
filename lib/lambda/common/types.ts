import { Database } from "better-sqlite3";

export type Route = "/user" | "/users";

export type ApiEvent = {
    route: Route;
    method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
    data: Record<string, unknown>;
};

export type ApiContext = {
    db: Database;
};
