import { ENDPOINT_NOT_SUPPORTED } from "../common/constants";
import { ApiContext, ApiEvent } from "../common/types";

export const usersRoute = (event: ApiEvent, ctx: ApiContext) => {
    if (event.method === "GET") {
        return getUsers(ctx);
    }

    return ENDPOINT_NOT_SUPPORTED;
};

function getUsers(ctx: ApiContext) {
    return ctx.db.prepare("SELECT * FROM users").all();
}
