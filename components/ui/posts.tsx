import useSWR from "swr";
import { Badge } from "@/components/ui/badge";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Posts() {
  const { data, error } = useSWR("/api/fetchPosts", fetcher);

  if (error) return <div>Failed to load posts</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="mt-5">
      {data.map((post: { user_id: string; content: string }) => (
        <div key={post.user_id}>
          <div className="flex flex-row">
            <Badge className="border border-blue-500 font-normal">
              {post.user_id}
            </Badge>
            <p className="px-2"> says...</p>
          </div>
          <p className="px-5 pt-5">{post.content}</p>
        </div>
      ))}
    </div>
  );
}
