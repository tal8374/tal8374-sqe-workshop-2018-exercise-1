import {bodyDeclarationHandler} from './body-declaration-handler';

function facadeDeclarationHandler(parsedCode) {
    bodyDeclarationHandler(parsedCode.body);
}

export {facadeDeclarationHandler};