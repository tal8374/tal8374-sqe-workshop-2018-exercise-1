import {bodyDeclaration} from './body-declaration-handler';

function facadeDeclarationHandler(parsedCode) {
    var handler = new bodyDeclaration(parsedCode.body, null, 1);

    handler.init();
}

export {facadeDeclarationHandler};