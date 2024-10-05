import { ENDPOINT_NOT_SUPPORTED } from "../common/constants";
import { ApiContext, ApiEvent } from "../common/types";

export const userRoute = (event: ApiEvent, ctx: ApiContext) => {
    if (event.method === "POST") {
        return createUser(ctx, event.data.name, event.data.age);
    }

    return ENDPOINT_NOT_SUPPORTED;
};

function createUser(ctx: ApiContext, name: string, age: number) {
    const res = ctx.db
        .prepare(`INSERT into users (name, age) VALUES ('${name}', ${age})`)
        .run();

    if (res) {
        return true;
    } else {
        return false;
    }
}
