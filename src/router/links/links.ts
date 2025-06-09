export const appLinks: ReadonlyArray<{
  name: string;
  id: string,
  path: string;
  icon: string;
}> = [
  {
    name: "Home",
    id: crypto.randomUUID(),
    path: "/",
    icon: "home",
  },
  {
    name: "About",
    id: crypto.randomUUID(),
    path: "/about",
    icon: "info",
  },
];
