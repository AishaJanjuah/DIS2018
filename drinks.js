$(document).ready(() => {
    const drinkList = $("#drinklist");

    /*To print all the drink products*/
    SDK.Drink.getDrinks((err, data) => {
        let drinks = JSON.parse(SDK.Encryption.encryptDecrypt(data));

        drinks.forEach(drink => {
            drinkList.append(`
            <tr>
            <td>${drink.productName}</td>
            <td>${drink.productPrice}</td>
        <td><input type="date" class="form-control" id="inputDate" placeholder="date"></td>
                <td><button class="btn btn-success orderbutton" data-order-id="${drink.id}">Order</button></td>
            
            
            
            </tr>
             `)
        });

        $(".orderbutton").click(function () {
            const date = $("#inputDate").val();

            /*Takes the input from date and add to database*/

            SDK.Order.orderProduct(date, (err, data) => {
                if (err && err.xhr.status === 401) {
                    $(".form-group").addClass("has-error");

                }
                else if (err){
                window.alert("Something Went Wrong - Try Again!")

                } else {

                    window.alert("Your Order Is Confirmed");

                }
            });

        });
    });

});










