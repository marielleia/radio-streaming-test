import { rest } from "msw";
import data from "./data.json";

export const handlers = [
  rest.get("http://95.179.139.106/json/stations/search", (req, res, ctx) => {
    const name=req.url.searchParams.get('name')
    if(name!=="patata")
    return res (ctx.json(data)
    ) 
    return res(
      ctx.json([])
      );
  }),
];