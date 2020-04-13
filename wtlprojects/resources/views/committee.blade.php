@extends('layouts.auth')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Dashboard</div>

                    <div class="card-body">

                        <form method="POST" action="/events">
                            @csrf
                            <input type="text" name="name" class="form-control" placeholder="Event Name" required>
                            <input type="date" name="from" class="form-control" placeholder="Event Start Date" required>
                            <input type="date" name="to" class="form-control" placeholder="Event End Date" required>
                            <input type="number" name="price" class="form-control" placeholder="Registration Fees" required>
                            {{-- <input type="number" name="committee_id" class="form-control" placeholder="Committee" required> --}}
                            <button type="submit" class="btn btn-primary">Post!</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
