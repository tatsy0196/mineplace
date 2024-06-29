class User {

    static async login(pseudo, password) {

        let result = await axios.post('http://localhost:3002/api/users/login', 
            {pseudo, password}, { 
                headers: {
                    'Content-Type' : 'application/json'
                },
                withCredentials: false
            });

            
        

        console.log(result.headers);

    }

}