/** @type {import("next").NextConfig} */
const isGithub=process.env.GITHUB_ACTIONS==="true";
const configured=process.env.NEXT_PUBLIC_BASE_PATH;
const basePath=configured!==undefined?configured:(isGithub?"/mora-noi-that":"");
const nextConfig={reactStrictMode:true,output:"export",trailingSlash:true,images:{unoptimized:true},basePath,assetPrefix:basePath};
export default nextConfig;