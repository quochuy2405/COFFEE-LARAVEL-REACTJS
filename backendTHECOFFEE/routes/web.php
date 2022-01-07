<?php

use App\Exports\ExportExcel;
use App\Exports\ExportExcelDate;
use App\Exports\ExportExcelMonth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Hash;
use SebastianBergmann\Environment\Console;
use Maatwebsite\Excel\Facades\Excel;
use function PHPUnit\Framework\isEmpty;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//HTTP[GET]
Route::get('/products', function () {
    $product = DB::table('Product')->get();
    return response()->json($product);
});
Route::get('/account', function () {
    $product = DB::table('Account')->get();
    return response()->json($product);
})->middleware('R1');
Route::get('/news', function () {
    $data = DB::table('News')->get();
    return response()->json($data);
});
Route::get('/ProductTypes', function () {
    $data = DB::table('ProductType')->get();
    return response()->json($data);
});
Route::get('/stores', function () {
    $data = DB::table('Store')->get();
    return response()->json($data);
});
Route::get('/supplier', function () {
    $data = DB::table('Supplier')->get();
    return response()->json($data);
})->middleware('R12');
Route::get('/stores/customer', function () {
    $data = DB::table('Store')->get();
    return response()->json($data);
})->middleware('R12');
Route::get('/stores/district', function () {
    $Data = DB::table('Store')->select('District')
        ->selectRaw('count(*) as Count')
        ->groupBy('District')
        ->get();
    return response()->json($Data);
});
Route::get('/discount', function () {
    $data = DB::table('Discount')->get();
    return response()->json($data);
});
Route::get('/bill', function () {
    $data = DB::table('Bill')->get();
    return response()->json($data);
});
Route::get('/customer', function () {
    $data = DB::table('users')->get();
    return response()->json($data);
})->middleware('R12');
Route::get('/employees', function () {
    $data = DB::table('Employee')->get();
    return response()->json($data);
})->middleware('R12');
Route::get('/managers', function () {
    $data = DB::table('Manager')->get();
    return response()->json($data);
})->middleware('R1');
Route::get('/managers/withoutacc', function () {
    $data = DB::table('Manager')->get();
    return response()->json($data);
});
Route::get('/role', function () {
    $data = DB::table('Role')->get();
    return response()->json($data);
})->middleware('R1');
//HTTP[GET]:id
Route::get('/bill/{id}', function ($id) {
    $data = DB::table('Bill')->where("id", "=", $id)->get();
    return response()->json($data);
});
Route::get('/account/{id}', function ($id) {
    $data = DB::table('Account')->where("id", "=", $id)->first();
    return response()->json($data);
});
Route::get('/supplier/{id}', function ($id) {
    $data = DB::table('Supplier')->where("id", "=", $id)->first();
    return response()->json($data);
})->middleware('R1');
Route::get('/product/{id}', function ($id) {
    $data = DB::table('Product')->where("id", "=", $id)->first();
    return response()->json($data);
});
Route::get('/manager/{id}', function ($id) {
    $data = DB::table('Manager')->where("id", "=", $id)->first();
    return response()->json($data);
})->middleware('R1');
Route::get('/employee/{id}', function ($id) {
    $data = DB::table('Employee')->where("id", "=", $id)->first();
    return response()->json($data);
})->middleware('R12');
Route::get('/productType/{id}', function ($id) {
    $data = DB::table('ProductType')->where("id", "=", $id)->first();
    return response()->json($data);
})->middleware('R12');
Route::get('/customer/{id}', function ($id) {
    $data = DB::table('users')->where("id", "=", $id)->first();
    return response()->json($data);
})->middleware('R12');
Route::get('/news/{id}', function ($id) {
    $data = DB::table('News')->where("id", "=", $id)->first();
    return response()->json($data);
})->middleware('R12');

