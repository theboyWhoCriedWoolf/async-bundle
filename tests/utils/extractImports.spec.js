
import extractImports from '../../src/utils/extractImports';
import BundleLoadedComp from '../MockComponent';

describe('utils/extractImports', () => {
    test('should get a promise from babel-import', () => {
        const extractedComponent = extractImports([import('../MockComponent')]);
        expect(extractedComponent[0]).toBeInstanceOf(Promise);
    });

    test('should get a promise from babel-import function', () => {
        const extractedComponent = extractImports([() => import('../MockComponent')]);
        expect(extractedComponent[0]).toBeInstanceOf(Promise);
    });

    test('should get a promise from bundle-loader', () => {
        const mockBundleLoader = Object.defineProperty(cb => cb(BundleLoadedComp), 'arguments', {});
        const extractedComponent = extractImports([mockBundleLoader]);
        expect(extractedComponent[0]).toBeInstanceOf(Promise);
    });

    test('should load multiple files from array', () => {
        const comp = import('../MockComponent');
        const sagas = import('../MockComponent');
        const reducer = import('../MockComponent');

        const extractedComponent = extractImports([comp, sagas, reducer]);

        expect(extractedComponent[0]).toBeInstanceOf(Promise);
        expect(extractedComponent[1]).toBeInstanceOf(Promise);
        expect(extractedComponent[2]).toBeInstanceOf(Promise);
    });

    test('should load multiple files from object', () => {
        const comp = import('../MockComponent');
        const sagas = import('../MockComponent');
        const reducer = import('../MockComponent');

        const extractedComponent = extractImports({ comp, sagas, reducer });

        expect(extractedComponent[0]).toBeInstanceOf(Promise);
        expect(extractedComponent[1]).toBeInstanceOf(Promise);
        expect(extractedComponent[2]).toBeInstanceOf(Promise);
    });
});
