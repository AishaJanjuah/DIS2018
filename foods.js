$(document).ready(() => {
        const foodList = $("#foodlist");

        //Denne metode skal hente alle madvarerne
        SDK.Food.getFoods((err, data) => {
            let foods = JSON.parse(SDK.Encryption.encryptDecrypt(data));
            foods.forEach(food => {
                foodList.append(`
    <tr>
    <td>${food.productName}</td>       
    <td>${food.productPrice}</td>
    <td><input type="date" class="form-control" id="inputDate" placeholder="date"></td>
    <td><button class="btn btn-success orderbutton" data-order-id="${food.id}">Buy</button></td>
    </tr>
    `)
            });

            $(".orderbutton").click(function () {
                const date = $("#inputDate").val();
                SDK.Order.orderProduct(date, (err, data) => {
                    if (err && err.xhr.status === 401) {
                        $(".form-group").addClass("has-error");

                    }

                    else if (err) {
                        window.alert("Something went wrong - please try again")

                    } else {
                        window.alert("Your Order Is Confirmed")
                    }

                });
            })
        })
    })