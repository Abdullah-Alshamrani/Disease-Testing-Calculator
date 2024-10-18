// Developer: Abdullah Alshamrani
// 10/17/2024


// Function to show/hide the code
function showCode(id) {
    const codeElement = document.getElementById(id);
    codeElement.style.display = (codeElement.style.display === 'none') ? 'block' : 'none';
}

// Function to copy the code to the clipboard
function copyCode(id) {
    const codeElement = document.getElementById(id);
    const text = codeElement.innerText;

    // Create a temporary textarea element to copy from
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);

    alert('Code copied to clipboard!');
}
