<?php

namespace App\Http\Controllers;

use App\Models\JournalEntry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JournalEntryController extends Controller
{
    public function getEntries($date): JsonResponse
    {
        $entry = JournalEntry::where('date', $date)->first();
        return response()->json(['message' => 'Entry fetched', 'data' => $entry]);
    }

    public function addOrUpdateEntry(Request $request, $date): JsonResponse
    {
        if (JournalEntry::updateOrInsert(['date' => $date], ['body' => $request->get('body')])) {
            return response()->json(['message' => 'Entry updated successfully']);
        }
        return response()->json(['message' => 'An unexpected error occurred'], 500);
    }
}
