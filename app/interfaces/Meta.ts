export interface MetaResourceProps {
    name: string,
    type: string,
    label: string,
    stringify: string,
    gridHeaders: Array<string>,
    attributes: Array<MetaAttributeProps>,
    actions: Array<MetaActionProps>,
    staticActions: Array<MetaActionProps>
}

export interface MetaAttributeProps {
    name: string,
    label: string,
    type: string,
    validations: MetaValidationProps,
    autoPk: boolean
}

export interface MetaValidationProps {
    size: {
        min: number,
        max: number
    },
    mandatory: {
        value: boolean
    }
}

export interface MetaActionProps {
    name: string,
    pathName: string,
    methodType: string,
    label: string,
    staticMethod: boolean,
    arguments: Array<MetaArgumentProps>
}

export interface MetaArgumentProps {
    name: string,
    label: string,
    type: string
}

export interface MetaStoreProps {
    loaded: boolean,
    types: {
        [key: string]: MetaResourceProps
    }
}

// export interface ModelMetaStoreActionProps {
//     type: string,
//     payload: Array<MetaResource>
// }