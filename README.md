# backofficeBenNuxt

> My breathtaking Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).


Structure BDD 
Users : [
    {
        id: 2
        created: "30-11--0001 00:00:00"
        email: "ulysse.hallll@gmail.com"
        firstname: "ulysse"
        lastname: "hall"
        house: "oooo"
    }
]

Houses : [
    {
        id: 2
        created: "30-11--0001 00:00:00"
        name: "chezmoi"
        users: [
            {
                id: 2
                created: "30-11--0001 00:00:00"
                email: "ulysse.hallll@gmail.com"
                firstname: "ulysse"
                lastname: "hall"
                house: "oooo"
            }
        ]
    }
]


# avancée 

-----  A FAIRE ------ 

pb avec email/application vide localstorage
entrée appli via login (actuellement .../login)
pagination : not working for house 


USERS
- edit house    - no call API existing
- add user      - non maj House + pb boutons redirection (annuler + creer)  -  no call API existing

HOUSES
- delete house      - no call API existing
- add house         - not working !!


---- FONCTIONNEL ----- 
LOGIN           - OK

SEARCH          - OK

PAGINATION      - choice of quantity ? 

USERS 
- get all users - OK
- delete user   - OK
- edit user     - OK 

HOUSES 
- get all houses    - OK
- delete house      - NO call api 
- send invitation   - OK


IMPROVEMENT 
--> route API alléger
 