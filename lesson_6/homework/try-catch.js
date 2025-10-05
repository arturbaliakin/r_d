async function failTryCatch() {
    const firstResponse = ('https://jsonplaceholder.typicode.com/invalid-endpoint');
    const secondResponse = ('https://_jsonplaceholder.typicode.com/posts');

    try {
        const response = await fetch(firstResponse);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.status);
        }
        const data = await response.json();
        console.log('First response data:', data);
    } catch (error) {
        console.log('Caught an error:', error.message);
    }
    try {
        const response = await fetch(secondResponse);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.status);
        }
        const data = await response.json();
        console.log('Second response data:', data.slice(0, 2));
        if (Array.isArray(data)) {
            console.log('Total number of items in the file: ', data.length);
        } else {
            console.log('Received an object, not an array');
        }
    } catch (error) {
        console.log('Caught an error:', error.message);
    } finally {
        console.log('All responses failed');
    }
}

failTryCatch();
