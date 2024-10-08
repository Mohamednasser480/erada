import * as querystring from 'querystring';

// Helper function to convert object to query string
export default function objectToQueryString(obj: { [key: string]: string | number }): string {
    if (Object.keys(obj).length > 0) {
        return '/?' + querystring.stringify(obj);
    }
    return '';
}

// Sample object
// const obj: { [key: string]: string | number } = {
//     name: 'John Doe',
//     age: 30,
//     city: 'New York'
// };

// Convert object to query string
