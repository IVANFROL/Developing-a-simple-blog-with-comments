<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CommentController extends Controller
{
    public function store(Request $request, int $articleId): JsonResponse
    {
        $article = Article::find($articleId);

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found'
            ], 404);
        }

        $request->validate([
            'author_name' => 'required|string|max:255',
            'content' => 'required|string'
        ]);

        $comment = Comment::create([
            'article_id' => $articleId,
            'author_name' => $request->author_name,
            'content' => $request->content
        ]);

        return response()->json([
            'success' => true,
            'data' => $comment,
            'message' => 'Comment added successfully'
        ], 201);
    }
} 