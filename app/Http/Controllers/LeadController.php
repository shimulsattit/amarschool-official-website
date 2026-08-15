<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class LeadController extends Controller
{
    /**
     * Handle incoming demo/meeting request submissions.
     */
    public function storeDemoRequest(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => 'nullable|email|max:255',
            'institution_name' => 'nullable|string|max:255',
            'service_type' => 'nullable|string|max:100',
            'message' => 'nullable|string|max:1000',
        ]);

        Lead::create($validated);

        return back()->with('success', 'আপনার ডেমো অনুরোধটি সফলভাবে গ্রহণ করা হয়েছে! আমাদের টিম শীঘ্রই যোগাযোগ করবে।');
    }
}
