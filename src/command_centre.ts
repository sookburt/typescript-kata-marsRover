

export function start() {

    const plateau = createPlateau(5, 5);

}

interface Plateau {
    x: number;
    y: number;
}
  
export function createPlateau( xSize: number, ySize: number) : Plateau {

    const plateau : Plateau = { x: xSize, y: ySize }; 

    return plateau;
}


