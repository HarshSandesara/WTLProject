<?php

use Illuminate\Database\Seeder;
use App\Event;
use App\Committee;

class EventsSeederTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Event::truncate();
        $faker = \Faker\Factory::create();
        $unixTimestap = '1461067200';
        for ($i=0; $i < 10; $i++) {
            Event::create([
                'name' => $faker->name,
                'when' => $faker->dateTimeBetween('now', '+60 days'),
                'committee_id' => $this->getRandomCommitteeId()
            ]);
        }
    }
    private function getRandomCommitteeId() {
        $committee = Committee::inRandomOrder()->first();
        return $committee->id;
    }
}
