<template>
	<div v-if="dt.cnt==2">
		<div v-for="(item,index) in kc.lvls" :key="index" class="left cell">
			<div v-if="cellStatus(index+1)==0" class="kcCell taken">
				<div>第{{index+1}}层：已占领</div>
			</div>
			<div v-else-if="cellStatus(index+1)==1" class="kcCell active">
				<div>第{{index+1}}层：未占领</div><p>
				<div>守卫：{{npcName(item.npc)}}</div>
			</div>
			<div v-else class="kcCell disable">
				<div>第{{index+1}}层：未占领</div><p>
				<div>守卫：{{npcName(item.npc)}}</div>
			</div>
		</div>
	</div>
</template>

<script>
import sdt from '../../mlGame/data/scene.js'
import kk from '../../mlGame/data/kuangchang.js'
import ktrl from '../../mlGame/core/kuangchang.js'
import untCtrl from '../../mlGame/core/unit.js'
var $kc = kk.kc;
var $kctrl = ktrl.kcCtrl;
var $unitCtrl = untCtrl.unitCtrl;

export default {
	name:"vkuangchang",
	data:function()
	{
		return{
			dt:sdt.dt,
			kc:$kc,
		}
	},
	computed:{
	},
	methods:
	{
		cellStatus:function(n)
		{
			if(n<$kctrl.at())
			{
				return 0;
			}
			else if(n==$kctrl.at())
			{
				return 1;
			}
			else
			{
				return 2;
			}
		},

		npcName:function(id)
		{
			return $unitCtrl.npcName(id);
		}
	}
}

</script>


<style lang="scss" scoped>

	.left{
		float: left;
	}

	.cell{
		width: 14em;
		height: 5em;
		border: solid 1px black;
		margin-right: .5em;
		margin-bottom: .5em;
	}
	
	.kcCell{
		height: 100%;
		width:100%;
		padding: .7em .5em 0 .5em;
		box-sizing: border-box;
		font-size: .7em;
	}

	.taken{
		background-color: white;
		color:black;		
	}

	.active{
		background-color: blue;
		color:white;		
	}

	.disable{
		background-color: gray;
		color:black;		
	}

</style>