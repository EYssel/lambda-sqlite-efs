import { ENDPOINT_NOT_SUPPORTED, INVALID_INPUT } from "../common/constants";
import { ApiContext, ApiEvent } from "../common/types";

export const userRoute = (event: ApiEvent, ctx: ApiContext) => {
    if (event.method === "POST") {
        if (
            event.data &&
            event.data.name &&
            typeof event.data.name === "string" &&
            event.data.age &&
            typeof event.data.age === "number"
        ) {
            return createUser(ctx, event.data.name, event.data.age);
        } else {
            return INVALID_INPUT;
        }
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
