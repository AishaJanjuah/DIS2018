const SDK = {
    serverURL: "http://localhost:8080/api/",
    request: (options, cb) => {

    let token = SDK.Storage.load("token");
//Ajax kald til serveren

$.ajax({
    url: SDK.serverURL + options.url,
    method: options.method,
    headers: {'Authorization': token}, //headers
    //contentType: "application/json;charset=utf-8",
    accept: "application/json",
    dataType: "json",
    data: JSON.stringify(options.data),
    success: (data, status, xhr) => {
    cb(null, data, status, xhr);
},
error: (xhr, status, errorThrown) => {
    cb({xhr: xhr, status: status, error: errorThrown});
}
});
},
//Log in og log ud funktionerne

User: {

    current: () => {
        return SDK.Storage.load("users");
    },


    logOut: () => {
        SDK.Storage.remove("token");
        window.location.href = "../login.html";


    },
    login: (username, password, cb) => {

        SDK.request({
            data: {
                username: username,
                password: password
            },
            url: "users/login/",
            method: "POST"

        }, (err, data) => {


            //On login-error
            if (err) return cb(err);
            console.log(SDK.Encryption.encryptDecrypt(data))
            SDK.Storage.persist("token", SDK.Encryption.encryptDecrypt(data));

            cb(null, data);


    });

    },
  //Oprette ny bruger
    createUser: (username, password, cb) => {
        SDK.request({
            data: {
                username: username,
                password: password,
            },
            url: "users/create/",
            method: "POST"
        }, (err, data) => {

            //on submit error
            if (err) return cb(err);

        SDK.Storage.persist("token", SDK.Encryption.encryptDecrypt(data));

        cb(null, data);
    }
    );
    },
},
/*see food and drink*/
Food: {
    getFoods: (cb) => {
        SDK.request({
            method: "GET",
            url: "food"
        }, (err, food) => {
            if (err) return cb(err);
        cb(null, food)
    }, cb);
    }
},

Drink: {
    getDrinks: (cb) => {
        SDK.request({
            method: "GET",
            url: "drink",
        }, (err, drink) => {
            if (err) return cb(err);
        cb(null, drink)
    }, cb);
    }
},



Order: {
    /*To make an order*/
    orderProduct: (date, cb) => {
        SDK.request({
                data: {
                    date: date,
                },
                method: "POST",
                url: "users/order/",
                Authorization: SDK.Storage.load('token')
            },
            (err, data) => {

            //On login-error
            if (err) return cb(err);
        cb(null, data);
    }
    );
    },

    /* To add productid to the order*/

    orderProductId: (id, products_id, order_id, cb) => {
        SDK.request({
                data: {
                    id: id,
                    products_id: products_id,
                    order_id: order_id,
                },
                method: "POST",
                url: "users/order/",
            },
            (err, data) => {


            //On login-error
            if (err) return cb(err);


        SDK.Storage.persist("token", SDK.Encryption.encryptDecrypt(data));


        cb(null, data);
    }
    );
    }
},

/*To incrypt the data, ex token*/

Encryption: {
    encryptDecrypt(input) {
        let key = ['L', 'O', 'L']; //encryption code
        let output = [];

        for (let i = 0; i < input.length; i++) {
            let charCode = input.charCodeAt(i) ^ key[i % key.length].charCodeAt(0);
            output.push(String.fromCharCode(charCode));
        }
        return output.join("");
    }

},
/*To load the same menu display on each side, expect homepage*/
loadNav: (cb) => {
    $("#nav-container").load("nav.html", () => {
        const currentUser = SDK.User.current();
    if (currentUser) {
        $(".navbar-right").html(`
      
      <li><a href="#" id="logout-link">Logout</a></li>
    `);
    } else {
        $(".navbar-right").html(`
      <li><a href="homepage.html">Logout <span class="sr-only">(current)</span></a></li>
    `);
    }
    $("#logout-link").click(() => SDK.User.logOut());
    cb && cb();
});
},

/*To store the token in localstorage*/
Storage: {
    prefix: "canteenSDK",
        persist:
    (key, value) => {
        window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
    },
    load:
        (key) => {
        const val = window.localStorage.getItem(SDK.Storage.prefix + key);
        try {
            return JSON.parse(val);
        }
        catch (e) {
            return val;
        }
    },
    remove:
        (key) => {
        window.localStorage.removeItem(SDK.Storage.prefix + key);
    }
}
};