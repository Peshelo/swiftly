"use client";
import { useState, useEffect } from "react";
import pb from "@/lib/connection";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const flagColors = {
    COMPLAINT: "bg-red-100 text-red-800 border-red-300",
    COMMENT: "bg-blue-100 text-blue-800 border-blue-300",
    SUGGESTION: "bg-green-100 text-green-800 border-green-300",
    OTHER: "bg-purple-100 text-purple-800 border-purple-300",
  };

  const fetchComments = async () => {
    try {
      const records = await pb.collection("comments").getFullList({
        sort: "-created",
      });
      setComments(records);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch comments");
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();

    const subscribeToComments = async () => {
      try {
        await pb.collection("comments").subscribe("*", function (e) {
          if (e.action === "create") {
            setComments((prev) => [e.record, ...prev]);
            toast.success("New comment added");
          } else if (e.action === "update") {
            setComments((prev) =>
              prev.map((comment) =>
                comment.id === e.record.id ? e.record : comment
              )
            );
          } else if (e.action === "delete") {
            setComments((prev) =>
              prev.filter((comment) => comment.id !== e.record.id)
            );
          }
        });
      } catch (error) {
        console.error("Subscription error:", error);
      }
    };

    subscribeToComments();

    return () => {
      pb.collection("comments").unsubscribe("*");
    };
  }, []);

  const filteredComments = comments.filter((comment) => {
    const matchesFilter =
      filter === "ALL" || comment.flag === filter;
    const matchesSearch = comment.comment
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Comments</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search comments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by flag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Flags</SelectItem>
            <SelectItem value="COMPLAINT">Complaints</SelectItem>
            <SelectItem value="COMMENT">Comments</SelectItem>
            <SelectItem value="SUGGESTION">Suggestions</SelectItem>
            <SelectItem value="OTHER">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : filteredComments.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No comments found
        </div>
      ) : (
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <Badge
                  className={`${flagColors[comment.flag] || "bg-gray-100 text-gray-800 border-gray-300"}`}
                >
                  {comment.flag}
                </Badge>
                <span className="text-sm text-gray-500">
                  {new Date(comment.created).toLocaleString()}
                </span>
              </div>
              <p className="whitespace-pre-line">{comment.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}