(function() {
    'use strict';

    var initResizer = function(leftPane, rightPane, resizer)
    {
        var isResizing = false;
        var startX;
        var startLeftWidth;
        var startRightWidth;
        
        resizer.addEventListener('mousedown', function(e) {
            isResizing = true;
            startX = e.pageX;
            startLeftWidth = leftPane.getBoundingClientRect().width;
            startRightWidth = rightPane.getBoundingClientRect().width;
            resizer.classList.add('resizing');
            document.body.style.userSelect = 'none'; // Prevent text selection during resize
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isResizing) return;
            
            var dx = e.pageX - startX;
            var newLeftWidth = startLeftWidth + dx;
            var newRightWidth = startRightWidth - dx;
            
            // Prevent panes from becoming too small
            if (newLeftWidth > 200 && newRightWidth > 200) {
                leftPane.style.width = newLeftWidth + 'px';
                rightPane.style.width = newRightWidth + 'px';
            }
        });
        
        document.addEventListener('mouseup', function() {
            if (isResizing) {
                isResizing = false;
                resizer.classList.remove('resizing');
                document.body.style.userSelect = '';
            }
        });
    };

    window.initThreePanesResizer = initResizer;
}());
