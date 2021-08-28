// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export interface IMeta {
  title: string;
  description: string;
  img: string;
}

export type Tag = string;

export interface IBookmarkNote {
  guid: string,
  link: string;
  meta: IMeta;
  tags: Tag[];
} 
const data:IBookmarkNote[] = [{
  guid: "1",
  link: "https://docs.oshpark.com/services/two-layer/",
  meta: {
    title: "OSH Park Docs ~ Services ~ 2 Layer Prototype Service",
    description: "",
    img: ""
  },
  tags: ["electronics", "products"]
},
{
  guid: "2",
  link: "https://www.youtube.com/watch?v=C7FMIRfP1tk",
  meta: {
    title: "(5) Theo jansen walking leg mechanism animation - YouTube",
    description: "",
    img: ""
  },
  tags: ["robotics", "idea", "jansen linkage"]
},
{
  guid: "3",
  link: "https://www.csuohio.edu/sites/default/files/47A-2016.pdf",
  meta: {
    title: "The Jansen Linkage",
    description: "",
    img: ""
  },
  tags: ["robotics", "idea", "jansen linkage"]
},
{
  guid: "4",
  link: "https://colinhacks.com/essays/building-a-spa-with-nextjs",
  meta: {
    title: "Building a single-page application with next.js and react router",
    description: "",
    img: ""
  },
  tags: ["react", "nextjs", "article"]
},
{
  guid: "5",
  link: "https://github.com/vercel/next.js/issues/26371",
  meta: {
    title: "Proposal: `Wrapper` component for groups of routes in folders · Issue #26371 · vercel/next.js · GitHub",
    description: "",
    img: ""
  },
  tags: ["react", "nextjs", "idea"]
},
{
  guid: "6",
  link: "https://www.schemecolor.com/magenta-silver-wedding-theme-colors.php",
  meta: {
    title: "Magenta silver wedding theme",
    description: "",
    img: ""
  },
  tags: ["project", "notes"]
},
{
  guid: "7",
  link: "https://www.instructables.com/Make-Your-Own-Simple-Theremin/",
  meta: {
    title: "Make Your Own Simple Theremin",
    description: "",
    img: ""
  },
  tags: ["project", "theremin", "article", "electronics"]
},
{
  guid: "8",
  link: "http://www.thereminworld.com/Article/14695/a-diy-wine-box-theremin",
  meta: {
    title: "A DIY Wine Box Theremin",
    description: "",
    img: ""
  },
  tags: ["project", "theremin", "article", "electronics"]
},
{
  guid: "9",
  link: "https://www.cs.nmsu.edu/~rth/EMTheremin.pdf",
  meta: {
    title: "Build the EM Theremin",
    description: "",
    img: ""
  },
  tags: ["project","theremin", "article", "electronics"]
},
{
  guid: "10",
  link: "https://mitxela.com/projects/hardware",
  meta: {
    title: "hardware - projects - mitxela.com",
    description: "",
    img: ""
  },
  tags: ["electronics","article", "idea"]
},
{
  guid: "11",
  link: "https://www.amazon.de/Novation-AMS-LAUNCHKEY-MINI-MK3-Launchkey-Mini-MK3/dp/B07WJZCPT3/ref=sr_1_3?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=BGP44LIH0S0V&dchild=1&keywords=novation+launchkey+mini+mk3+midi-controller&qid=1623488503&sprefix=Novation+Launchkey+Mini+%5BMK3%5D+%2Caps%2C173&sr=8-3",
  meta: {
    title: "Novation-AMS-LaunchKey",
    description: "",
    img: ""
  },
  tags: ["music","product"]
}
,
{
  guid: "12",
  link: "https://splice.com/features/sounds",
  meta: {
    title: "splice sounds",
    description: "",
    img: ""
  },
  tags: ["music","product"]
},
{
  guid: "13",
  link: "https://www.valentinog.com/article/webpack/",
  meta: {
    title: "Webpack",
    description: "",
    img: ""
  },
  tags: ["webpack","article"]
}]



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IBookmarkNote[]>
) {
  res.status(200).json(data)
}
