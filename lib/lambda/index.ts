import bootstrap from "./bootstrap";
import { ApiContext, ApiEvent, Route } from "./common/types";
import { userRoute } from "./user";
import { usersRoute } from "./users";

const { db } = bootstrap();

export const handler = async (event: ApiEvent, ctx: ApiContext) => {
    ctx.db = db;

    return routeHandlers[event.route](event.data, ctx);
};

const routeHandlers: Record<Route, (event: ApiEvent, ctx: ApiContext) => any> = {
    "/user": () => userRoute,
    "/users": () => usersRoute,
};
