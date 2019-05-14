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
USERS
- edit house    - NOT OK - no call API existing
- add user      - non maj House + pb boutons redirection (annuler + creer)  -  no call API existing

HOUSES
- delete house      - no call API existing
- join house        - 
- add house         - error 409


---- FONCTIONNEL ----- 

LOGIN           - OK

SEARCH          - OK

USERS 
- get all users - OK
- delete user   - OK
- edit user     - OK 

HOUSES 
- get all houses    - OK
- delete house      - 
- send invitation   - OK
- join house        - 
- send invitation   - OK

- LOCALSTORAGE : token

IMPROVEMENT 
--> search en composant ?
--> route API alléger