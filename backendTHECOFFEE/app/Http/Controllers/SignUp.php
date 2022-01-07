<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SignUp extends Controller
{
      
    public function create(Request $request)

    {   
        try{
            $value=$request->all();
            $data['Password']= bcrypt($value['Password']);
            $data['Email']= $value['Email'];
            $data['Username']= $value['Username'];
            $data['Phone']= $value['Phone'];
            $data['Name']= $value['Name'];
            DB::table('users')->insert($data);
            return request()->json("");
        }
        catch(Exception $a){
            return request()->json("no");
        }
       

    }   
}