Route::get('/role/{id}', function ($id) {
    $data = DB::table('Role')->where("id", "=", $id)->first();
    return response()->json($data);
})->middleware('R1');
Route::get('/discount/{id}', function ($id) {
    $data = DB::table('Discount')->where("id", "=", $id)->first();
    return response()->json($data);
})->middleware('R12');
Route::get('/store/{id}', function ($id) {
    $data = DB::table('Store')->where("id", "=", $id)->first();
    return response()->json($data);
});
Route::get('/stores/withoutmanager/{id}', function ($id) {
    $data = DB::table('Store')->where("ManagerId", "=", null)->orWhere("ManagerId", "=", $id)->get();
    return response()->json($data);
})->middleware('R1');
Route::get('/bill/sales/year/{year}', function ($year) {
    $data = DB::select("
    SELECT MONTH(CreatedDate) AS Month, SUM(TotalPrice) AS Revenue 
                             FROM Bill
                             WHERE YEAR(CreatedDate) = $year and Validated = 1
                             GROUP BY MONTH(CreatedDate)
                             ORDER BY MONTH(CreatedDate)", [1]);
    return response()->json($data);
})->middleware('R12');
Route::get('/bill/sales/years/{year}', function ($year) {
    $data = DB::select("
    SELECT MONTH(CreatedDate) AS Month,COUNT(*) AS SLHD, SUM(TotalPrice) AS Revenue 
                             FROM Bill
                             WHERE YEAR(CreatedDate) = $year and Validated = 1
                             GROUP BY MONTH(CreatedDate)
                             ORDER BY MONTH(CreatedDate)", [1]);
    return response()->json($data);
})->middleware('R12');
Route::get('/bill/total/{year}', function ($year) {
    $data = DB::select("
    select count(*) as count
    from ShoppingCart_Product
    where year(CreatedDate) = $year", [1]);
    return response()->json($data);
})->middleware('R12');
Route::get('bill/sales/years/{date}', function ($date) {
    $DATE = explode('-', $date);
    $data = DB::select("
    SELECT DAY(CreatedDate), COUNT(*), SUM(TotalPrice)
                          FROM Bill
                          WHERE MONTH(CreatedDate) =  $DATE[0] AND YEAR(CreatedDate) = $DATE[1] and Validated = 1
                          GROUP BY DAY(CreatedDate)
                          ORDER BY DAY(CreatedDate)", [1]);
    return response()->json($data);
})->middleware('R12');
Route::get('bill/sales/months/{param}', function ($param) {
    $DATE = explode('-', $param);
    $data = DB::select("
    SELECT DAY(CreatedDate), COUNT(*), SUM(TotalPrice)
                          FROM Bill
                          WHERE MONTH(CreatedDate) =  $DATE[0] AND YEAR(CreatedDate) = $DATE[1] and Validated = 1
                          GROUP BY DAY(CreatedDate)
                          ORDER BY DAY(CreatedDate)", [1]);
    return response()->json($data);
})->middleware('R12');
Route::get('/bill/count/{year}', function ($year) {
    $data = DB::select("
    select count(*) as count
    from Bill
    where year(CreatedDate) = $year 
    and Validated = 1;", [1]);
    return response()->json($data);
})->middleware('R12');
Route::get('/bill/sales/date/{date}', function ($date) {
    $DATE = explode('-', $date);
    $data = DB::select("
    SELECT Id, CreatedDate, TotalPrice, PayBy
    FROM Bill 
    WHERE DAY(CreatedDate) = $DATE[1] and
    MONTH(CreatedDate) = $DATE[0] and
    YEAR(CreatedDate) = $DATE[2] 
    and Validated = 1
    ORDER BY TIME(CreatedDate)", [1]);
    return response()->json($data);
})->middleware('R12');
Route::get('/bill/totalsale/{year}', function ($year) {
    $data = DB::select("
    select sum(TotalPrice) as TotalSale
    from Bill
    where year(CreatedDate) = $year
     and Validated = 1", [1]);
    return response()->json($data);
})->middleware('R12');
Route::get('/bill/revenue/date/{param}', function ($param) {
    $DATE = explode('-', $param);
    $data = DB::select("
    SELECT Id, CreatedDate, TotalPrice, PayBy
    FROM Bill 
    WHERE DAY(CreatedDate) = $DATE[1] and
    MONTH(CreatedDate) = $DATE[0]  and
    YEAR(CreatedDate) = $DATE[2]
    and Validated = 1
    ORDER BY TIME(CreatedDate)", [1]);
    return response()->json($data);
})->middleware('R12');
//HTTP[POST]
Route::post('/bill/purchase', function (Request $request) {
    try {
        $CreatedDate = date('Y-m-d H:i:s');
        $data = $request->all();
        if ($data["CustomerId"]) {
            $bill["CustomerId"] = $data["CustomerId"];
            $bill["Validated"] = '0';
            $bill["Status"] = "Chưa thanh toán";
            $bill["TotalPrice"] = $data["TotalPrice"];
            $bill["Address"] = $data["Address"];
            $bill["Name"] = $data["Name"];
            $bill["Phone"] = $data["Phone"];
            $bill["Time"] = $data["Time"];
            $bill["PayBy"] = $data["PayBy"];
            $bill["Note"] = $data["Note"];
            $bill["CreatedDate"] = $CreatedDate;
            Db::table("Bill")->insert($bill);
            $shoppingCart["CustomerId"] = $data["CustomerId"];
            $shoppingCart["ProductQuantity"] = count($data["listBill"]);
            $shoppingCart["CreatedDate"] = $CreatedDate;

            Db::table("ShoppingCart")->insert($shoppingCart);
            $id = Db::table('ShoppingCart')->select('Id')->where('Id', Db::raw("(select max(`Id`) from ShoppingCart)"))->first();
            for ($i = 0; $i < count($data["listBill"]); $i++) {
                $ShoppingCart_Product["ProductId"] = $data["listBill"][$i]['ProductId'];
                $ShoppingCart_Product["ShoppingCartId"] = $id->Id;
                $ShoppingCart_Product["TilteSize"] = $data["listBill"][$i]['TitleSize'];
                $ShoppingCart_Product["Count"] = $data["listBill"][$i]['count'];
                $ShoppingCart_Product["CreatedDate"] = $CreatedDate;
                Db::table("ShoppingCart_Product")->insert($ShoppingCart_Product);
            }



            if ($data["CheckDiscount"] && $data["DiscountId"] > 0) {
                $quantity = Db::table("Discount")->where('Id', "=", $data["DiscountId"])->value('Quantity');
                if ($quantity > 0)
                    $quantity--;
                else
                    $quantity = 0;
                Db::table("Discount")->where('Id', $data["DiscountId"])->update(['Quantity' =>  $quantity]);
            }


            return response('Successfully', 200);
        } else {
            return response('Insert failed', 400);
        }
    } catch (Exception $e) {
        return response('Insert failed', 400);
    }
})->middleware('R12');
Route::post('/role/add', function (Request $request) {
    try {
        $data = $request->all();
        if ($data) {

            Db::table("Role")->insert($data);
            return response('Insert Successfully', 200);
        } else {
            return response('Insert Faild', 400);
        }
    } catch (Exception $e) {
        return response('Insert Faild', 400);
    }
})->middleware('R1');
Route::post('/discount/add', function (Request $request) {
    try {
        $data = $request->all();
        if ($data) {

            Db::table("Discount")->insert($data);
            return response('Insert Successfully', 200);
        } else {
            return response('Insert Faild', 400);
        }
    } catch (Exception $e) {
        return response('Insert Faild', 400);
    }
})->middleware('R12');
Route::post('/product/create', function (Request $request) {
    try {
        $data = $request->all();
        if ($data) {
            $data["CreatedDate"] = date('Y-m-d H:i:s');
            Db::table("Product")->insert($data);
            return response('Insert Successfully', 200);
        } else {
            return response('Insert Faild', 400);
        }
    } catch (Exception $e) {
        return response('Insert Faild', 400);
    }
})->middleware('R12');
Route::post('/ProductType/create', function (Request $request) {
    try {
        $data = $request->all();
        if ($data) {

            Db::table("ProductType")->insert($data);
            return response('Insert Successfully', 200);
        } else {
            return response('Insert Faild', 400);
        }
    } catch (Exception $e) {
        return response('Insert Faild', 400);
    }
})->middleware('R12');
Route::post('/news/add', function (Request $request) {
    try {
        $data = $request->all();
        if ($data) {
            Db::table("News")->insert($data);
            return response('Insert Successfully', 200);
        } else {
            return response('Insert Faild', 400);
        }
    } catch (Exception $e) {
        return response('Insert Faild', 400);
    }
})->middleware('R12');
Route::post('/store/create', function (Request $request) {
    try {
        $data = $request->all();
        if ($data) {

            Db::table("Store")->insert($data);
            return response('Insert Successfully', 200);
        } else {
            return response('Insert Faild', 400);
        }
    } catch (Exception $e) {
        return response('Insert Faild', 400);
    }
})->middleware('R1');
Route::post('/customer/checkEmail', function (Request $request) {
    try {
        $data = $request->all();

        $isEmail = Db::table("Customer")->where("Email", $data['Email'])->get();
        if (!$isEmail->isEmpty()) {
            return response('isEmail', 200);
        }
        return response('Not isEmail', 400);
    } catch (Exception $e) {
        return response('Not isEmail', 400);
    }
});
Route::post('/account/add', function (Request $request) {
    try {
        $data = $request->all();
        if ($data) {
            $data['password'] = Hash::make($data['password']);
            Db::table("Account")->insert($data);
            return response('Insert Successfully', 200);
        } else {
            return response('Insert Faild', 400);
        }
    } catch (Exception $e) {
        return response('Insert Faild', 400);
    }
})->middleware('R1');
Route::post('/supplier/add', function (Request $request) {
    try {
        $data = $request->all();
        if ($data) {

            Db::table("Supplier")->insert($data);
            return response('Insert Successfully', 200);
        } else {
            return response('Insert Faild', 400);
        }
    } catch (Exception $e) {
        return response('Insert Faild', 400);
    }
})->middleware('R1');
Route::post('/manager/create', function (Request $request) {
    try {
        $data = $request->all();
        if ($data) {

            Db::table("Manager")->insert($data);
            return response('Insert Successfully', 200);
        } else {
            return response('Insert Faild', 400);
        }
    } catch (Exception $e) {
        return response('Insert Faild', 400);
    }
})->middleware('R1');
Route::post('/employee/create', function (Request $request) {
    try {
        $data = $request->all();
        if ($data) {

            Db::table("Employee")->insert($data);
            return response('Insert Successfully', 200);
        } else {
            return response('Insert Faild', 400);
        }
    } catch (Exception $e) {
        return response('Insert Faild', 400);
    }
})->middleware('R1');
//HTTP[PUT]
Route::put('/customer/forgot/{email}', function ($email, Request $request) {
    try {
        $data = $request->all();
        if (!$email->isEmpty()) {
            $Customer = Db::table("Customer")->where("Email", $email)->get();
            if (!$Customer->isEmpty()) {

                Db::table("Customer")->where("Email", $email)
                    ->update([
                        'Password' => $data['NewPassword'],
                    ]);
                return response('Update Successfully', 200);
            }
            return response('Update Faild', 400);
        } else {
            return response('Update Faild', 400);
        }
    } catch (Exception $e) {
        return response('Update Faild', 400);
    }
});
Route::put('/customer/edit/{id}', function ($id, Request $request) {
    try {
        $data = $request->all();
        if ($id) {
            $Customer = Db::table("users")->where("Id", $id)->get();
            if (!$Customer->isEmpty()) {
                $customerEdit["Name"] = $data["Name"];
                $customerEdit["Email"] = $data["Email"];
                $customerEdit["Phone"] = $data["Phone"];
                $customerEdit["Address"] = $data["Address"];
                $customerEdit["Gender"] = $data["Gender"];
                Db::table("users")->where("Id", $id)->update($customerEdit);
                return response('Update Successfully', 200);
            }
            return response('Update Faild', 400);
        } else {
            return response('Update Faild', 400);
        }
    } catch (Exception $e) {
        return response('Update Faild', 400);
    }
})->middleware('R12');
Route::put('/store/update/{id}', function ($id, Request $request) {
    try {
        $data = $request->all();
        $ManagersWidth = Db::table("Store")->where("ManagerId", $data["ManagerId"])->get();
        if (count($ManagersWidth) > 0) {
            foreach ($ManagersWidth as $item) {
                Db::table("Store")->where("Id", $item->Id)->update(["ManagerId" => null]);
            }
        }
        if ($id) {
            $Customer = Db::table("Store")->where("Id", $id)->get();
            if (!$Customer->isEmpty()) {

                Db::table("Store")->where("Id", $id)->update($data);
                return response('Update Successfully', 200);
            }
            return response('Update Faild', 400);
        } else {
            return response('Update Faild', 400);
        }
    } catch (Exception $e) {
        return response('Update Faild', 400);
    }
})->middleware('R1');
Route::put('/news/edit/{id}', function ($id, Request $request) {
    try {
        $data = $request->all();
        if ($id) {
            $News = Db::table("News")->where("Id", $id)->get();
            if (!$News->isEmpty()) {

                Db::table("News")->where("Id", $id)->update($data);
                return response('Update Successfully', 200);
            }
            return response('Update Faild', 400);
        } else {
            return response('Update Faild', 400);
        }
    } catch (Exception $e) {
        return response('Update Faild', 400);
    }
})->middleware('R12');
Route::put('/role/edit/{id}', function ($id, Request $request) {
    try {
        $data = $request->all();
        if ($id) {
            $News = Db::table("Role")->where("Id", $id)->get();
            if (!$News->isEmpty()) {

                Db::table("Role")->where("Id", $id)->update($data);
                return response('Update Successfully', 200);
            }
            return response('Update Faild', 400);
        } else {
            return response('Update Faild', 400);
        }
    } catch (Exception $e) {
        return response('Update Faild', 400);
    }
})->middleware('R1');
Route::put('/ProductType/update/{id}', function ($id, Request $request) {
    try {
        $data = $request->all();
        if ($id) {
            $News = Db::table("ProductType")->where("Id", $id)->get();
            if (!$News->isEmpty()) {

                Db::table("ProductType")->where("Id", $id)->update($data);
                return response('Update Successfully', 200);
            }
            return response('Update Faild', 400);
        } else {
            return response('Update Faild', 400);
        }
    } catch (Exception $e) {
        return response('Update Faild', 400);
    }
})->middleware('R12');
Route::put('/product/update/{id}', function ($id, Request $request) {
    try {
        $data = $request->all();
        if ($id) {
            $News = Db::table("Product")->where("Id", $id)->get();
            if (!$News->isEmpty()) {

                Db::table("Product")->where("Id", $id)->update($data);
                return response('Update Successfully', 200);
            }
            return response('Update Faild', 400);
        } else {
            return response('Update Faild', 400);
        }
    } catch (Exception $e) {
        return response('Update Faild', 400);
    }
})->middleware('R12');
Route::put('/account/edit/{id}', function ($id, Request $request) {
    try {
        $data = $request->all();
        if ($id) {
            $News = Db::table("Account")->where("Id", $id)->get();
            if (!$News->isEmpty()) {

                Db::table("Account")->where("Id", $id)->update($data);
                return response('Update Successfully', 200);
            }
            return response('Update Faild', 400);
        } else {
            return response('Update Faild', 400);
        }
    } catch (Exception $e) {
        return response('Update Faild', 400);
    }
})->middleware('R1');
Route::put('/manager/update/{id}', function ($id, Request $request) {
    try {
        $data = $request->all();
        if ($id) {
            $News = Db::table("Manager")->where("Id", $id)->get();
            if (!$News->isEmpty()) {

                Db::table("Manager")->where("Id", $id)->update($data);
                return response('Update Successfully', 200);
            }
            return response('Update Faild', 400);
        } else {
            return response('Update Faild', 400);
        }
    } catch (Exception $e) {
        return response('Update Faild', 400);
    }
})->middleware('R1');
Route::put('/employee/update/{id}', function ($id, Request $request) {
    try {
        $data = $request->all();
        if ($id) {
            $News = Db::table("Employee")->where("Id", $id)->get();
            if (!$News->isEmpty()) {

                Db::table("Employee")->where("Id", $id)->update($data);
                return response('Update Successfully', 200);
            }
            return response('Update Faild', 400);
        } else {
            return response('Update Faild', 400);
        }
    } catch (Exception $e) {
        return response('Update Faild', 400);
    }
})->middleware('R12');
Route::put('/discount/edit/{id}', function ($id, Request $request) {
    try {
        $data = $request->all();
        if ($id) {
            $News = Db::table("Discount")->where("Id", $id)->get();
            if (!$News->isEmpty()) {

                Db::table("Discount")->where("Id", $id)->update($data);
                return response('Update Successfully', 200);
            }
            return response('Update Faild', 400);
        } else {
            return response('Update Faild', 400);
        }
    } catch (Exception $e) {
        return response('Update Faild', 400);
    }
})->middleware('R12');
Route::put('/supplier/edit/{id}', function ($id, Request $request) {
    try {
        $data = $request->all();
        if ($id) {
            $News = Db::table("Supplier")->where("Id", $id)->get();
            if (!$News->isEmpty()) {

                Db::table("Supplier")->where("Id", $id)->update($data);
                return response('Update Successfully', 200);
            }
            return response('Update Faild', 400);
        } else {
            return response('Update Faild', 400);
        }
    } catch (Exception $e) {
        return response('Update Faild', 400);
    }
})->middleware('R1');
Route::put('/bill/delivery/{id}', function ($id) {
    try {
        if ($id) {
            $News = Db::table("Bill")->where("Id", $id)->get();
            if ($News) {

                Db::table("Bill")->where("Id", $id)->update(['Status' => 'Đã thanh toán', 'Validated' => 1]);
                return response('Update Successfully', 200);
            }
            return response('Update Faild', 400);
        } else {
            return response('Update Faild', 400);
        }
    } catch (Exception $e) {
        return response('Update Faild', 400);
    }
})->middleware('R14');
Route::put('/bill/undelivery/{id}', function ($id) {
    try {
        if ($id) {
            $News = Db::table("Bill")->where("Id", $id)->first();
            if ($News) {
                if ($News->Validated != 1) {
                    Db::table("Bill")->where("Id", $id)->update(['Status' => 'Đã Bị hủy đơn', 'Validated' => 0]);
                    return response('Update Successfully', 200);
                }

                return response('Update Faild', 400);
            }
            return response('Update Faild', 400);
        } else {
            return response('Update Faild', 400);
        }
    } catch (Exception $e) {

        return response('Update Faild', 400);
    }
})->middleware('R1234');
//HTTP[DELETE]
Route::delete('/role/delete/{id}', function ($id) {
    try {

        if ($id) {
            Db::table("Role")->where("Id", $id)->delete();
            return response("success", 200);
        }
        return response("faild", 400);
    } catch (Exception $e) {
        return response("faild", 400);
    }
})->middleware('R1');
Route::delete('/store/delete/{id}', function ($id) {
    try {

        if ($id) {
            Db::table("Store")->where("Id", $id)->delete();
            return response("success", 200);
        }
        return response("faild", 400);
    } catch (Exception $e) {
        return response("faild", 400);
    }
})->middleware('R1');
Route::delete('/account/delete/{id}', function ($id) {
    try {

        if ($id) {
            Db::table("Account")->where("Id", $id)->delete();
            return response("success", 200);
        }
        return response("faild", 400);
    } catch (Exception $e) {
        return response("faild", 400);
    }
})->middleware('R1');
Route::delete('/customer/delete/{id}', function ($id) {
    try {

        if ($id) {
            Db::table("users")->where("Id", $id)->delete();
            return response("success", 200);
        }
        return response("faild", 400);
    } catch (Exception $e) {
        return response("faild", 400);
    }
})->middleware('R1');
Route::delete('/manager/delete/{id}', function ($id) {
    try {

        if ($id) {
            Db::table("Manager")->where("Id", $id)->delete();
            return response("success", 200);
        }
        return response("faild", 400);
    } catch (Exception $e) {
        return response("faild", 400);
    }
})->middleware('R1');
Route::delete('/employee/delete/{id}', function ($id) {
    try {

        if ($id) {
            Db::table("Employee")->where("Id", $id)->delete();
            return response("success", 200);
        }
        return response("faild", 400);
    } catch (Exception $e) {
        return response("faild", 400);
    }
})->middleware('R1');
Route::delete('/supplier/delete/{id}', function ($id) {
    try {

        if ($id) {
            Db::table("Supplier")->where("Id", $id)->delete();
            return response("success", 200);
        }
        return response("faild", 400);
    } catch (Exception $e) {
        return response("faild", 400);
    }
})->middleware('R1');
Route::delete('/product/delete/{id}', function ($id) {
    try {

        if ($id) {
            Db::table("Product")->where("Id", $id)->delete();
            return response("success", 200);
        }
        return response("faild", 400);
    } catch (Exception $e) {
        return response("faild", 400);
    }
})->middleware('R12');
Route::delete('/discount/delete/{id}', function ($id) {
    try {

        if ($id) {
            Db::table("Discount")->where("Id", $id)->delete();
            return response("success", 200);
        }
        return response("faild", 400);
    } catch (Exception $e) {
        return response("faild", 400);
    }
})->middleware('R12');
Route::delete('/news/delete/{id}', function ($id) {
    try {

        if ($id) {
            Db::table("News")->where("Id", $id)->delete();
            return response("success", 200);
        }
        return response("faild", 400);
    } catch (Exception $e) {
        return response("faild", 400);
    }
})->middleware('R12');
Route::delete('/ProductType/delete/{id}', function ($id) {
    try {

        if ($id) {
            Db::table("ProductType")->where("Id", $id)->delete();
            return response("success", 200);
        }
        return response("faild", 400);
    } catch (Exception $e) {
        return response("faild", 400);
    }
})->middleware('R12');

//===================LOGIN=========================
Route::post('/customer/login', "AuthController@login");
Route::post('/customer/signup', "SignUp@create");
Route::post('/admin/login', "AdminLogin@login");

//===================EXPORT=========================
Route::get('/billex/revenue/year/{year}',  function ($year) {

    return Excel::download(new ExportExcel($year), 'Doanhthu.xlsx');
})->middleware('R12');
Route::get('/billex/revenue/month/{month}',  function ($month) {
    $DATE = explode('-', $month);

    return Excel::download(new ExportExcelMonth($DATE[0], $DATE[1]), 'Doanhthu.xlsx');
})->middleware('R12');
Route::get('/billex/revenue/date/{date}',  function ($date) {
    $DATE = explode('-', $date);
    return Excel::download(new ExportExcelDate($DATE[0], $DATE[1], $DATE[2]), 'Doanhthu.xlsx');
})->middleware('R12');

