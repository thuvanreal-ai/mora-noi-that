const url=(process.env.NEXT_PUBLIC_SITE_URL||"https://thuvanreal-ai.github.io/mora-noi-that").replace(/\/$/,"");
const basePath=process.env.NEXT_PUBLIC_BASE_PATH??(process.env.GITHUB_ACTIONS==='true'?'/mora-noi-that':'');
export const site={name:"MORA Nội Thất MDF",phone:"0916858566",phoneDisplay:"0916 85 85 66",url,basePath,zalo:process.env.NEXT_PUBLIC_ZALO_URL||"https://zalo.me/0916858566"};
