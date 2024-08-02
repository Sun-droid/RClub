//import Document, {
//    Html,
//    Head,
//    Main,
//    NextScript,
//    DocumentContext,
//    DocumentInitialProps,
//} from 'next/document'
//
//class MyDocument extends Document {
//    static async getInitialProps(
//        ctx: DocumentContext
//    ): Promise<DocumentInitialProps> {
//        const originalRenderPage = ctx.renderPage
//
//        // Run the React rendering logic synchronously
//        ctx.renderPage = () =>
//            originalRenderPage({
//                // Useful for wrapping the whole react tree
//                enhanceApp: (App) => App,
//                // Useful for wrapping in a per-page basis
//                enhanceComponent: (Component) => Component,
//            })
//
//        // Run the parent `getInitialProps`, it now includes the custom `renderPage`
//        const initialProps = await Document.getInitialProps(ctx)
//
//        return initialProps
//    }
//
//    render() {
//        return (
//            <Html lang="en">
//                <Head>
//                    <script src="https://cdn.jsdelivr.net/gh/peterhry/CircleType@2.3.1/dist/circletype.min.js"></script>
//                </Head>
//                <body>
//                <Main/>
//                <NextScript/>
//                </body>
//            </Html>
//        )
//    }
//}
//
//export default MyDocument