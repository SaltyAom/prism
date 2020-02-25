import { ReactNode } from 'react'

import { render } from 'enzyme'

import MetadataProvider, { Metadata } from 'components/atoms/metadataProvider'

export const a = (element: any, attribute: string) =>
        element._root['0'].attribs[attribute],
    an = (element: any, attribute: string) =>
        element._root['0'].attribs[attribute],
    applyTheme = (element: ReactNode, theme: any) =>
        render(<Metadata.Provider value={theme}>{element}</Metadata.Provider>),
    applyAdaptive = (element: ReactNode) =>
        render(<MetadataProvider>{element}</MetadataProvider>)
