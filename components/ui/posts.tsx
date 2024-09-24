import useSWR from "swr";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp } from "lucide-react";
import { MessageCircle } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Posts() {
  const { data, error } = useSWR("/api/fetchPosts", fetcher);

  if (error) return <div>Failed to load posts</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="mt-5 mb-3">
      {data.map(
        (post: { user_id: string; content: string; created_at: string }) => (
          <div key={post.user_id} className="mt-5">
            <div className="flex flex-row">
              <Badge className="border border-blue-500 font-normal">
                {post.user_id}
              </Badge>
              <p className="px-2"> says...</p>
            </div>
            <div className="h-2" />
            <p className="flex flex-col tracking-tight ">
              {post.content}
              <div className="text-xs text-gray-500">
                {new Date(post.created_at).toLocaleString()}
              </div>
              <div className="flex flex-row">
                <button className="mt-2 text-sm">
                  <ThumbsUp className="text-sm mr-4 hover:text-blue-500" />
                </button>
                <button className="mt-2 text-sm">
                  <MessageCircle className="text-sm hover:text-blue-500" />
                </button>
              </div>
            </p>
          </div>
        )
      )}
    </div>
  );
}
