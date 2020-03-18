<?php

use Illuminate\Database\Seeder;
use App\Committee;

class CommitteesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('committees')->delete();
        $faker = \Faker\Factory::create();
        $password = Hash::make('ashutosh');

        for ($i=0; $i < 5; $i++) {
            Committee::create([
                'name' => $faker->name,
                'email' => $faker->email,
                'password' => $password
            ]);
        }
    }
}
