export default async function RandomImageLink() {
    const response = await fetch('https://picsum.photos/200');
    console.log("Any?")
    console.log("Img link: ", response.url)
    return (
        <p>{response.url}</p>
    );
}