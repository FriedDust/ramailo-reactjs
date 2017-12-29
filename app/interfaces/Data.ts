export interface DataStoreProps {
    loaded: boolean,
    byId: {
        [key: string]: {}
    }
}

export interface DataResourceProps {
    [key: string]: any
}