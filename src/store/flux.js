const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            apiURL: 'http://127.0.0.1:5000',
            currentUser: null,
            username: '',
            password: ''
        },
        actions: {
            handleChange: e => {
                const { name, value } = e.target
                setStore({
                    [name]: value
                })
            },
            handleSubmitLogin: (e, toast, navigate) => {
                e.preventDefault()
                const { username, password } = getStore();
                const { login } = getActions();
                login({ username, password }, toast, navigate);
            },
            login: async (credentials, toast, navigate) => {
                try {
                    const { apiURL } = getStore();

                    const response = await fetch(`${apiURL}/login`,
                        {
                            method: 'POST',
                            body: JSON.stringify(credentials),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })

                    //console.log(response)
                    const data = await response.json()

                    setStore({
                        currentUser: data,
                        username: '',
                        password: ''
                    });
                    sessionStorage.setItem('currentUser', JSON.stringify(data));

                    navigate('/dashboard')

                } catch (error) {
                    console.log(error.message)
                }
            },
            logout: () => {
                setStore({
                    currentUser: null
                })
                sessionStorage.removeItem('currentUser')
            },
            checkUser: () => {
                if(sessionStorage.getItem('currentUser')){
                    setStore({
                        currentUser: JSON.parse(sessionStorage.getItem('currentUser'))
                    })
                }
            }
        }
    }
}

export default getState;