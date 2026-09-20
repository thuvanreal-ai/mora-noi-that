/** @type {import("next").NextConfig} */
const isGithub=process.env.GITHUB_ACTIONS==="true";
const nextConfig={reactStrictMode:true,output:"export",trailingSlash:true,images:{unoptimized:true},basePath:isGithub?"/mora-noi-that":"",assetPrefix:isGithub?"/mora-noi-that/":""};
export default nextConfig;
