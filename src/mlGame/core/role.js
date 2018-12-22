
const $dft = require('../../mlGame/data/gData.js').default.dft;
const $prop = require('../../mlGame/core/propCtrl.js').default.propCtrl;
const side = $dft.plySide

var ui =  
{
    pnl:false,
}

class _role
{ 
    constructor()
    { 

    }

    side()
    {
        return side;
    }

    gold(v)
    {
        let p = $prop.get(side);
        return p.gold();
    }

    wood()
    {
        return $prop.getV(side,'wood');
    }

    stone()
    {
        return $prop.getV(side,'stone');
    }

    iron()
    {
        return $prop.getV(side,'iron');
    }

    food()
    {
        return $prop.getV(side,'food');
    }

    pop()
    {
        return $prop.getV(side,'pop');
    }

    block()
    {
        return $prop.getV(side,'block');
    }

    maxBlock()
    {
        return $prop.getV(side,'maxBlock');
    }

    new()
    {

    }

    save()
    {

    }

    load()
    {

    }
}

var role = new _role();

export default { role,ui};