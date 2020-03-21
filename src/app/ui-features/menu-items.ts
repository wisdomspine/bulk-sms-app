import { NbMenuItem } from "@nebular/theme";
import { APP_PATHS } from '../paths';

export const subMenuItems: NbMenuItem[] = [
    {
        title: "add contact",
        url: APP_PATHS.newContact,
        pathMatch: "full",
        icon: "person-outline"
    },
    {
        title: "add group",
        url: APP_PATHS.newGroup,
        pathMatch: "full",
        icon: "people-outline"
    }, 

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
    }
]