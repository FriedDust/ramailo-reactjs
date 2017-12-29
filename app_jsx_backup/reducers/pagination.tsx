interface Action {
    type: string
}

export default function pagination(state: object = {
    test: 123
}, action: Action) {

    switch (action.type) {

        case "REQUEST_PAGE_1": {
            console.log("hello");
        }

        case "RECEIVE_PAGE_2": {
            console.log("hello");
        }

    }


    return state;

};
