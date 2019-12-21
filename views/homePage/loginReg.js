let loginRegObj = {
    display: function(){
        controller.clearScreen();
        controller.loginRegStrand.style.display = "flex";
    },

    register: function(){
        event.preventDefault();

        let newUser = {
            username: document.querySelector("#nameReg").value,
            email: document.querySelector("#emailReg").value,
            password: document.querySelector("#passReg").value,
            confirmPassword: document.querySelector("#confirmPassReg").value
        }

        if(validator.user.all(newUser) && validator.user.confirmPassword(newUser.password, newUser.confirmPassword)){
            let body = document.querySelector("body");

            let form = document.createElement("form");
            form.action = "/register";
            form.method = "post";
            body.appendChild(form);

            let hidden = document.createElement("input");
            hidden.type = "hidden";
            hidden.name = "user";
            hidden.value = JSON.stringify(newUser);
            form.appendChild(hidden);

            form.submit();
        }
    },

    login: function(){
        event.preventDefault();
        
        let loginer = {
            email: document.querySelector("#emailLog").value,
            password: document.querySelector("#passLog").value
        }

        let body = document.querySelector("body");

        let form = document.createElement("form");
        form.action = "/login";
        form.method = "post";
        body.appendChild(form);

        let hidden = document.createElement("input");
        hidden.type = "hidden";
        hidden.name = "user";
        hidden.value = JSON.stringify(loginer);
        form.appendChild(hidden);

        form.submit();
    }
}