import { SideBarItem } from "@/app/_models/side-bar-item";
import { GYM_ADMIN, GYM_OWNER } from "../_constants/role";

const allSideBarItem: SideBarItem[] = [
    {
        label: "Dashboard",
        icon: "",
        forRole: [GYM_ADMIN, GYM_OWNER], // Adjust roles as needed
        link: "/daskboard"
    },
    {
        label: "Profile",
        icon: "<MockIconComponent2 />, // Replace with your icon component",
        forRole: [GYM_ADMIN, GYM_OWNER], // Adjust roles as needed
        link: "/profile"
    },
    {
        label: "Registration",
        icon: "",
        forRole: [GYM_OWNER], // Adjust roles as needed
        link: "/registe-member"
    },
    {
        label: "Plan",
        icon: "",
        forRole: [GYM_ADMIN, GYM_OWNER], // Adjust roles as needed
        link: "/plan"
    },
    {
        label: "Payment",
        icon: "<MockIconComponent2 />, // Replace with your icon component",
        forRole: [GYM_OWNER], // Adjust roles as needed
        link: "/payment"
    },
    {
        label: "Inventory",
        icon: "",
        forRole: [GYM_OWNER], // Adjust roles as needed
        link: "/inventory"
    },
    {
        label: "Member",
        icon: "",
        forRole: [GYM_OWNER], // Adjust roles as needed
        link: "/member"
    },
    {
        label: "Report",
        icon: "",
        forRole: [GYM_OWNER], // Adjust roles as needed
        link: "/report"
    }
]


// [
//     "Dashboard",
//     "Profile",
//     "Registration",
//     "Plan",
//     "Payment",
//     "Inventory",
//     "Member",
//     "Report",
// ]