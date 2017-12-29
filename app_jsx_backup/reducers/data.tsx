const DEFAULT_PAGES_STATE = {ids: [], fetching: false};

const DEFAULT_PAGINATION_STATE = {
    pages: {},
    currentPage: 1,
    pageSize: 10
};


export default function data(modelType) {
    return function (state = {
        byId: {},
        pagination: DEFAULT_PAGINATION_STATE,
        getAll() {
            let dataIds = Object.keys(this.byId);
            return dataIds.map((id) => this.byId[id]);
        },
        getPage(pageNumber) {
            return this.pagination.pages[pageNumber] || DEFAULT_PAGES_STATE;
        },
        getDataByIds(ids) {
            let data = [];
            ids.forEach((id) => {
                let d = this.byId[id];
                if(d) data.push(d);
            });
            return data;
        }
    }, action) {

        let payload = action.payload;

        if (!payload) {
            return state;
        }

        let payloadData = payload.data;

        switch (action.type) {

            case (modelType + "_LOAD_DATA"): {
                payloadData.forEach((d) => {
                    state['byId'][d.id] = d;
                });
                return {...state};
            }

            case (modelType + "_REQUEST_PAGE"): {
                state['pagination']['pages'][payload.pageNumber] = {ids: [], fetching: true};
                return {...state};
            }

            case (modelType + "_RECEIVE_PAGE"): {
                state['pagination']['pages'][payload.pageNumber] = {ids: payloadData, fetching: false};
                return {...state};
            }

            case (modelType + "_UPDATE_DATA_ITEM"): {
                state['byId'][payloadData.id] = payloadData;
                return {...state};
            }

            case (modelType + "_DELETE_DATA_ITEM"): {
                delete state['byId'][payloadData.id];
                return {...state};
            }


        }

        return state;
    };
}