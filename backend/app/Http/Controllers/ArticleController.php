<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ArticleController extends Controller
{
    public function index(): JsonResponse
    {
        $articles = Article::with('comments')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $articles
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $article = Article::with('comments')->find($id);

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $article
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string'
        ]);

        $article = Article::create([
            'title' => $request->title,
            'content' => $request->content
        ]);

        return response()->json([
            'success' => true,
            'data' => $article,
            'message' => 'Article created successfully'
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found'
            ], 404);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string'
        ]);

        $article->update([
            'title' => $request->title,
            'content' => $request->content
        ]);

        return response()->json([
            'success' => true,
            'data' => $article,
            'message' => 'Article updated successfully'
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found'
            ], 404);
        }

        $article->delete();

        return response()->json([
            'success' => true,
            'message' => 'Article deleted successfully'
        ]);
    }
} 