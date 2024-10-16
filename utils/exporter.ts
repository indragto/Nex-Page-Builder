export const downloadAsJson = (jsonStr: string, filename: string = 'data.json') => {
    const blob: Blob = new Blob([jsonStr], { type: 'application/json' }); // Create a Blob with the JSON data
    const url: string = URL.createObjectURL(blob); // Create a URL for the Blob
    const link: HTMLAnchorElement = document.createElement('a'); // Create a temporary link element
    link.href = url;
    link.download = filename; // Set the file name
    document.body.appendChild(link); // Append the link to the document
    link.click(); // Programmatically click the link to trigger the download
    document.body.removeChild(link); // Remove the link from the document
    URL.revokeObjectURL(url); // Revoke the URL after the download is triggered
}  