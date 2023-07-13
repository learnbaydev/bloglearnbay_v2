// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSortedPostsData } from "../../../lib/posts";
export default function handler(req, res) {
  const blogData = getSortedPostsData();
  if (req.method === "GET") {
    res.status(200).json({ blogData });
  }
}
