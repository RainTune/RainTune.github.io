const map = {
  "//localhost:5173/": "//wujie-micro.github.io/demo-vite/",
};

export default function hostMap(host) {
  if (process.env.NODE_ENV === "production") return map[host];
  return host;
}
