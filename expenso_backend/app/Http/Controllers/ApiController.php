<?php

namespace App\Http\Controllers;

use App\Http\Traits\JsonTrait;
use App\Models\income;
use App\Models\expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ApiController extends Controller
{
    use JsonTrait;
    /** 
     *  Login
     * 
     * Test
     * 
     * Test
     * 
     * 
     * @bodyParam user_id int Example:9
     * 
     */

    public function __construct() {
        $this->middleware('auth:api');
    }

    public function testapi(Request $request){

    	$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        
        if ($validator->fails()) {
            return $this->JsonResponse($validator->errors(),
            'Invalid Input Parameter', 
            422);
        }

        return $request;
    }

    /**
     * Income test
     * 
     * Test
     *
     * @bodyParam user_id int Example:9
     * 
     */
   

    public function getIncome(Request $request){
        $incomes = DB::table('incomes')->where('user_id', $request->user_id)->orderBy('entry_date','desc')->get();

        // return $incomes;

        return $this->jsonResponse(compact('incomes'),
        '',
        200);

    }
    /**
     * Add Income
     * 
     * Add income entry to database
     *
     * 
     * @authenticated
     * @header Authorization Bearer {{token}}
     * @bodyParam user_id int
     * @bodyParam value dec
     * @bodyParam type string
     * @bodyParam entry_date date
     * 
     */

    public function addIncome(Request $request){
        DB::table('incomes')->insert([
            'user_id' => $request->user_id,
            'value' => $request->value,
            'type' => $request->type,
            'entry_date' => $request->entry_date,
            'status' => 1
        ]);

        return $this->jsonResponse($request,'Added entry successfully',200);
    }


    /**
     * Remove Income
     * 
     * Remove income entry from database
     *
     * 
     * @authenticated
     * @header Authorization Bearer {{token}}
     * @bodyParam id int
     * 
     */
    public function removeIncome (Request $request){
        DB::table('incomes')
        ->where('id', $request->id)
        ->update(['status' => 0]);

        return $this->jsonResponse($request->id,'Removed entry successfully',200);
    }
    /**
     * Expenses test
     * 
     * Test
     *
     * 
     * 
     * @authenticated
     * @header Authorization Bearer {{token}}
     * @bodyParam user_id int Example:9
     * 
     */

    public function getExpenses(Request $request){
        $expenses = DB::table('expenses')->where('user_id', $request->user_id)->orderBy('entry_date','desc')->get();

        // return $incomes;

        return $this->jsonResponse(compact('expenses'),
        '',
        200);

    }
    /**
     * Add Expenses
     * 
     * Add expenses entry to database
     *
     * 
     * 
     * @authenticated
     * @header Authorization Bearer {{token}}
     * @bodyParam user_id int
     * @bodyParam value dec
     * @bodyParam type string
     * @bodyParam entry_date date
     * 
     */

    public function addExpenses(Request $request){
        DB::table('expenses')->insert([
            'user_id' => $request->user_id,
            'value' => $request->value,
            'type' => $request->type,
            'entry_date' => $request->entry_date,
            'status' => 1
        ]);

        return $this->jsonResponse($request,'Added entry successfully',200);
    }


    /**
     * Remove Expenses
     * 
     * Remove expenses entry from database
     *
     * 
     * 
     * @authenticated
     * @header Authorization Bearer {{token}}
     * @bodyParam id int
     * 
     */
    public function removeExpenses (Request $request){
        DB::table('expenses')
        ->where('id', $request->id)
        ->update(['status' => 0]);

        return $this->jsonResponse($request->id,'Removed entry successfully',200);
    }


}
