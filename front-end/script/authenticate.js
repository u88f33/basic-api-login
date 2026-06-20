const loginForm = document.getElementById( "loginForm" );
const registerForm = document.getElementById( "registerForm" );
const API_URL = "http://localhost:8010/api/students";

console.log( loginForm );
console.log( registerForm );

if ( registerForm ) {

    registerForm.addEventListener(
        "submit",
        async (e) => {
            e.preventDefault();

            let userName = document.getElementById( "registerName" ).value;
            let userEmail = document.getElementById( "registerEmail" ).value;
            let userPassword = document.getElementById( "registerPassword" ).value

            let formDataJSONFormat = {
                userName, 
                userEmail, 
                userPassword
            };

            console.log( formDataJSONFormat );

            try {
                
                const response = await fetch( `${ API_URL }/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify( formDataJSONFormat )
                } );

                

                if ( response.ok ) {
                    window.location.href = "index.html";
                }


            } catch ( err ) {
                console.log( `Error: ${err}` ); 
            }

        }
    )    
}

if ( loginForm ) {

    loginForm.addEventListener(
    "submit",
    async (e) => {
        e.preventDefault();

        let userName = document.getElementById( "loginName" ).value;
        let userPassword = document.getElementById( "loginPassword" ).value;
        
        const formDataJSONFormat = {
            userName, userPassword
        };

        try {
                
            const response = await fetch( `${ API_URL }/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify( formDataJSONFormat )
            } );

            

            if ( response.ok ) {
                window.location.href = "index.html";
            }

            const result = await response.json();
            const token = result.token
            localStorage.setItem( "token", token );

            window.location.href = "student.html";

        } catch ( err ) {
            console.log( `Error: ${err}` ); 
        }  
    })
}

function logout() {
    localStorage.removeItem( "token" );
    window.location.href = "index.html";
}