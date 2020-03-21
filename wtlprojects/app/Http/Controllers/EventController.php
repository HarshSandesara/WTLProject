<?php

namespace App\Http\Controllers;
use App\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $event = Event::all();
        return view('home', [
            'events' => $event
        ]);
    }

    public function show($id)
    {
        return Event::find($id);
    }

    public function store(Request $request)
    {
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
