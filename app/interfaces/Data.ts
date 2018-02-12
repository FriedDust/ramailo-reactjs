export interface DataStoreProps {
    loaded: boolean,
    byId: {
        [key: string]: {
            loaded: boolean,
            id: string
        }
    }
}

export interface DataResourceProps {
    [key: string]: any
}