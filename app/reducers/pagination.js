export default function pagination(state = {
    test: 123
}, action) {

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
