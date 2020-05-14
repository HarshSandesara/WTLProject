<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
use App\Event;
use App\User;
use App\Http\Resources\Event as EventResource;
use App\Http\Resources\EventCollection;
use App\Committee;
use \Auth;
use Illuminate\Support\Facades\Auth as FacadesAuth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{
    public function index()
    {
        $user = auth()->user(); 
        $profileData = array(
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
            'type' => Auth::getDefaultDriver()
        );
        $js_code = 'console.log(' . json_encode($profileData, JSON_HEX_TAG) . 
    ');';
        
        $js_code = '<script>' . $js_code . '</script>';
    
        echo $js_code;
        // $user = Auth::user();
        // $events[] = new Event();
        // array_shift($events);
        // foreach ($user->following as $committee) {
        //     foreach($committee->event as $event) {
        //         array_push($events, $event);
        //     }
        // }
        // $sortedEvents = Arr::sort($events, function($event)
        // {
        //     // Sort the events by their date and time.
        //     return $event->from;
        // });
        // return view('home', [
        //     'events' => $sortedEvents
        // ]);
        if (Auth::getDefaultDriver() == 'web') {
            return Redirect::away('http://localhost:4200/user/'.urlencode($user->id).'/'.urlencode($user->name).'/'.urlencode($user->email).'/'.urlencode($user->password).'/'.urlencode(Auth::getDefaultDriver()));
        } else if (Auth::getDefaultDriver() == 'committee') {
            return Redirect::away('http://localhost:4200/organiser/'.urlencode($user->id).'/'.urlencode($user->name).'/'.urlencode($user->email).'/'.urlencode($user->password).'/'.urlencode(Auth::getDefaultDriver()));
        }
    }

    public function indexApi()
    {
        return new EventCollection(Event::all());
    }

    public function loginDataApi() {
        $user = Auth::user();
        $type = Auth::getDefaultDriver();
        return json_encode($type, JSON_HEX_TAG);
    }

    public function logout2() {        
        Auth::guard()->logout();

        request()->session()->invalidate();

        request()->session()->regenerateToken();

        return request()->wantsJson()
            ? new Response('', 204)
            : redirect('/');
    }

    public function show($id)
    {
        return new EventResource(Event::findOrFail($id));
    }

    public function getFollowingData($id)
    {
        $followingData = DB::table('committee_user')->get()->where('user_id', $id);
        return $followingData;
    }

    public function getCommitteeData() {
        return DB::table('committees')->get();
    }

    public function follow(Request $request)
    {
        $user = User::find($user_id);
        $user->following()->attach($committee_id);
    }

    public function register(Request $request)
    {
        $user = User::find($user_id);
        $user->registered()->attach($event_id);
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
            'from' => 'required',
            'to' => 'required',
            'price' => 'required'
            //'committee_id' => 'required|exists:'.$committee->getTable().','.$committee->getKeyName()
        ]);
        $event = new Event();
        $event->name = $request->name;
        $event->from = $request->from;
        $event->to = $request->to;
        $event->price = $request->price;
        $event->committee_id = $committee->getKey();
        $event->save();

        return redirect('/committee');
    }

    public function storeApi(Request $request)
    {
        $event = new Event();
        $event->name = $request->name;
        $event->from = $request->from;
        $event->to = $request->to;
        $event->price = $request->price;
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
