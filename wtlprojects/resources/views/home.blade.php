@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('name') }}
                        </div>
                    @endif
                </div>
                {{-- <div class="card-body">
                    <form method="POST" action="/events">
                        @csrf
                        <input type="text" name="name" class="form-control" placeholder="Event Name" required>
                        <input type="date" name="when" class="form-control" placeholder="Event date" required>
                        <input type="number" name="committee_id" class="form-control" placeholder="Committee" required>
                        <button type="submit" class="btn btn-primary">Post!</button>
                    </form>
                </div> --}}
                <hr>
                <div class="card-body">
                    @foreach ($events ?? '' as $event)
                        <div class="d-flex flex-row justify-content-between">
                            <h3>{{ $event->committee['name'] }}</h3>
                            <button type="button" class="btn btn-primary" id="{{ $event->id }}">Edit!</button>
                        </div>
                        {{$event->name}}
                        {{Carbon\Carbon::parse($event->when)->diffForHumans()}}
                        <hr>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
