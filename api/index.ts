import { Prisma, PrismaClient } from "@prisma/client";
import { Context } from "aws-lambda";

const prisma = new PrismaClient({
    log: ["query", "info", `warn`, `error`],
});

const BAD_EVENT = "Bad Event";

enum Routes {
    CREATE_USER = "createUser",
    GET_USERS = "getUsers",
}

interface CreateUserEvent {
    route: Routes.CREATE_USER;
    data: Omit<Prisma.UserCreateInput, "posts">;
}

const isCreateUserEvent = (event: ApiEvent): event is CreateUserEvent => {
    if (event && event.data) {
        return false;
    }
    return (
        Prisma.validator(prisma, "user", "create")(event.data) &&
        event.route === Routes.CREATE_USER
    );
};

const isGetUsersEvent = (event: ApiEvent): event is GetUsersEvent => {
    return event.route === Routes.GET_USERS && event.data === null;
};

interface GetUsersEvent extends Omit<ApiEvent, "data"> {
    route: Routes.GET_USERS;
    data: null;
}

interface ApiEvent {
    route: Routes;
    data: any;
}

export const handler = async (event: ApiEvent, context: Context) => {
    console.log(event);
    console.log(context);
    const route: Routes = event.route;

    switch (route) {
        case Routes.CREATE_USER:
            if (!isCreateUserEvent(event)) {
                return BAD_EVENT;
            }

            return await prisma.user.create({
                data: {
                    email: event.data.email,
                    name: event.data.name,
                },
            });
        case Routes.GET_USERS:
            if (!isGetUsersEvent(event)) {
                return BAD_EVENT;
            }

            return await prisma.user.findMany();
        default:
            return "Unknown Route";
    }
};
