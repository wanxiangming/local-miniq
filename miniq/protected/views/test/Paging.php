

<ul>
	<?php foreach($categoryInfo as $item): ?>

	<li>
		<div>
			<?php echo $item->content ?>
		</div>
	</li>

	<?php endforeach; ?>
</ul>

<div>
	<?php 
		$this->widget('CLinkPager',array(
				'pages'=>$pages,
				'maxButtonCount'=>10,
				'firstPageLabel'=>'首页',
				'nextPageLabel'=>'下一页',
				'prevPageLabel'=>'上一页',
				'lastPageLabel'=>'末页'
			))
	?>
</div>

