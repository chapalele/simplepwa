// Get references to the input elements
const appleInput = document.getElementById('apple');
const windowsInput = document.getElementById('windows');
const buttons = document.querySelectorAll('button');

appleInput.addEventListener('change', updateWindows);
appleInput.addEventListener('blur', updateWindows);

windowsInput.addEventListener('change', updateApple);
windowsInput.addEventListener('blur', updateApple);

function updateWindows() {
    let smbLink = appleInput.value;
    const windowsLink = removeProtocol(smbLink.replace(/\//g, '\\'));
    windowsInput.value = windowsLink;
}

function updateApple() {
    const windowsLink = windowsInput.value;
    const smbLink = windowsLink.replace(/\\/g, '/');
    appleInput.value = smbLink;
}

function removeProtocol(link) {
    if (link.startsWith('smb:') || link.startsWith('afp:') || link.startsWith('cifs:')) {
        return link.substring(link.indexOf(':') + 1);
    }
    return link;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const input = button.previousElementSibling;
        const value = input.value;
        if (navigator && navigator.clipboard) {
            navigator.clipboard.writeText(value)
                .then(() => {
                    alert('Copied to clipboard');
                })
                .catch(error => {
                    console.error('Failed to copy to clipboard:', error);
                });
        } else {
            console.error('Clipboard API not available');
        }
    });
});







