<?php

namespace App\Http\Controllers;

use Auth;
use App\Committee;
use App\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $events[] = new Event();
        foreach ($user->following as $committee) {
            foreach($committee->event as $event) {
                array_push($events, $event);
            }
        }
        return view('home', [
            'events' => $events
        ]);
    }

    public function show($id)
    {
        return Event::find($id);
    }

    public function store(Request $request)
    {
        $committee = new Committee();
        $request->validate([
            'name' => 'required',
            'when' => 'required',
            'committee_id' => 'required|exists:'.$committee->getTable().','.$committee->getKeyName()
        ]);

        $event = new Event();
        $event->name = $request->name;
        $event->when = $request->when;
        $event->committee_id = $request->committee_id;
        $event->save();

        return redirect('/home');
    }

    public function update(Request $request, $id)
    {
        $article = Event::findOrFail($id);
        $article->update($request->all());
        return $request->all();
    }

    public function delete(Request $request, $id)
    {
        $article = Event::findOrFail($id);
        $article->delete();
        return 204;
    }
}
