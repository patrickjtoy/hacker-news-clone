import esbuildServe from "esbuild-serve"

esbuildServe(
  {
    bundle: true,
    define: {
      "process.env.NODE_ENV": "'develop'"
    },
    entryPoints: ["src/App.tsx"],
    outfile: "public/index.js",
    platform: "browser",
    sourcemap: true
  },
  {
    port: 7000,
    root: "."
  }
)
