
import { SidebarLink } from "@/types";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    classname:"row-start-1 row-end-2 col-start-1 col-end-3",
    label: "Home",

  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    classname:"row-start-2 row-end-3 col-start-1 col-end-2",
    label: "Community",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/collection",
    classname:"row-start-2 row-end-3 col-start-2 col-end-3",
    label: "Collections",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/profile",
    classname:"row-start-3 row-end-5 col-start-2 col-end-3",
    label: "Profile",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/ask-question",
    classname:"row-start-5 row-end-6 col-start-1 col-end-3",
    label: "Ask a question",
  },
];

export const mobileSidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    classname:"row-start-1 row-end-2 col-start-1 col-end-3",
    label: "Home",

  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    classname:"row-start-2 row-end-3 col-start-1 col-end-2",
    label: "Community",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/collection",
    classname:"row-start-2 row-end-3 col-start-2 col-end-3",
    label: "Collections",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/ask-question",
    classname:"row-start-5 row-end-6 col-start-1 col-end-3",
    label: "Ask a question",
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};
