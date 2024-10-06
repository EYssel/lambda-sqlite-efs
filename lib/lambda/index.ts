import bootstrap from "./bootstrap";
import { ApiContext, ApiEvent, Route } from "./common/types";
import { userRoute } from "./user";
import { usersRoute } from "./users";

const { db } = bootstrap();

export const handler = async (event: ApiEvent) => {
    try {
        const ctx: ApiContext = {
            db,
        };

        const routeHandler = routeHandlers[event.route];

        const res = routeHandler(event, ctx);

        console.log(res);

        return true;
    } catch (e) {
        return JSON.stringify(e);
    }
};

const routeHandlers: Record<Route, RouteFunction> = {
    "/user": userRoute,
    "/users": usersRoute,
};

type RouteFunction = (event: ApiEvent, ctx: ApiContext) => unknown;
