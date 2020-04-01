<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Event;
use App\Http\Resources\Event as EventResource;
use App\Http\Resources\EventCollection;
use App\Committee;
use Auth;

class EventController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $events[] = new Event();
        array_shift($events);
        foreach ($user->following as $committee) {
            foreach($committee->event as $event) {
                array_push($events, $event);
            }
        }
        return view('home', [
            'events' => $events
        ]);
    }

    public function indexApi()
    {
        return new EventCollection(Event::all());
    }

    public function show($id)
    {
        return new EventResource(Event::findOrFail($id));
    }

    public function store(Request $request)
    {
        //$committee = new Committee();
        if(Auth::guard('committee')->check())
        {
            $committee = auth('committee')->user();
        }
        $request->validate([
            'name' => 'required',
            'when' => 'required',
            //'committee_id' => 'required|exists:'.$committee->getTable().','.$committee->getKeyName()
        ]);
        $event = new Event();
        $event->name = $request->name;
        $event->when = $request->when;
        $event->committee_id = $committee->getKey();
        $event->save();

        return redirect('/committee');
    }

    public function storeApi(Request $request)
    {
        $event = new Event();
        $event->name = $request->name;
        $event->when = $request->when;
        $event->committee_id = $request->committee_id;
        $event->save();

        return (new EventResource($event))
                ->response()
                ->setStatusCode(201);
    }

    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);
        $event->update($request->all());
        $event->save();
        return (new EventResource($event))->response();
    }

    public function delete(Request $request, $id)
    {
        $event= Event::findOrFail($id);
        $event->delete();
        return response()->json(null, 204);
    }
}
