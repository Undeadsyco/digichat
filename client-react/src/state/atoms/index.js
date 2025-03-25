import { atom, selector } from "recoil";

import { LoadingPanel } from "../../components/global";
import { groupActions, postActions, userActions, utilActions } from "../../actions";

export const AppUser = selector({
  key: 'appUser',
  default: null,
  get: async () => {
    let user = null;
    if (document.cookie) user = await utilActions.verifyLogin();
    if (!user) return null;
    return user;
  },
  set: ({ set }, newValue) => {
    set(AppUser, newValue);
    set(Redirect, '/feed');
  },
});

export const Modal = atom({
  key: 'modal',
  default: {
    loading: false,
    display: false,
    Children: <LoadingPanel />,
  },
});

export const Error = atom({
  key: 'error',
  default: null,
});

export const Redirect = atom({
  key: "redirect",
  default: null,
});

export const Posts = atom({
  key: "mainPosts",
  default: [],
});

export const Users = atom({
  key: "mainUsers",
  default: [],
});

export const Groups = atom({
  key: "mainGroups",
  default: [],
});

export const View = atom({
  key: 'view',
  default: 'feed',
});

export const MainPageState = selector({
  key: "mainPage",
  get: async ({ get }) => {
    const posts = get(AppUser) ? await postActions.getPosts() : null;
    const users = get(AppUser) ? await userActions.getUsers() : null;
    const groups = get(AppUser) ? await groupActions.getGroups() : null;
    return { view: get(View), posts, users, groups };
  },
  set: ({ set }, newValue) => {
    console.log(newValue);
  },
});
