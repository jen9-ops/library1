function handleError(error, executionTime) {
    const contentElement = document.createElement('div');
    contentElement.innerHTML = `
        <p><strong>Ошибка:</strong> ${error.message}</p>
        <p><strong>Время выполнения:</strong> ${executionTime} мс</p>
        <p><strong>Детали:</strong> ${error.stack}</p>
    `;
    createDraggableResizableModal(contentElement, 'errorModal-' + Date.now(), 'error-style');
}



function createDraggableResizableModal(contentElement, modalId, modalClass = '') {
    // Create the modal div
    const modal = document.createElement('div');
    modal.id = modalId;
    modal.className = `draggable-resizable-modal ${modalClass}`.trim();
    
    // Basic styles for the modal
    Object.assign(modal.style, {
        position: 'absolute',
        top: '50px', // Initial position
        left: '50px', // Initial position
        width: '400px', // Initial width
        height: '300px', // Initial height
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        padding: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        zIndex: '100',
        resize: 'both', // Allow resizing (horizontal, vertical, or both)
        overflow: 'auto', // Enable scrolling if content overflows
        cursor: 'move' // Cursor for dragging
    });

    // Make it adaptive (responsive) via CSS class or media queries
    // Note: For full adaptivity, add CSS rules externally, e.g., via stylesheet
    // Example: max-width: 100%; for mobile responsiveness

    // Append the content element (e.g., for errors, execution time, details)
    modal.appendChild(contentElement);

    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy';
    copyButton.style.margin = '5px';
    copyButton.onclick = function() {
        const textToCopy = contentElement.innerText || contentElement.textContent;
        navigator.clipboard.writeText(textToCopy)
            .then(() => alert('Content copied to clipboard!'))
            .catch(err => console.error('Failed to copy: ', err));
    };
    modal.appendChild(copyButton);

    // Create close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.margin = '5px';
    closeButton.onclick = function() {
        modal.remove();
    };
    modal.appendChild(closeButton);

    // Add draggable functionality
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    modal.addEventListener('mousedown', function(e) {
        if (e.target === modal) { // Only drag if clicking on the modal itself, not children
            isDragging = true;
            offsetX = e.clientX - modal.getBoundingClientRect().left;
            offsetY = e.clientY - modal.getBoundingClientRect().top;
            modal.style.cursor = 'grabbing';
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            modal.style.left = `${e.clientX - offsetX}px`;
            modal.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            modal.style.cursor = 'move';
        }
    });

    // Append modal to body
    document.body.appendChild(modal);

    // Return the modal for further manipulation if needed
    return modal;
}

// Example usage:
// const errorContent = document.createElement('div');
// errorContent.innerHTML = '<p>Error: Something went wrong</p><p>Execution time: 2.5s</p><p>Details: Stack trace here...</p>';
// createDraggableResizableModal(errorContent, 'errorModal', 'custom-class');
