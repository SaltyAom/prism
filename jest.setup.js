import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

/* Mock jest dynamic */
jest.mock('next/dynamic', () => () => {
    const LoadableComponent = () => null
    LoadableComponent.displayName = 'LoadableComponent'
    LoadableComponent.preload = jest.fn()
    return LoadableComponent;
});