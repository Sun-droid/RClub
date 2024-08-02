export default async function RandomImageLink() {

    const response = await fetch('https://picsum.photos/200');
    return (
        <p>{response.url}</p>
    );
}