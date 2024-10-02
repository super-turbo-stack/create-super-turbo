// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true;
  items?: EachRoute[];
};

export const ROUTES: EachRoute[] = [
  {
    title: "Getting Started",
    href: "/getting-started",
    noLink: true,
    items: [
      { title: "Introduction", href: "/introduction" },
      { title: "Quick Start Guide", href: "/quick-start-guide" },
      {
        title: "Installation",
        href: "/installation",
      },
      { title: "Advanced Usage", href: "/advanced-usage" },
      { title: "Default Options", href: "/default-options" },
      { title: "Project Structure", href: "/project-structure" },
    ],
  },

  {
    title: "Community",
    href: "/community",
    noLink: true,
    items: [
      {
        title: "FAQ",
        href: "/faq",
      },
      {
        title: "Opensource",
        href: "/opensource",
      },
      {
        title: "Package Request",
        href: "/package-request",
      },
    ],
  },
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
