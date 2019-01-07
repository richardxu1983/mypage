



var cons = [];
var builds = [];

class building
{ 
    constructor(data)
    { 
    	this.data = {};
    	this.data.id = data.id;
    	this.data.side = data.side;
    	this.data.block_idx = data.block_idx;
    	this.data.i = data.i;
    	this.data.j = data.j;
    	this.data.lv = 0;
    	this.data.pop = 0;
    	this.data.satisfy = false;
    	this.data.satisfy_time = 0;
    	this.data.hungry = 0;
    	this.data.noWorker = 0;
    	this.data.idx = 0;
    }


}



var conCtrl = 
{
	Build:function(block_idx,cell_i,cell_j,side,id)
	{
		const $mapCtrl = require('../../mlGame/core/map.js').default.mapCtrl;
		const $mapView = require('../../mlGame/view/mapView.js').default.mapView;

		let m = $mapCtrl.getBlockByIdx(block_idx);

		if(m.data.ownBy!=side)
			return -1;

		let cell = m.data.cells[cell_i*m.data.width+cell_j];

		if(cell.data.build!=-1)
    		return -2;

    	if(builds[side]==undefined)
    		builds[side]=[];

		let b = new building({'id':id,'side':side,'block_idx':block_idx,'i':cell_i,'j':cell_j});
		builds[side].push(b);


		let idx = builds[side].length-1;

		builds[side][idx].data.idx = idx;
		cell.data.build = idx;

		$mapView.renderCell(block_idx,cell_i,cell_j);

		return 0;
	},

	getBuild(s,idx)
	{
		return builds[s][idx];
	},

	BuildConForce:function(x,y,id,side)
	{

	},

	afterBuild(x,y,id,side)
	{

	},

	canBuild(x,y,id,side)
	{

	},

	getConByIdx(idx)
	{
		return cons[idx];
	},
};

export default { conCtrl,builds }; 