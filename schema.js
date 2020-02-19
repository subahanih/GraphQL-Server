const axios = require('axios')
const { GraphQLObjectType, 
    GraphQLString, 
    GraphQLList, 
    GraphQLSchema,
    GraphQLInt
} = require('graphql')

// This PersonType will be the Object of a single person.
const PersonType = new GraphQLObjectType({
    name: 'Person',
    fields: () => ({
        name: { type: GraphQLString },
        height: { type: GraphQLString },
        mass: { type: GraphQLString },
        hair_color: { type: GraphQLString },
        skin_color: { type: GraphQLString },
        eye_color: { type: GraphQLString },
        birth_year: { type: GraphQLString },
        gender: { type: GraphQLString }
    })
})

// This PeopleType will be the Object of a list of Person.
const PeopleType = new GraphQLObjectType({
    name: 'People',
    fields: () => ({
        count: { type: GraphQLString },
        next: { type: GraphQLString },
        previous: { type: GraphQLString },
        results: { type: new GraphQLList(PersonType) }
    })
})

// This PlanetType will be the Object of a planet.
const PlanetType = new GraphQLObjectType({
    name: 'Planet',
    fields: () => ({
        name: { type: GraphQLString },
        rotation_period: { type: GraphQLString },
        orbital_period: { type: GraphQLString },
        diameter: { type: GraphQLString },
        climate: { type: GraphQLString },
        gravity: { type: GraphQLString },
        terrain: { type: GraphQLString },
        surface_water: { type: GraphQLString },
        population: { type: GraphQLString }
    })
})

// This PlanetsType will be the Object of a list of planet.
const PlanetsType = new GraphQLObjectType({
    name: 'Planets',
    fields: () => ({
        count: { type: GraphQLString },
        next: { type: GraphQLString },
        previous: { type: GraphQLString },
        results: { type: new GraphQLList(PlanetType) }
    })
})

// This RootQueryType contains queries such as person(id), people, planet(id) & planets.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        people: {
            type: PeopleType,
            args: { pageNumber: {type: GraphQLInt}},
            async resolve(_, args) {
                return axios.get(`https://swapi.co/api/people/?page=${args.pageNumber}`)
                .then(response => response.data)
                .catch(error => console.log(error))
            }
        },
        planets: {
            type: PlanetsType,
            args: { pageNumber: {type: GraphQLInt}},
            resolve(_, args) {
                return axios.get(`https://swapi.co/api/planets/?page=${args.pageNumber}`)
                .then(response => response.data)
                .catch(error => console.log(error))
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})