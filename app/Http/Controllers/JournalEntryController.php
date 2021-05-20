<?php

namespace App\Http\Controllers;

use App\Models\JournalEntry;
use Exception;
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
        try {
            $entry = JournalEntry::where('date', $date)->first();
            if (empty($entry)) {
                JournalEntry::create(['date' => $date, 'body' => $request->get('body')]);
            } else {
                $entry->body = $request->get('body');
                $entry->save();
            }
            return response()->json(['message' => 'Entry updated successfully']);
        } catch (Exception $exception) {
            return response()->json(['message' => 'An unexpected error occurred'], 500);
        }
    }
}
