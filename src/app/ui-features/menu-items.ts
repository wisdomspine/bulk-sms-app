import { NbMenuItem } from "@nebular/theme";
import { APP_PATHS } from '../paths';

export const subMenuItems: NbMenuItem[] = [
    {
        title: "add contact",
        link: APP_PATHS.newContact,
        pathMatch: "full",
        icon: "person-outline"
    },
    {
        title: "add group",
        link: APP_PATHS.newGroup,
        pathMatch: "full",
        icon: "people-outline"
    }, 
    {
        title: "compose message",
        link: APP_PATHS.newMessage,
        pathMatch: "full",
        icon: "message-circle-outline"

    }

]

export const menuItems: NbMenuItem[] = [
    {
        title: "Contacts",
        icon: "person-outline",
        link: APP_PATHS.contacts,
        pathMatch: "full"
    },
    {
        title: "Groups",
        icon: "people-outline",
        pathMatch: "full",
        link: APP_PATHS.groups
    },
    {
        title: "compose message",
        link: APP_PATHS.newMessage,
        pathMatch: "full",
        icon: "message-circle-outline"

    }
]