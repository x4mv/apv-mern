const generarToken = () => {
    
    const random = Date.now().toString(32) + Math.random().toString(32).substring(2);
    return random;
}

export {
    generarToken
}