 import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cities:[
        {name: 'New York', country: 'USA'},
        {name: 'Los Angeles', country: 'USA'},
        {name: 'San Francisco', country: 'USA'},
        {name: 'Paris', country: 'France'},
        {name: 'Marseille', country: 'France'},
        {name: 'Madrid', country: 'Spain'},
        {name: 'Barcelona', country: 'Spain'},
        {name: 'Berlin', country: 'Germany'},
    ],
    hotels:[
        {
            name: ' La Maison des Vendangeurs',
            city: 'Paris',
            country: 'France',
        },
        {
            name: 'Arlo Soho',
            city: 'New York',
            country: 'USA',
        },
        {
            name: 'The Bowery Hotel',
            city: 'New York',
            country: 'USA',

        },
        {
            name: 'The Standard, High Line',
            city: 'New York',
            country: 'USA',
        },
        { 
            name: " SLEEP'N Atocha ",
            city: 'Madrid',
            country: 'Spain',
        },
        {
            name: "Only YOU Hotel Atocha",
            city: 'Madrid',
            country: 'Spain',
        },
        {
            name:'Andante Hotel',
            city: 'Barcelona',
            country: 'Spain',
        },
        {
            name: 'Hotel 1898',
            city: 'Barcelona',
            country: 'Spain',
        }
    ]

}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {}
})

export default searchSlice.reducer;