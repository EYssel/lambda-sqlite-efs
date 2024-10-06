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

        const res = routeHandlers[event.route](event.data, ctx);

        console.log(res);

        return true;
    } catch (e) {
        return JSON.stringify(e);
    }
};

const routeHandlers: Record<
    Route,
    (event: ApiEvent, ctx: ApiContext) => unknown
> = {
    "/user": () => userRoute,
    "/users": () => usersRoute,
};
