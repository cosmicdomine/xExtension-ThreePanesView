<?php
class ThreePanesViewExtension extends Minz_Extension {
	public function init() {
		Minz_View::appendScript($this->getFileUrl('resizer.js', 'js'));
		Minz_View::appendScript($this->getFileUrl('threepanesview.js', 'js'));
		Minz_View::appendStyle($this->getFileUrl('threepanesview.css', 'css'));
	}
}