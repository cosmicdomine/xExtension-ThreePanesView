(function() {
    'use strict';

    /**
     * Initialize the manual resizing functionality for the three panes view
     * @param {HTMLElement} leftPane - The left pane element (stream)
     * @param {HTMLElement} rightPane - The right pane element (threepanesview)
     * @param {HTMLElement} resizer - The resizer element
     */
    window.initThreePanesResizer = function(leftPane, rightPane, resizer) {
        let isResizing = false;
        let startX;
        let startLeftWidth;
        let startRightWidth;
        
        resizer.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.pageX;
            startLeftWidth = leftPane.getBoundingClientRect().width;
            startRightWidth = rightPane.getBoundingClientRect().width;
            resizer.classList.add('resizing');
            document.body.style.userSelect = 'none'; // Prevent text selection during resize
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            
            const dx = e.pageX - startX;
            const newLeftWidth = startLeftWidth + dx;
            const newRightWidth = startRightWidth - dx;
            
            // Prevent panes from becoming too small
            if (newLeftWidth > 200 && newRightWidth > 200) {
                leftPane.style.width = `${newLeftWidth}px`;
                rightPane.style.width = `${newRightWidth}px`;
            }
        });
        
        document.addEventListener('mouseup', () => {
            if (isResizing) {
                isResizing = false;
                resizer.classList.remove('resizing');
                document.body.style.userSelect = '';
            }
        });
    };
}());
